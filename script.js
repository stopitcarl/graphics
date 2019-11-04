// CG project - JCoutinho 89470, JPorto 89472 and MNeves 89512

// Three js objects
let cams = [],
    activeCam, scene, renderer, directionalLight, spotLights = [];

// Scene objects
let floor,
    wall,
    painting;


var isWireframe = false,    
    clock,
    timeElapsed = 0;

// camera shortcuts
let TOP = 0,
    PERSP = 1,
    THIRD = 2,
    PAINT = 3;


init();
animate();

function init() {


    // scene
    scene = new THREE.Scene();

    // camera
    let viewSize = 30;
    let aspectRatio = window.innerWidth / window.innerHeight;
    // Top camera (1)
    let cameraTop = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, -100, 100);
    cameraTop.position.y = 4;
    cameraTop.lookAt(scene.position);
    cams.push(cameraTop);
    // Perspective camera (2)
    let cameraPerspective = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    cameraPerspective.position.set(-21, 12, 11);
    cameraPerspective.lookAt(scene.position);
    cams.push(cameraPerspective);
    // Ball camera (3)
    let orbitingCam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    orbitingCam.position.set(-22, 12, 0);
    orbitingCam.lookAt(scene.position);
    cams.push(orbitingCam);


    // ######### Objects ############
    floor = new Floor();
    scene.add(floor);
    wall = new Wall(floor.getWidthZ() / 3, 0, floor.getWidthZ() / 5);
    scene.add(wall);

    let icosad = new Icosahedron(0, -floor.getWidthZ() / 5);
    scene.add(icosad);

    let painting = new Painting(wall.getWallCenter());
    scene.add(painting);
    let painting_pos = painting.getCenter();
    // Paint camera (4)
    viewSize = painting.getWidth() + 2;
    let cameraPaint = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, 0, 100);
    cameraPaint.position.set(painting_pos.x - 5, painting_pos.y, painting_pos.z);
    cameraPaint.lookAt(painting_pos);
    cams.push(cameraPaint);
    activeCam = cams[PAINT];

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
    let helper = new THREE.DirectionalLightHelper(directionalLight, 1);
    scene.add(helper);

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

    spotLights.forEach(light => {
        scene.add(light);
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
    // TODO: Delete function and all calls to it    

}

function onKeyDown(e) {
    switch (e.code) {
        case "Digit1":
            spotLights[0].switch();
            break;
        case "Digit2":
            spotLights[1].switch();
            break;
        case "Digit3":
            spotLights[2].switch();
            break;
        case "Digit4":
            spotLights[3].switch();
            break;
        case "KeyQ":
            directionalLight.visible = !directionalLight.visible;
            break;
        case "KeyW":
            // TODO: toggle lighting calculations. whatver that means 
            // Im pretty sure que a ideia e mudar o material para basic  
            break;
        case "KeyE":
            // TODO: toggle type of shadow
            break;
        case "KeyA":
            activeCam = cams[TOP];
            break;
        case "KeyS":
            activeCam = cams[PERSP];
            break;
        case "KeyD":
            activeCam = cams[THIRD];
            break;
        case "KeyF":
            activeCam = cams[PAINT];
            break;
        case "Digit5":
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
        renderer.setSize(window.innerWidth, window.innerHeight);
        cams.forEach(cam => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            cam.aspect = window.innerWidth / window.innerHeight;
            cam.updateProjectionMatrix();
        });

        viewSize = painting.getWidth() + 2;
        let aspectRatio = window.innerWidth / window.innerHeight;

        activeCam.left = aspectRatio * viewSize / -2;
        activeCam.right = aspectRatio * viewSize / 2;
        activeCam.top = viewSize / 2;
        activeCam.bottom = viewSize / -2;
        activeCam.updateProjectionMatrix();

        cams[PERSP].left = aspectRatio * viewSize / -2;
        cams[PERSP].right = aspectRatio * viewSize / 2;
        cams[PERSP].top = viewSize / 2;
        cams[PERSP].bottom = viewSize / -2;
        cams[PERSP].updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        cams[PAINT].left = aspectRatio * viewSize / -2;
        cams[PAINT].right = aspectRatio * viewSize / 2;
        cams[PAINT].top = viewSize / 2;
        cams[PAINT].bottom = viewSize / -2;
        cams[PAINT].updateProjectionMatrix();
        
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