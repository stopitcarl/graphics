class SpotLight extends THREE.Mesh{

    constructor(px, py, pz, rx, rz, tx, ty, tz) {

        /* Geometry */
        let geometry = new THREE.ConeGeometry(0.4, 1, 15);

        /* Material */
        let material = new THREE.MeshLambertMaterial({
            color: 0xf5f549,
            wireframe: !isWireframe
        });

        super(geometry, material);

        this.position.set(px, py, pz);
        this.rotation.x = rx;
        this.rotation.z = rz;
    }
    
}
