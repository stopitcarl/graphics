// CG project - JCoutinho 89470, JPorto 89472 and MNeves 89512

// Three js objects
let cams = [],
    activeCam, cameraTop, orbitingCam, cameraPerspective, scene, renderer, directionalLight, spotLights = [];

// Scene objects
let floor,
    wall,
    balls = [],
    cannons = [],
    activeCannon;

// Control flags
let rotateBase = 0,
    rotateMainJoint = 0,
    cannonTurn = 0,
    targetBall,
    isShoot = false;


var isWireframe = false,
    ballAxisVisible = true,
    clock,
    timeElapsed = 0;

let CAM_ZOOM = 20;    

// camera shortcuts
let TOP = 0,
    PERSP = 1,
    THIRD = 2;


init();
animate();

function init() {


    // scene
    scene = new THREE.Scene();

    // camera
    let viewSize = 30;
    let aspectRatio = window.innerWidth / window.innerHeight;
    // Top camera (1)
    cameraTop = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, -100, 100);
    cameraTop.position.y = 4;
    cameraTop.lookAt(scene.position);
    cams.push(cameraTop);
    // Perspective camera (2)
    cameraPerspective = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    cameraPerspective.position.set(-28, 12, 11);
    cameraPerspective.lookAt(scene.position);
    cams.push(cameraPerspective);
    // Ball camera (3)
    orbitingCam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    orbitingCam.position.set(-32, 12, 0);
    orbitingCam.lookAt(scene.position);
    cams.push(orbitingCam);

    activeCam = cams[PERSP];    


    // ######### Objects ############
    floor = new Floor();
    scene.add(floor);
    wall = new Wall(floor.getWidthX(), floor.getWidthZ(), floor.getWidthX() / 2, 0);
    scene.add(wall);
    
    let icosad = new Icosahedron(0, 0, 0);
    scene.add(icosad);

    /*
    let painting = new Painting();
    scene.add(painting);
    */

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

    renderer.shadowMapEnabled = true;

    /* Directional light */
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 5;
    directionalLight.shadow.camera.far = 20;
    directionalLight.shadowCameraLeft = -2.5;
    directionalLight.shadowCameraRight = 2.5;
    directionalLight.shadowCameraTop = 2.5;
    directionalLight.shadowCameraBottom = -2.5;

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
        cams.forEach(cam => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            cam.aspect = window.innerWidth / window.innerHeight;
            cam.updateProjectionMatrix();
        });

        let viewSize = 30;
        let aspectRatio = window.innerWidth / window.innerHeight;

        cameraTop.left = aspectRatio * viewSize / -2;
        cameraTop.right = aspectRatio * viewSize / 2;
        cameraTop.top = viewSize / 2;
        cameraTop.bottom = viewSize / -2;
        cameraTop.updateProjectionMatrix();
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