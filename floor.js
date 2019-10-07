function createFloor() {
    // 30 by 16.897 (assuming a 16by9 screenratio)

    // let screenRatio = window.innerHeight / window.innerWidth;
    var geometry = new THREE.BoxBufferGeometry(30, 0.1,18);
    var material = new THREE.MeshLambertMaterial({
        flatShading: true,
        color: 0x555555,
        // wireframe: true
    });
    var floor = new THREE.Mesh(geometry, material);
    // floor.receiveShadow = true;
    floor.position.y = -0.05;
    // floor.rotation.x = -Math.PI / 2;
    return floor;
}