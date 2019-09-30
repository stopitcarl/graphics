// CG project - JCoutinho 89470, JPorto 89472 and MNeves 89512

// Three js objects
let camera, scene, renderer, light;

// Scene objects
let car, floor, axesHelper;

// Control flags
let rotateMainZPos = false,
    rotateMainZNeg = false,
    rotateMainXPos = false,
    rotateMainXNeg = false,
    rotateSecZPos = false,
    rotateSecZNeg = false,
    rotateSecXPos = false,
    rotateSecXNeg = false,
    moveXPos = false,
    moveXNeg = false;

var step = 0,
    car_wireframe = false;
init();
animate();

function init() {


    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -5;
    camera.position.y = 10;
    camera.position.z = 5;
    camera.lookAt(scene.position);

    // lights
    light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(camera.position.x * 1.2, camera.position.y * 1.2, camera.position.z * 1.2);
    scene.add(light);

    axesHelper = new THREE.AxesHelper(2);
    axesHelper.position.set(-4, 4, -2);
    car = createCar();
    floor = createFloor();
    scene.add(axesHelper);
    scene.add(car);
    scene.add(floor);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
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
    light.position.x = Math.cos(step * 0.1) * (camera.position.x * 1.2)
    light.position.z = Math.sin(step * 0.1) * (camera.position.z * 1.2)
    //  light.intensity = Math.sin(step*0.8) > 0 ? 2 : 0;
    //camera.position.z = Math.cos(step) * (camera.position.z * 1.2);

    //    camera.rotation.x = -6 * Math.cos(step);
    //    camera.rotation.z = 6 * Math.cos(step);
    step += 0.5;
    camera.lookAt(scene.position);


    handleControls();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

function handleControls() {
    // Main joint
    if (rotateMainZPos)
        rotateMain("z", 0.5);
    if (rotateMainZNeg)
        rotateMain("z", -0.5);
    if (rotateMainXPos)
        rotateMain("x", 0.5);
    if (rotateMainXNeg)
        rotateMain("x", -0.5);

    // Secondary joint
    if (rotateSecZPos)
        rotateSec("z", 0.5);
    if (rotateSecZNeg)
        rotateSec("z", -0.5);
    if (rotateSecXPos)
        rotateSec("x", 0.5);
    if (rotateSecXNeg)
        rotateSec("x", -0.5);

    // Car
    if (moveXPos)
        moveCar("x", 0.05);
    if (moveXNeg)
        moveCar("x", -0.05);

}

function onKeyDown(e) {
    switch (e.code) {
        case "KeyW":
            toggleWireframe(car, car_wireframe);
            car_wireframe = !car_wireframe;
            break;
        case "KeyF":
            rotateMainZPos = true;
            break;
        case "KeyG":
            rotateMainZNeg = true;
            break;
        case "KeyV":
            rotateMainXPos = true;
            break;
        case "KeyB":
            rotateMainXNeg = true;
            break;
        case "KeyH":
            rotateSecZPos = true;
            break;
        case "KeyJ":
            rotateSecZNeg = true;
            break;
        case "KeyN":
            rotateSecXPos = true;
            break;
        case "KeyM":
            rotateSecXNeg = true;
            break;
        case "KeyA":
            moveXNeg = true;
            break;
        case "KeyD":
            moveXPos = true;
            break;

        default:
            break;
    }
}

function onKeyUp(e) {
    switch (e.code) {

        case "KeyF":
            rotateMainZPos = false;
            break;
        case "KeyG":
            rotateMainZNeg = false;
            break;
        case "KeyV":
            rotateMainXPos = false;
            break;
        case "KeyB":
            rotateMainXNeg = false;
            break;
        case "KeyH":
            rotateSecZPos = false;
            break;
        case "KeyJ":
            rotateSecZNeg = false;
            break;
        case "KeyN":
            rotateSecXPos = false;
            break;
        case "KeyM":
            rotateSecXNeg = false;
            break;
        case "KeyA":
            moveXNeg = false;
            break;
        case "KeyD":
            moveXPos = false;
            break;

        default:
            break;
    }
}

function onResize() {
    'use strict'

    renderer.setSize(window.innerWidth, window.innerHeight);
}