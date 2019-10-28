// CG project - JCoutinho 89470, JPorto 89472 and MNeves 89512

// Three js objects
let cams = [],
    activeCam, cameraTop, cameraBall, cameraPerspective, scene, renderer, light;

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

let WINDOW_MIN_HEIGHT = 135,
    WINDOW_MIN_WIDTH = 240;

// camera shortcuts
let TOP = 0,
    PERSP = 1,
    BALLCAM = 2;

let BALLCAM_DISTANCE = BALL_DIAM * 4,
    BALCAM_HEIGHT = BALL_DIAM * 2;


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
    cams.push(cameraPerspective);
    // Ball camera (3)
    cameraBall = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    cameraBall.position.set(-28, 12, 11);
    cameraBall.lookAt(scene.position);
    cams.push(cameraBall);

    activeCam = cams[TOP];

    // lights
    light = new THREE.AmbientLight(0x404040, 10); // soft white light
    scene.add(light);

    // var axesHelper = new THREE.AxesHelper(2);
    // axesHelper.position.x = -1;
    // axesHelper.position.y = 1;
    // axesHelper.position.z = -3;
    // scene.add(axesHelper);
    let cannon1 = new Cannon(false, -FLOOR_WIDTH / 2 + EXTRA_FLOOR, -6);
    cannons.push(cannon1);
    let cannon2 = new Cannon(true, -FLOOR_WIDTH / 2 + EXTRA_FLOOR, 0);
    cannons.push(cannon2);
    let cannon3 = new Cannon(false, -FLOOR_WIDTH / 2 + EXTRA_FLOOR, 6);
    cannons.push(cannon3);
    floor = new Floor();
    scene.add(floor);

    activeCannon = cannons[1];

    // Create balls
    populateBalls(10);
    targetBall = balls[9];

    balls.forEach(bal => {
        scene.add(bal);
    });

    cannons.forEach(can => {
        scene.add(can);
    });




    // cannon.add(cameraPerspective);

    let perspTarget = floor.position.clone();
    perspTarget.x -= 8;
    cams[PERSP].lookAt(perspTarget);


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
            (Math.random() * (FLOOR_WIDTH * 0.7)) - (FLOOR_WIDTH * 0.3),
            0,
            (Math.random() * (FLOOR_LONG * 0.8)) - (FLOOR_LONG / 2));
        balls.push(new Ball(pos.clone(), vel.clone()));
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
    timeElapsed += delta;

    // <Handle controls>

    // Shoot?
    if (isShoot) {
        var ball = activeCannon.shoot();
        balls.push(ball);
        scene.add(ball);
        isShoot = false;
    }

    // Turn?
    if (cannonTurn != 0) {
        activeCannon.rotate(cannonTurn, delta);
    }

    // </Handle controls>

    // Update balls
    let i = balls.length;
    let toggleAxis = false;

    // If axes are NOT being displayed correctly
    if (i > 0)
        toggleAxis = balls[0].axisHelp.visible != ballAxisVisible;

    // Update ball position + wall collision
    while (i--) {
        let ball = balls[i];
        // Update ball position
        ball.updatePhysics(delta);

        if (toggleAxis)
            ball.toggleAxes(ballAxisVisible);
        // Check wall collision
        wallCollision(ball);
    }

    // Ball-to-ball collisions
    for (let a = 0; a < balls.length; a++)
        for (let b = a + 1; b < balls.length; b++)
            balls[a].checkCollision(balls[b]);

    // Update ball cam
    if (balls.length > 0) {
        targetBall = balls[balls.length - 1];
        updateBallCam();
    }

}

function updateBallCam() {
    let x = targetBall.position.x + Math.cos(Math.PI) * BALLCAM_DISTANCE;
    let z = targetBall.position.z + Math.sin(Math.PI) * BALLCAM_DISTANCE;
    let y = targetBall.position.y + BALCAM_HEIGHT;
    cameraBall.position.set(x, y, z);
    cameraBall.lookAt(targetBall.position);
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
            activeCannon.deselect();
            activeCannon = cannons[0];
            activeCannon.select();
            break;
        case "KeyW":
            activeCannon.deselect();
            activeCannon = cannons[1];
            activeCannon.select();
            break;
        case "KeyE":
            activeCannon.deselect();
            activeCannon = cannons[2];
            activeCannon.select();
            break;
        case "KeyR":
            ballAxisVisible = !ballAxisVisible;
            break;
        case "Digit1":
            activeCam = cams[TOP];
            break;
        case "Digit2":
            activeCam = cams[PERSP];
            break;
        case "Digit3":
            activeCam = cams[BALLCAM];
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
}

function toggleWireframeNode(bool, obj) {
    if (obj.type != "Mesh")
        return;
    obj.material.wireframe = bool;
    obj.children.forEach(child => {
        toggleWireframeNode(bool, child);
    });
}