// CG project - JCoutinho 89470, JPorto 89472 and MNeves 89512

// Three js objects
let activeCam, cameraTop, cameraSide, cameraFront, cameraPerspective, scene, renderer, light;

// Scene objects
let car, floor, axesHelper;

// Control flags
let rotateBase = 0,
    rotateMainJoint = 0,
    carMove = 0,
    carTurn = 0;

var step = 0,
    car_wireframe = false;
init();
animate();

function init() {


    // scene
    scene = new THREE.Scene();

    // camera
    let viewSize = 20;
    let aspectRatio = window.innerWidth / window.innerHeight;
    // Top camera
    cameraTop = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, -100, 100);
    cameraTop.position.y = 7;
    cameraTop.lookAt(scene.position);
    // Side camera
    cameraSide = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, -100, 100);
    cameraSide.position.z = -20;
    cameraSide.position.y = 1;
    cameraSide.lookAt(scene.position);
    // Front camera
    cameraFront = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, -100, 100);
    cameraFront.position.x = 30;
    cameraFront.position.y = 1;
    cameraFront.lookAt(scene.position);
    // Perspective camera
    cameraPerspective = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    cameraPerspective.position.x = -6;
    cameraPerspective.position.y = 10;
    cameraPerspective.position.z = 4;
    cameraPerspective.lookAt(scene.position);

    activeCam = cameraTop;

    // lights
    // light = new THREE.PointLight(0xffffff, 1.5, 100);
    light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
    //light.position.set(0, 7, 0);
    //light.castShadow = true;
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



    axesHelper = new THREE.AxesHelper(2);
    axesHelper.position.set(-4, 4, -2);
    car = createCar();
    floor = createFloor();
    scene.add(axesHelper);
    scene.add(car);
    scene.add(floor);

    //Create a helper for the shadow camera (optional)
    // var helper = new THREE.CameraHelper(light.shadow.camera);
    // scene.add(helper);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict'

    //car.position.x += 0.01;
    //car.position.y += 0.01;
    // light.position.x = Math.cos(step * 0.01) * (camera.position.x * 1.2)
    // light.position.z = Math.sin(step * 0.01) * (camera.position.z * 1.2)
    //  light.intensity = Math.sin(step*0.8) > 0 ? 2 : 0;
    //camera.position.z = Math.cos(step) * (camera.position.z * 1.2);

    //    camera.rotation.x = -6 * Math.cos(step);
    //    camera.rotation.z = 6 * Math.cos(step);
    step += 0.5;


    handleControls();
    requestAnimationFrame(animate);
    renderer.render(scene, activeCam);

}

function handleControls() {

    // Rotate base
    rotateBase(rotateBase);

    // Rotate first joint
    rotateMain(rotateMainJoint);

    // Car    
    rotateCar(carTurn);
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
            rotateBase = -1;
            break;
        case "KeyS":
            rotateBase = 1;
            break;
        case "KeyQ":
            rotateMainJoint = -1;
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
            toggleWireframe(car, car_wireframe);
            car_wireframe = !car_wireframe;
            break;
        case "Digit5":
            activeCam = cameraPerspective;
            break;
    }
}


function onKeyUp(e) {
    // switch (e.code) {

    //     case "KeyF":
    //         rotateMainZPos = false;
    //         break;
    //     case "KeyG":
    //         rotateMainZNeg = false;
    //         break;
    //     case "KeyV":
    //         rotateMainXPos = false;
    //         break;
    //     case "KeyB":
    //         rotateMainXNeg = false;
    //         break;
    //     case "KeyH":
    //         rotateSecZPos = false;
    //         break;
    //     case "KeyJ":
    //         rotateSecZNeg = false;
    //         break;
    //     case "KeyN":
    //         rotateSecXPos = false;
    //         break;
    //     case "KeyM":
    //         rotateSecXNeg = false;
    //         break;
    //     case "KeyA":
    //         moveXNeg = false;
    //         break;
    //     case "KeyD":
    //         moveXPos = false;
    //         break;
    //     default:
    //         break;
    // }
}

function onResize() {
    'use strict'

    renderer.setSize(window.innerWidth, window.innerHeight);
}