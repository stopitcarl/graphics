function createFloor() {
    let screenRatio = window.innerHeight / window.innerWidth;
    var geometry = new THREE.PlaneBufferGeometry(30, 30 * screenRatio);
    var material = new THREE.MeshLambertMaterial({
        flatShading: true,
        color: 0x555555,
        // wireframe: true
    });
    var floor = new THREE.Mesh(geometry, material);
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    return floor;
}