// CG project - JCoutinho 89470, JPorto 89472 and MNeves 89512

// Three js objects
let cams = [],
    activeCam, mainCam, pauseCamera, activeScene, mainScene, pauseScene, renderer, directionalLight, pointLight;

// Scene objects
var floor,
    ball,
    die;


var clock;

// camera shortcuts
let PERSP = 0;

// flags
let lightToggle = [],
    isWireframe = false,
    isPhong = true,
    toggleAccel = false,
    pause = false;


init();
animate();

function init() {


    // scene
    mainScene = new THREE.Scene();
    pauseScene = new THREE.Scene();
    activeScene = mainScene;


    /***************************************************************************
     * Objects
     * ************************************************************************/
    floor = new Floor();
    mainScene.add(floor);

    die = new Die();
    mainScene.add(die);

    ball = new Ball();
    mainScene.add(ball);

    /***************************************************************************
     * Cameras
     * ************************************************************************/
    // Perpective front camera (0)
    mainCam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    mainCam.position.set(-22, 12, 0);
    mainCam.lookAt(mainScene.position);
    cams.push(mainCam);
    activeCam = mainCam;

    // ######### Lights ############

    /***************************************************************************
     * Directional Light
     * ************************************************************************/

    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-10, 10, 0)
    mainScene.add(directionalLight);
    lightToggle.push(false);

    pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(-2, 6, -2);
    mainScene.add(pointLight);
    lightToggle.push(false);

    directionalLight.target = mainScene;

    // ######### Renderer ############
    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false;
    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);

    // ################## Pause Scene ##########################
    let pauseObject = new Pause();
    pauseScene.add(pauseObject);

    let viewSize = 20;
    let aspectRatio = window.innerWidth / window.innerHeight;
    pauseCamera = new THREE.OrthographicCamera(aspectRatio * viewSize / -2, aspectRatio * viewSize / 2,
        viewSize / 2, viewSize / -2, 0, 30);
    pauseCamera.position.set(0, 10, 0);
    pauseCamera.lookAt(pauseObject.position);
    cams.push(pauseCamera);



    let lightA = new THREE.AmbientLight(2);
    pauseScene.add(lightA);

    startup();
}

function startup() {
    clock = new THREE.Clock(true);
    die.init();
    ball.init();
    floor.init();
    directionalLight.visible = pointLight.visible = true;
    isWireframe = false;
    isPhong = true;
    pause = false;
    toggleWireframe(isWireframe);
    toggleMaterial(isPhong);
    activeScene = mainScene;
    activeCam = mainCam;
}

function animate() {
    'use strict'
    // Update
    update();
    // Render
    renderer.render(activeScene, activeCam);
    // Setp up next render
    requestAnimationFrame(animate);
}

function update() {

    let delta = clock.getDelta();
    if (pause)
        return;


    die.update(delta);
    if (toggleAccel) {
        ball.toggleAcceleration();
        toggleAccel = false;
    }
    ball.updatePhysics(delta);

    if (lightToggle[0]) {
        directionalLight.visible = !directionalLight.visible;
        lightToggle[0] = false;
    }
    if (lightToggle[1]) {
        pointLight.visible = !pointLight.visible;
        lightToggle[1] = false;
    }
}

function onKeyDown(e) {
    switch (e.code) {
        case "KeyD":
            lightToggle[0] = !lightToggle[0];
            break;
        case "KeyP":
            lightToggle[1] = !lightToggle[1];
            break;
        case "KeyS":
            pause = !pause;
            if (pause) {
                activeScene = pauseScene;
                activeCam = pauseCamera;
            } else {
                activeScene = mainScene;
                activeCam = mainCam;
            }
            break;
        case "KeyW":
            isWireframe = !isWireframe;
            toggleWireframe(isWireframe);
            break;
        case "KeyL":
            isPhong = !isPhong;
            toggleMaterial(isPhong);
            break;
        case "KeyR":
            if (pause)
                startup();
            break;
        case "KeyB":
            toggleAccel = true;
            break;
        default:
            break;
    }
}

function onResize() {
    'use strict'

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        let aspectRatio = window.innerWidth / window.innerHeight;
        cams.forEach(cam => {
            cam.aspect = aspectRatio;
            cam.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // resize orthogonal camera
        let viewSize = 20;
        if (aspectRatio > 1) {
            pauseCamera.left = aspectRatio * viewSize / -2;
            pauseCamera.right = aspectRatio * viewSize / 2;
            pauseCamera.top = viewSize / 2;
            pauseCamera.bottom = viewSize / -2;
            pauseCamera.updateProjectionMatrix();
        } else {
            pauseCamera.left = viewSize / -2;
            pauseCamera.right = viewSize / 2;
            pauseCamera.top = viewSize / aspectRatio / 2;
            pauseCamera.bottom = viewSize / aspectRatio / -2;
            pauseCamera.updateProjectionMatrix();
        }
    }
}

function toggleWireframe(bool) {
    console.log("wireframing", bool);
    floor.wireframe(bool);
    ball.wireframe(bool);
    die.wireFrame(bool);
}

function toggleMaterial(bool) {
    if (bool) {
        floor.phong();
        die.phong();
        ball.phong();
    } else {
        floor.basic();
        die.basic();
        ball.basic();
    }
}