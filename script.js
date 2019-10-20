// CG project - JCoutinho 89470, JPorto 89472 and MNeves 89512

// Three js objects
let cams = [],
    activeCam, cameraTop, cameraSide, cameraFront, cameraPerspective, scene, renderer, light;

// Scene objects
let floor,
    balls = [],
    cannons = [],
    activeCannon;

// Control flags
let rotateBase = 0,
    rotateMainJoint = 0,
    carMove = 0,
    carTurn = 0;

var isWireframe = false,
    clock;

let WINDOW_MIN_HEIGHT = 135,
    WINDOW_MIN_WIDTH = 240;

// camera shortcuts
let TOP = 0,
    SIDE = 1,
    FRONT = 2,
    PERSP = 3;


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
    // Side camera (2)
    cameraSide = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, 0, 100);
    cameraSide.position.z = 21;
    cameraSide.position.y = 0;
    cameraSide.lookAt(scene.position);
    cams.push(cameraSide);
    // Front camera (3)
    cameraFront = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, -100, 100);
    cameraFront.position.x = -31;
    cameraFront.position.y = 0;
    cameraFront.lookAt(scene.position);
    cams.push(cameraFront);
    // Perspective camera (5)
    cameraPerspective = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    cameraPerspective.position.set(-28, 12, 11);
    cams.push(cameraPerspective);

    activeCam = cams[PERSP];

    // lights
    light = new THREE.AmbientLight(0x404040, 10); // soft white light
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

    var axesHelper = new THREE.AxesHelper(2);
    axesHelper.position.x = -1;
    axesHelper.position.y = 1;
    axesHelper.position.z = -3;
    scene.add(axesHelper);
    let cannon1 = new Cannon(false, -FLOOR_LONG, -3);
    cannons.push(cannon1);
    let cannon2 = new Cannon(true, -FLOOR_LONG, 0);
    cannons.push(cannon2);
    let cannon3 = new Cannon(false, -FLOOR_LONG, 3);
    cannons.push(cannon3);
    floor = new Floor();
    scene.add(floor);

    activeCannon = cannons[1];



    balls.forEach(bal => {
        scene.add(bal);
    });

    cannons.forEach(can => {
        scene.add(can);
    });



    // cannon.add(cameraPerspective);

    let carTracker = floor.position.clone();
    carTracker.x -= 6;
    cams[PERSP].lookAt(carTracker);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });

    clock = new THREE.Clock(true);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function populateBalls(numOfBalls) {
    var pos = new THREE.Vector3(0, 0, 0);
    var vel = pos.clone();
    for (var i = 0; i < numOfBalls; i++) {
        pos.set(
            (Math.random() * (FLOOR_LONG / 2)) - (FLOOR_LONG / 2),
            0,
            (Math.random() * (FLOOR_WIDTH / 2)) - (FLOOR_WIDTH / 2));
        balls.push(new Ball(pos, vel));
    }

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

    // Get delta
    let delta = clock.getDelta();

    // insertionSort(balls);
    balls.forEach(ball => {
        if (ball.updatePhysics(delta) < -10)
            console.log("delete this ball");
        wallCollision(ball);
    });

    // Collisions
    for (let a = 0; a < balls.length; a++)
        for (let b = a + 1; b < balls.length; b++)
            balls[a].checkCollision(balls[b]);

}

var speed = 10;

function onKeyDown(e) {

    switch (e.code) {
        case "ArrowUp":
            carMove = 1;
            cameraPerspective.position.x += 1;
            break;
        case "ArrowDown":
            cameraPerspective.position.x -= 1;
            carMove = -1;
            break;
        case "ArrowLeft":
            cameraPerspective.position.z -= 1;
            carTurn = -1;
            break;
        case "ArrowRight":
            cameraPerspective.position.z += 1;
            carTurn = 1;
            break;
        case "KeyX":
            var ball = activeCannon.shoot();
            balls.push(ball);
            scene.add(ball);
        case "KeyA":
            rotateBase = 1;
            break;
        case "KeyS":
            rotateBase = -1;
            break;
        case "KeyQ":
            activeCannon = cannons[0]; // TODO: select && deseelct cannon to change colors
            break;
        case "KeyW":
            activeCannon = cannons[1];
        case "KeyE":
            activeCannon = cannons[2];
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
            if (carMove < 0)
                break;
            carMove = 0;
        case "ArrowDown":
            if (carMove > 0)
                break;
            carMove = 0;
            break;
        case "ArrowLeft":
            if (carTurn > 0)
                break;
            carTurn = 0;
        case "ArrowRight":
            if (carTurn < 0)
                break;
            carTurn = 0;
            break;
        case "KeyA":
            if (rotateBase < 0)
                break;
            rotateBase = 0;
        case "KeyS":
            if (rotateBase > 0)
                break;
            rotateBase = 0;
            break;
        default:
            break;
    }
}

function onResize() {
    'use strict'

    if (window.innerHeight > WINDOW_MIN_HEIGHT && window.innerWidth > WINDOW_MIN_WIDTH) {
        cams.forEach(came => {
            activeCam.aspect = window.innerWidth / window.innerHeight;
            activeCam.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        });

    }

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