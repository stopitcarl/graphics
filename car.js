function createCar() {
    var geometry = new THREE.BoxBufferGeometry(8, 0.2, 4);
    var material = new THREE.MeshLambertMaterial({
        flatShading: true,
        color: 0x4083c7,
        wireframe: true
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 1 + 0.1;

    createWheel(mesh, 3.5, -0.5, 1.5);
    createWheel(mesh, 3.5, -0.5, -1.5);
    createWheel(mesh, -3.5, -0.5, 1.5);
    createWheel(mesh, -3.5, -0.5, -1.5);
    var base = createBase(mesh);
    createRoboticArm(base);

    return mesh;
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

    obj.add(mesh)
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
    obj.add(base);
    return base;
}

function toggleWireframe(obj, bool) {
    obj.material.wireframe = bool;
    obj.children.forEach(child => {
        toggleWireframe(child, bool);

    });


}