function createTable(){
	geometry = new THREE.BoxGeometry( 0.7, 0.2, 0.05 );
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh( geometry, material );
    return mesh;
}