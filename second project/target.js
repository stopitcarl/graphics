function createTarget() {    

    var cylinderGeometry = new THREE.CylinderBufferGeometry(0.3, 0.3, 3, 15);
    var torusGeometry = new THREE.TorusBufferGeometry(0.35, 0.1, 8, 15);

    var cylinderMaterial = new THREE.MeshBasicMaterial({
        color: 0x8844aa,
        wireframe: true
    });
    var torusMaterial = new THREE.MeshBasicMaterial({
        color: 0x4287f5,
        wireframe: true
    });

    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    var torus = new THREE.Mesh(torusGeometry, torusMaterial);

    cylinder.add(torus);
    
    cylinder.position.x = 6;
    cylinder.position.y = 1.5;

    torus.position.y = 1.5 + 0.45;
    torus.rotation.y = Math.PI / 2;


    return cylinder;
}