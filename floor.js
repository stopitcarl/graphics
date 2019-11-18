/**
 * Creates floor and walls, returns floor mesh
 */
var FLOOR_X = 22,
    FLOOR_HEIGHT = 0.1;
var colorTexture = new THREE.TextureLoader().load("assets/checkers.png");
var bumpTexture = new THREE.TextureLoader().load("assets/wood_bump.png");

class Floor extends THREE.Mesh {

    constructor() {
        let geometry = new THREE.BoxBufferGeometry(FLOOR_X, FLOOR_HEIGHT, FLOOR_X);
        // colorTexture.wrapS = THREE.MirroredRepeatWrapping;
        // colorTexture.wrapT = THREE.MirroredRepeatWrapping;
        // diceTexture.wrapS = THREE.MirroredRepeatWrapping;
        let material = new THREE.MeshPhongMaterial({
            //flatShading: true,
            //  color: 0x555555,
            map: colorTexture,
            bumpMap: bumpTexture
            //wireframe: true
        });

        super(geometry, material);

        this.position.y = -FLOOR_HEIGHT / 2;
    }
}