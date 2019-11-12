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
        let geometry = new THREE.BoxBufferGeometry(FLOOR_X, FLOOR_HEIGHT, FLOOR_X);
        let texture = new THREE.TextureLoader().load("chess.svg");
        let material = new THREE.MeshBasicMaterial({
            //flatShading: true,
            color: 0x555555,
            map: texture
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