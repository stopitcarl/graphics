// CG project - JCoutinho 89470, JPorto 89472 and MNeves 89512

// Three js objects
var camera, scene, renderer;

// Scene objects
var car, floor, axesHelper;

var step = 0,
    car_wireframe = false;
init();
animate();

function init() {


    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -6;
    camera.position.y = 6;
    camera.position.z = 10;
    camera.lookAt(scene.position);

    // lights
    var light = new THREE.PointLight(0xffffff, 3, 500);
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
    window.addEventListener("keydown", onKeyPress);
}

function animate() {
    'use strict'

    //car.position.x += 0.01;
    //car.position.y += 0.01;

    camera.rotation.x = -6 * Math.cos(step)
    camera.rotation.z = 6 * Math.cos(step);
    step += 0.01;
    camera.lookAt(scene.position);



    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

function onKeyPress(e) {
    switch (e.code) {
        case "KeyA":
            toggleWireframe(car, car_wireframe);
            car_wireframe = !car_wireframe;
            break;
        case "KeyF":

            break;

        default:
            break;
    }
}

function onResize() {
    'use strict'

    renderer.setSize(window.innerWidth, window.innerHeight);
}