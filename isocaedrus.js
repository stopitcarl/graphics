class Isocaedrus extends THREE.Mesh {
    constructor() {
        // geometry
        let geometry = new THREE.Geometry();

        // vertices
        geometry.vertices = [
            new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, -1, -1),
            new THREE.Vector3(-1, 1, -1), new THREE.Vector3(1, 1, -1),
            new THREE.Vector3(-1, -1, 1), new THREE.Vector3(1, -1, 1),
            new THREE.Vector3(-1, 1, 1), new THREE.Vector3(1, 1, 1)
        ];

        // faces
        geometry.faces.push(
            new THREE.Face3(0, 1, 3), new THREE.Face3(3, 2, 0),
            new THREE.Face3(7, 5, 4), new THREE.Face3(4, 6, 7),
            new THREE.Face3(4, 0, 2), new THREE.Face3(2, 6, 4),
            new THREE.Face3(1, 5, 7), new THREE.Face3(7, 3, 1),
            new THREE.Face3(1, 0, 4), new THREE.Face3(4, 5, 1),
            new THREE.Face3(6, 2, 3), new THREE.Face3(3, 7, 6)
        );


        // normals
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        let material = new THREE.MeshBasicMaterial({
            color: 0x4083c7,
            wireframe: !isWireframe
        });
        super(geometry, material);
        this.position.x = 1;
        this.position.y = 3;
        this.position.z = 1;
    }

    toggleAxes(bool) {
        this.axisHelp.visible = bool;
    }
}
