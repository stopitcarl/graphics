function createTable(){
	geometry = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh( geometry, material );
    return mesh;
}