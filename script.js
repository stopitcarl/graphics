// CG project - JCoutinho 89470, JPorto 89472 and MNeves 89512

// Three js objects
let cams = [],
    activeCam, cameraTop, orbitingCam, cameraPerspective, scene, renderer, DirectionalLight, spotLights = [];

// Scene objects
let floor,
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

    directionalLight.castShadow = true;
    icosad.castShadow = true;
    wall.recieveShadow = true;
    floor.recieveShadow = true;

    /* Helper */
    let helper = new THREE.DirectionalLightHelper(directionalLight, 1);
    scene.add(helper);
    
    /***************************************************************************
     * SpotLights
     * ************************************************************************/
    let spotlight1 = new SpotLight(-10, 6, -7.5, -1 * Math.PI / 4, Math.PI / 4, 0, 0, 0);
    spotLights.push(spotlight1);
    let spotlight2 = new SpotLight(10 - 0.5, 6, -7.5, -1 * Math.PI / 4, -1 * Math.PI / 4, 0, 0, 0);
    spotLights.push(spotlight2);
    let spotlight3 = new SpotLight(10 - 0.5, 6, 7.5, Math.PI / 4, -1 * Math.PI / 4, 0, 0, 0);
    spotLights.push(spotlight3);
    let spotlight4 = new SpotLight(-10, 6, 7.5, Math.PI / 4, Math.PI / 4, 0, 0, 0);
    spotLights.push(spotlight4);

    spotLights.forEach(light => {
        scene.add(light);
    });

    let light1 = new THREE.SpotLight(0xffffff, 1, 20, 0.4, 0, 0);
    light1.position.set(-10, 6, -7.5);
    scene.add(light1);
    let light2 = new THREE.SpotLight(0xffffff, 1, 20, 0.4, 0, 0);
    light2.position.set(10 - 0.5, 6, -7.5);
    scene.add(light2);
    let light3 = new THREE.SpotLight(0xffffff, 1, 20, 0.4, 0, 0);
    light3.position.set(10 - 0.5, 6, 7.5);
    scene.add(light3);
    let light4 = new THREE.SpotLight(0xffffff, 1, 20, 0.4, 0, 0);
    light4.position.set(-10, 6, 7.5);
    scene.add(light4);

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
        case "ArrowLeft":
            // cameraPerspective.position.z -= 1;
            cannonTurn = -1;
            break;
        case "ArrowRight":
            // cameraPerspective.position.z += 1;
            cannonTurn = 1;
            break;
        case "Space":
            isShoot = true;
            break;
        case "KeyA":
            rotateBase = 1;
            break;
        case "KeyS":
            rotateBase = -1;
            break;
        case "KeyQ":
            directionalLight.visible = !directionalLight.visible;
            break;
        case "KeyW":
            // TODO: toggle lighting calculations. whatver that means   
            break;
        case "KeyE":
            // TODO: toggle type of shadow
            break;
        case "Digit1":
            activeCam = cams[TOP];
            break;
        case "Digit2":
            activeCam = cams[PERSP];
            break;
        case "Digit3":
            activeCam = cams[THIRD];
            break;
        case "Digit4":
            toggleWireframe(isWireframe);
            isWireframe = !isWireframe;
            break;
        default:
            break;
    }
}


function onKeyUp(e) {
    switch (e.code) {
        case "ArrowLeft":
            if (cannonTurn > 0)
                break;
            cannonTurn = 0;
        case "ArrowRight":
            if (cannonTurn < 0)
                break;
            cannonTurn = 0;
            break;
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