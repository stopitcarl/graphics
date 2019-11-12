// CG project - JCoutinho 89470, JPorto 89472 and MNeves 89512

// Three js objects
let cams = [],
    activeCam, scene, renderer, directionalLight, spotLights = [];

// Scene objects
var floor,
    wall,
    painting,
    icosad;


var isWireframe = true,
    clock,
    timeElapsed = 0;

// camera shortcuts
let PERSP = 0,
    PAINT = 1;

// flags
let lightOn = [],
    isBasic = false,
    isLambert = false;


init();
animate();

function init() {


    // scene
    scene = new THREE.Scene();


    /***************************************************************************
     * Objects
     * ************************************************************************/
    floor = new Floor();
    scene.add(floor);
    wall = new Wall(floor.getWidthZ() / 3, 0, floor.getWidthZ() / 5);
    scene.add(wall);

    icosad = new Icosahedron(0, -floor.getWidthZ() / 5);
    scene.add(icosad);

    painting = new Painting(wall.getWallCenter());
    scene.add(painting);
    let painting_pos = painting.getCenter();



    /***************************************************************************
     * Cameras
     * ************************************************************************/
    // Perpective front camera (0)
    let perspFront = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    perspFront.position.set(-22, 12, 0);
    perspFront.lookAt(scene.position);
    cams.push(perspFront);
    // Paint camera (1)
    viewSize = painting.getWidth() + 2;
    let aspectRatio = window.innerWidth / window.innerHeight;
    let cameraPaint = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, 0, 100);
    cameraPaint.position.set(painting_pos.x - 5, painting_pos.y, painting_pos.z);
    cameraPaint.lookAt(painting_pos);
    cams.push(cameraPaint);

    activeCam = cams[PERSP];

    // ######### Lights ############

    /***************************************************************************
     * Directional Light
     * ************************************************************************/

    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-10, 10, 0)
    scene.add(directionalLight);

    /* Target */
    let targetDir = new THREE.Object3D();
    scene.add(targetDir);
    targetDir.position.set(0, 2, 0);
    directionalLight.target = targetDir;
    directionalLight.target.updateMatrixWorld();

    /* Helper */
    // let helper = new THREE.DirectionalLightHelper(directionalLight, 1);
    // scene.add(helper);

    /***************************************************************************
     * SpotLights
     **************************************************************************/

    let spotlight1 = new SpotLight(-10, 6, -7.5, -1 * Math.PI / 4, Math.PI / 4);
    spotLights.push(spotlight1);
    let spotlight2 = new SpotLight(10 - 0.5, 6, -7.5, -1 * Math.PI / 4, -1 * Math.PI / 4);
    spotLights.push(spotlight2);
    let spotlight3 = new SpotLight(10 - 0.5, 6, 7.5, Math.PI / 4, -1 * Math.PI / 4);
    spotLights.push(spotlight3);
    let spotlight4 = new SpotLight(-10, 6, 7.5, Math.PI / 4, Math.PI / 4);
    spotLights.push(spotlight4);
    lightOn.push(false);

    spotLights.forEach(light => {
        scene.add(light);
        lightOn.push(false);
    });

    // ######### Renderer ############
    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    /***************************************************************************
     * Shadows
     **************************************************************************/

    renderer.shadowMap.enabled = true;

    /* Directional light */
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 5;
    directionalLight.shadow.camera.far = 20;
    directionalLight.shadow.camera.left = -2.5;
    directionalLight.shadow.camera.right = 2.5;
    directionalLight.shadow.camera.top = 2.5;
    directionalLight.shadow.camera.bottom = -2.5;

    /* Spotlights */
    spotLights.forEach(light => {
        light.children[0].castShadow = true;
        light.children[0].shadow.mapSize.width = 1024;
        light.children[0].shadow.mapSize.height = 1024;
        light.children[0].shadow.camera.near = 5;
        light.children[0].shadow.camera.far = 30;
        light.children[0].shadow.camera.fov = 25;
    });

    /* Objects */
    icosad.castShadow = true;
    icosad.children[0].castShadow = true;
    wall.receiveShadow = true;
    floor.receiveShadow = true;

}

function animate() {
    'use strict'
    // Update
    update();
    // Render
    renderer.render(scene, activeCam);
    // Setp up next render
    requestAnimationFrame(animate);
}

function update() {
    for (var i = 1; i < lightOn.length; i++)
        if (lightOn[i]) {
            spotLights[i - 1].switch();
            lightOn[i] = false;
        }

    // Big direcitonal light
    if (lightOn[0]) {
        directionalLight.visible = !directionalLight.visible;
        lightOn[0] = false;
    }


    if (isBasic) {
        icosad.basic();
        painting.basic();
        painting.basic();
    } else {
        if (isLambert) {
            icosad.lambert();
            painting.lambert();
            wall.lambert();
        } else {
            icosad.phong();
            painting.phong();
            wall.phong();
        }
    }


}

function onKeyDown(e) {
    switch (e.code) {
        case "Digit1":
            lightOn[1] = true;
            break;
        case "Digit2":
            lightOn[2] = true;
            break;
        case "Digit3":
            lightOn[3] = true;
            break;
        case "Digit4":
            lightOn[4] = true;
            break;
        case "Digit5":
            activeCam = cams[PERSP];
            break;
        case "Digit6":
            activeCam = cams[PAINT];
            break;
        case "KeyQ":
            lightOn[0] = true;
            break;
        case "KeyW":
            isBasic = !isBasic;
            break;
        case "KeyE":
            isLambert = !isLambert;
            break;
        case "KeyK":
            toggleWireframe(isWireframe);
            isWireframe = !isWireframe;
            break;
        default:
            break;
    }
}

function onKeyUp(e) {
    switch (e.code) {
        default:
            break;
    }
}

function onResize() {
    'use strict'

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        cams.forEach(cam => {
            cam.aspect = window.innerWidth / window.innerHeight;
            cam.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        let aspectRatio = window.innerWidth / window.innerHeight;

        // resize perspective camera        
        // if (aspectRatio < 1) {
        //     cams[PERSP].fov = 45 / Math.sqrt(aspect);
        // } else
        //     cams[PERSP].fov = 45;


        // resize orthogonal camera
        let viewSize = painting.getWidth() + 2;
        if (aspectRatio > 1) {
            cams[PAINT].left = aspectRatio * viewSize / -2;
            cams[PAINT].right = aspectRatio * viewSize / 2;
            cams[PAINT].top = viewSize / 2;
            cams[PAINT].bottom = viewSize / -2;
            cams[PAINT].updateProjectionMatrix();
        } else {
            cams[PAINT].left = viewSize / -2;
            cams[PAINT].right = viewSize / 2;
            cams[PAINT].top = viewSize / aspectRatio / 2;
            cams[PAINT].bottom = viewSize / aspectRatio / -2;
            cams[PAINT].updateProjectionMatrix();
        }


        // if (aspectRatio < 1) {
        //     cams[PERSP].fov = 45 / Math.sqrt(aspect);
        //     cams[PERSP].updateProjectionMatrix();
        // } else {
        //     cams[PERSP].fov = 45;
        //     cams[PERSP].updateProjectionMatrix();
        // }
    }
}

function toggleWireframe(bool) {
    scene.children.forEach(child => {
        if (child.type === "Mesh")
            toggleWireframeNode(bool, child);
    });
    floor.material.wireframe = false; // Comment this line to dislay floor wireframe
    wall.material.wireframe = false;
}

function toggleWireframeNode(bool, obj) {
    if (obj.type != "Mesh")
        return;
    obj.material.wireframe = bool;
    obj.children.forEach(child => {
        toggleWireframeNode(bool, child);
    });
}