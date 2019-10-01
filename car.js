let base, armBase;
let wheels = [];
let VELOCITY = 0.1,
    TURN_RATE = 2;
let dir = 0;

function createCar() {
    // 5x2.5 car with 0.5 radius wheels
    var geometry = new THREE.BoxBufferGeometry(5, 0.2, 2.5);
    var material = new THREE.MeshLambertMaterial({
        //        flatShading: true,
        color: 0x4083c7,
        wireframe: true
    });
    base = new THREE.Mesh(geometry, material);
    base.position.y = 1 + 0.1;
    base.castShadow = true;
    base.receiveShadow = true;

    createWheel(base, 2, -0.5, 0.75); //  front right wheel
    createWheel(base, 2, -0.5, -0.75); // front left wheel 
    createWheel(base, -2, -0.5, 0.75); // back right wheel
    createWheel(base, -2, -0.5, -0.75); // back left wheel
    armBase = createBase(base);
    createRoboticArm(armBase);

    function createWheel(obj, x, y, z) {
        var geometry = new THREE.SphereBufferGeometry(0.5, 10, 10);
        let material = new THREE.MeshLambertMaterial({
            flatShading: true,
            color: 0x3eb59b,
            wireframe: true
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        obj.add(mesh)
        wheels.push(mesh);
    }

    function createBase(obj) {
        var geometry = new THREE.SphereBufferGeometry(0.5, 15, 15, 0, Math.PI * 2, 0, Math.PI / 2);
        var material = new THREE.MeshLambertMaterial({
            flatShading: true,
            color: 0xe6af63,
            wireframe: true
        });
        var base = new THREE.Mesh(geometry, material);
        base.position.y = 0.1;
        base.side = THREE.DoubleSide;
        base.receiveShadow = true;
        obj.add(base);
        return base;
    }

    return base;
}



function toggleWireframe(obj, bool) {
    obj.material.wireframe = bool;
    obj.children.forEach(child => {
        toggleWireframe(child, bool);
    });
}

function rotateCar(deg) {
    deg /= 180 / Math.PI;
    dir += deg * TURN_RATE;
    base.rotation.y = -dir;
    for (let i = 0; i < 4; i++)
        wheels[i].rotation.x -= (i < 2 ? -1 : 1) * 4 * deg;

}

function moveCar(vel) {
    vel *= VELOCITY;
    base.position.x += vel * Math.cos(dir);
    base.position.z += vel * Math.sin(dir);
    wheels.forEach(wheel => {
        wheel.rotation.z -= 2 * vel;
    })
}

function rotateArmBase(deg) {
    deg /= 180 / Math.PI;
    armBase.rotation.y += deg;
}