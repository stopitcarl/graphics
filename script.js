// CG project - JCoutinho 89470, JPorto 89472 and MNeves 89512

// Three js objects
let activeCam, cameraTop, cameraSide, cameraFront, cameraPerspective, scene, renderer, light;

// Scene objects
let car, floor, target;

// Control flags
let rotateBase = 0,
    rotateMainJoint = 0,
    carMove = 0,
    carTurn = 0;

var isWireframe = false;

init();
animate();

function init() {


    // scene
    scene = new THREE.Scene();

    // camera
    let viewSize = 15;
    let aspectRatio = window.innerWidth / window.innerHeight;
    // Top camera (1)
    cameraTop = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, -100, 100);
    cameraTop.position.y = 4;
    cameraTop.lookAt(scene.position);
    // Side camera (2)
    cameraSide = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, -100, 100);
    cameraSide.position.z = 21;
    cameraSide.position.y = 0;
    cameraSide.lookAt(scene.position);
    // Front camera (3)
    cameraFront = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, -100, 100);
    cameraFront.position.x = 31;
    cameraFront.position.y = 0;
    cameraFront.lookAt(scene.position);
    // Perspective camera (5)
    cameraPerspective = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    cameraPerspective.position.x = -8;
    cameraPerspective.position.y = 8;
    cameraPerspective.position.z = 2;

    activeCam = cameraTop;

    // lights
    light = new THREE.AmbientLight(0x404040, 6); // soft white light
    scene.add(light);


    //Set up shadow properties for the light
    // var d = 10;
    // //light.castShadow = true;
    // light.shadow.camera.left = -d * 1.5;
    // light.shadow.camera.right = d * 1.5;
    // light.shadow.camera.top = d;
    // light.shadow.camera.bottom = -d;

    // light.shadow.camera.near = 0;
    // light.shadow.camera.far = light.position.y + 1;

    // light.shadow.mapSize.x = 2048;
    // light.shadow.mapSize.y = 2048;


    car = createCar();
    target = createTarget();
    floor = createFloor();
    scene.add(car);
    scene.add(floor);
    scene.add(target);
    car.add(cameraPerspective);
    let carTracker = base.position.clone();
    carTracker.y += 1;
    cameraPerspective.lookAt(carTracker);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict'

    // Update
    handleControls();
    // Render
    renderer.render(scene, activeCam);
    // Setp up next render
    requestAnimationFrame(animate);
}

function handleControls() {

    // Rotate base
    if (rotateBase != 0)
        rotateArmBase(rotateBase);

    // Rotate first joint
    if (rotateMainJoint != 0)
        rotateArmVertical(rotateMainJoint);

    // Car
    if (carTurn != 0)
        rotateCar(carTurn);
    if (carMove != 0)
        moveCar(carMove);
}

function onKeyDown(e) {

    switch (e.code) {
        case "ArrowUp":
            carMove = 1;
            break;
        case "ArrowDown":
            carMove = -1;
            break;
        case "ArrowLeft":
            carTurn = -1;
            break;
        case "ArrowRight":
            carTurn = 1;
            break;
        case "KeyA":
            rotateBase = 1;
            break;
        case "KeyS":
            rotateBase = -1;
            break;
        case "KeyQ":
            rotateMainJoint = 1;
            break;
        case "KeyW":
            rotateMainJoint = -1;
            break;
        case "Digit1":
            activeCam = cameraTop;
            break;
        case "Digit2":
            activeCam = cameraSide;
            break;
        case "Digit3":
            activeCam = cameraFront;
            break;
        case "Digit4":
            toggleWireframe(isWireframe);
            isWireframe = !isWireframe;
            break;
        case "Digit5":
            activeCam = cameraPerspective;
            break;
        default:
            break;
    }
}


function onKeyUp(e) {
    switch (e.code) {
        case "ArrowUp":
        case "ArrowDown":
            carMove = 0;
            break;
        case "ArrowLeft":
        case "ArrowRight":
            carTurn = 0;
            break;
        case "KeyA":
        case "KeyS":
            rotateBase = 0;
            break;
        case "KeyQ":
        case "KeyW":
            rotateMainJoint = 0;
            break;
        default:
            break;
    }
}

function onResize() {
    'use strict'

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        activeCam.aspect = renderer.getSize().width / renderer.getSize().height;
        cameraFront.updateProjectionMatrix();
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function toggleWireframe(bool) {
    scene.children.forEach(child => {
        if (child.type === "Mesh")
            toggleWireframeNode(bool, child);
    });
    floor.material.wireframe = false; // Comment this line to dislay floor wireframe
}

function toggleWireframeNode(bool, obj) {
    if (obj.type != "Mesh")
        return;
    obj.material.wireframe = bool;
    obj.children.forEach(child => {
        toggleWireframeNode(bool, child);
    });
}