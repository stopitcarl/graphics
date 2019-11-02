class SpotLight extends THREE.Mesh{

    constructor(px, py, pz, rx, rz) {

        /* Geometry */
        let geometry = new THREE.ConeGeometry(0.4, 1, 15);

        /* Material */
        let material = new THREE.MeshBasicMaterial({
            color: 0xf5f549,
            wireframe: !isWireframe
        });

        super(geometry, material);

        /* Light */
        let light = new THREE.SpotLight(0xffffff, 1, 20, 0.4, 0, 0);
        light.position.set(0, 0, 0);
        this.add(light);
        
        /* Target */
        let target = new THREE.Object3D();
        target.position.set(0, 1.5, 0);
        light.target = target;
        scene.add(target);

        this.position.set(px, py, pz);
        this.rotation.x = rx;
        this.rotation.z = rz;
    }

    switch() {
        this.visible = !this.visible;
    }
    
}
