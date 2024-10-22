class Icosahedron extends THREE.Mesh {
    constructor(x, z) {
        // pedestal height
        let height = 1

        // golden ratio
        let gold = (1 + Math.sqrt(5)) / 2

        // materials
        let basicM = new THREE.MeshBasicMaterial({
            color: 0x4083c7,            
        });
        let lambertM = new THREE.MeshLambertMaterial({
            color: 0x4083c7,            
        });
        let phongM = new THREE.MeshPhongMaterial({
            color: 0x4083c7,            
        });

        // make pedestal
        let boxGeometry = new THREE.BoxBufferGeometry(2 * gold, height, 2 * gold);
        super(boxGeometry, phongM);

        // make Icosahedron
        // geometry
        let geometry = new THREE.Geometry();

        // vertices
        geometry.vertices = [
            new THREE.Vector3(-1, gold, 0), new THREE.Vector3(1, gold, 0),
            new THREE.Vector3(0, 1, -1 * gold), new THREE.Vector3(0, 1, gold),
            new THREE.Vector3(-1 * gold, 0, -1), new THREE.Vector3(gold, 0, -1),
            new THREE.Vector3(-1 * gold, 0, 1), new THREE.Vector3(gold, 0, 1),
            new THREE.Vector3(0, -1, -1 * gold), new THREE.Vector3(0, -1, gold),
            new THREE.Vector3(-1, -1 * gold, 0), new THREE.Vector3(1, -1 * gold, 0)
        ];

        // slightly shift vertices
        for (let i = 0; i < 12; i++) {
            geometry.vertices[11 - i].add(new THREE.Vector3(0, 0, i / 15));
        }

        // faces
        geometry.faces.push(
            new THREE.Face3(0, 1, 3), new THREE.Face3(2, 1, 0),
            new THREE.Face3(3, 1, 7), new THREE.Face3(7, 1, 5),
            new THREE.Face3(5, 1, 2), new THREE.Face3(2, 0, 4),
            new THREE.Face3(4, 0, 6), new THREE.Face3(6, 0, 3),
            new THREE.Face3(3, 7, 9), new THREE.Face3(9, 6, 3),
            new THREE.Face3(5, 2, 8), new THREE.Face3(8, 2, 4),
            new THREE.Face3(11, 9, 7), new THREE.Face3(7, 5, 11),
            new THREE.Face3(11, 5, 8), new THREE.Face3(8, 4, 10),
            new THREE.Face3(10, 4, 6), new THREE.Face3(6, 9, 10),
            new THREE.Face3(10, 9, 11), new THREE.Face3(11, 8, 10)
        );

        // normals
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        // create icosahedron
        this.icosahedron = new THREE.Mesh(geometry, phongM);
        this.icosahedron.position.y = height / 2 + gold;
        this.add(this.icosahedron);

        this.position.x = x;
        this.position.y = height / 2;
        this.position.z = z;
        this.phongM = phongM;
        this.lambertM = lambertM;
        this.basicM = basicM;
    }

    phong() {
        this.icosahedron.material = this.phongM;
        this.material = this.phongM;
    }

    lambert() {
        this.icosahedron.material = this.lambertM;
        this.material = this.lambertM;
    }

    basic() {
        this.icosahedron.material = this.basicM;
        this.material = this.basicM;
    }
}