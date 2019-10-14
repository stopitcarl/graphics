/**
 * Creates floor and walls, returns floor mesh
 */
var FLOOR_WIDTH = 30,
    FLOOR_LONG = 30,
    FLOOR_HEIGHT = 0.1,
    WALL_HEIGHT = 3;

class Floor extends THREE.Mesh {

    constructor() {
        // let screenRatio = window.innerHeight / window.innerWidth;
        let geometry = new THREE.BoxBufferGeometry(FLOOR_WIDTH, FLOOR_HEIGHT, FLOOR_LONG);
        let material = new THREE.MeshLambertMaterial({
            flatShading: true,
            color: 0x555555,
            // wireframe: true
        });
        super(geometry, material);
        // floor.receiveShadow = true;
        this.position.y = -(FLOOR_HEIGHT >> 1);
        // floor.rotation.x = -Math.PI / 2;
    }

    buildWall(width, x, y) {
        // let screenRatio = window.innerHeight / window.innerWidth;
        let geometry = new THREE.BoxBufferGeometry(FLOOR_WIDTH, FLOOR_HEIGHT, FLOOR_LONG);
        let material = new THREE.MeshLambertMaterial({
            flatShading: true,
            color: 0x555555,
            // wireframe: true
        });
        let wall = new THREE.Mesh(geometry, material);
        // floor.receiveShadow = true;
        this.position.x = -(FLOOR_HEIGHT >> 1);
        this.position.y = -(FLOOR_HEIGHT >> 1);
        // floor.rotation.x = -Math.PI / 2;
        return wall;
    }

}