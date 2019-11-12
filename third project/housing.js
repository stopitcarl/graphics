/**
 * Creates floor and walls, returns floor mesh
 */
var FLOOR_X = 20,
    FLOOR_Z = 15,
    EXTRA_FLOOR = 4,
    FLOOR_HEIGHT = 0.1,
    WALL_HEIGHT = 6,
    WALL_THICK = 0.2;



class Floor extends THREE.Mesh {

    constructor() {
        let geometry = new THREE.BoxBufferGeometry(FLOOR_X, FLOOR_HEIGHT, FLOOR_Z);
        let material = new THREE.MeshPhongMaterial({
            //flatShading: true,
            color: 0x555555,
            // wireframe: true
        });
        super(geometry, material);
        this.widthX = FLOOR_X;
        this.widthZ = FLOOR_Z;

        this.position.y = -FLOOR_HEIGHT / 2;
    }

    getWidthZ() {
        return this.widthZ;
    }

    getWidthX() {
        return this.widthX;
    }
}

class Wall extends THREE.Mesh {
    constructor(widthZ, x, z) {
        // let screenRatio = window.innerHeight / window.innerWidth;
        let geometry = new THREE.BoxBufferGeometry(1, WALL_HEIGHT, widthZ);

        let basicM = new THREE.MeshBasicMaterial({
            // flatShading: true,
            color: 0x888888
        });
        let lambertM = new THREE.MeshLambertMaterial({
            color: 0x888888

        });
        let phongM = new THREE.MeshPhongMaterial({
            color: 0x888888,

        });
        super(geometry, phongM);
        this.position.x = x;
        this.position.z = z;
        this.position.y = WALL_HEIGHT / 2;
        this.phongM = phongM;
        this.lambertM = lambertM;
        this.basicM = basicM;
    }

    phong() {
        this.material = this.phongM;
    }

    lambert() {
        this.material = this.lambertM;
    }

    basic() {
        this.material = this.basicM;
    }

    getWallCenter() {
        return this.position.clone().add(new THREE.Vector3(-0.5, 0, 0));
    }
}