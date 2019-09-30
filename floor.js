function createFloor() {
    var geometry = new THREE.PlaneBufferGeometry(30, 20);
    var material = new THREE.MeshLambertMaterial({
        flatShading: true,
        color: 0x555555,
        // wireframe: true
    });
    var floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    return floor;
}