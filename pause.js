/**
 * Creates floor and walls, returns floor mesh
 */
var PLANE_SIDE = 22;
var pauseTexture = new THREE.TextureLoader().load("assets/paused.png");

class Pause extends THREE.Mesh {
    constructor() {
        let geometry = new THREE.BoxBufferGeometry(PLANE_SIDE*1.8, 1, PLANE_SIDE);
        // colorTexture.wrapS = THREE.MirroredRepeatWrapping;
        // colorTexture.wrapT = THREE.MirroredRepeatWrapping;
        // diceTexture.wrapS = THREE.MirroredRepeatWrapping;
        let material = new THREE.MeshBasicMaterial({
            map: pauseTexture,
            // color: 0xff0000
        });
        super(geometry, material);
        // this.rotation.z -= 0.2;
    }

}