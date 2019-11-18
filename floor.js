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
        let phong = new THREE.MeshPhongMaterial({
            map: colorTexture,
            bumpMap: bumpTexture
        });
        let basic = new THREE.MeshBasicMaterial({
            map: colorTexture
        });;


        super(geometry, phong);
        this.phongM = phong;
        this.basicM = basic;
        this.position.y = -FLOOR_HEIGHT / 2;
    }

    phong() {
        this.material = this.phongM;
    }

    basic() {
        this.material = this.basicM;
    }

    wireframe(bool) {
        this.basic.wireframe = bool;
        this.phong.wireframe = bool;
    }

}