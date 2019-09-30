let base;
let wheels = [];

function createCar() {
    // 8x4 car with 0.5 radius wheels
    var geometry = new THREE.BoxBufferGeometry(8, 0.2, 4);
    var material = new THREE.MeshLambertMaterial({
        flatShading: true,
        color: 0x4083c7,
        wireframe: true
    });
    base = new THREE.Mesh(geometry, material);
    base.position.y = 1 + 0.1;
    base.castShadow = true;
    base.receiveShadow = true;

    createWheel(base, 3.5, -0.5, 1.5);
    createWheel(base, 3.5, -0.5, -1.5);
    createWheel(base, -3.5, -0.5, 1.5);
    createWheel(base, -3.5, -0.5, -1.5);
    var armBase = createBase(base);
    createRoboticArm(armBase);

    return base;
}

function createWheel(obj, x, y, z) {
    var geometry = new THREE.SphereBufferGeometry(0.5, 15, 15);
    var material = new THREE.MeshLambertMaterial({
        flatShading: true,
        color: 0xe08327,
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

function toggleWireframe(obj, bool) {
    obj.material.wireframe = bool;
    obj.children.forEach(child => {
        toggleWireframe(child, bool);
    });
}

function moveCar(axis, vel) {
    switch (axis) {
        case "x":
            base.position.x += vel;
            wheels.forEach(wheel => {
                wheel.rotation.z -= 2*vel;
            })
            break;
        case "z":
            mainJoint.position.z += vel;
            break;
    }
}