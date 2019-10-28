class Table extends THREE.Mesh {
    constructor() {
        let cylinderGeometry = new THREE.CylinderBufferGeometry(0.3, 0.3, 3, 15);
        let cylinderMaterial = new THREE.MeshBasicMaterial({
            color: 0x8844aa,
            wireframe: true
        });


        super(cylinderGeometry, cylinderMaterial);
        // this.position.x = 6;
        // this.position.y = 1.5;
    }
}