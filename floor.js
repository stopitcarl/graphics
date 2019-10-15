/**
 * Creates floor and walls, returns floor mesh
 */
var FLOOR_WIDTH = 30,
    FLOOR_LONG = 20,
    FLOOR_HEIGHT = 0.1,
    WALL_HEIGHT = 3,
    WALL_THICK = 0.2;

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

        this.walls = [];
        this.walls.push(new Wall(FLOOR_LONG, FLOOR_WIDTH / 2, 0));
        this.walls.push(new Wall(FLOOR_WIDTH, 0, FLOOR_LONG / 2));
        this.walls.push(new Wall(FLOOR_WIDTH, 0, -FLOOR_LONG / 2));

        this.walls.forEach(element => {
            this.add(element);
        });

    }

    getBoundingBox() {
        return new THREE.Box3().setFromObject(this);
    }

}


class Wall extends THREE.Mesh {
    constructor(width, x, z) {
        // let screenRatio = window.innerHeight / window.innerWidth;
        let geometry = new THREE.BoxBufferGeometry(width, WALL_HEIGHT, WALL_THICK);
        let material = new THREE.MeshLambertMaterial({
            flatShading: true,
            color: 0xa5105f,
            // wireframe: true
        });
        super(geometry, material);
        this.position.x = x;
        this.position.z = z;

        if (z == 0) {
            this.rotation.y = -Math.PI / 2
        }
    }
}

function wallCollision(ball, box) {
    // debugger;
    if ((ball.position.x + ball.radius) > box.max.x) {
        ball.position.x = box.max.x - ball.radius;
        ball.velocity.x = -ball.velocity.x;
    } else if ((ball.position.x - ball.radius) < box.min.x) {
        ball.position.x = box.min.x + ball.radius;
        ball.velocity.x = -ball.velocity.x;
    }

    if ((ball.position.z + ball.radius) > box.max.z) {
        ball.position.z = box.max.z - ball.radius;
        ball.velocity.z = -ball.velocity.z;
    } else if ((ball.position.z - ball.radius) < box.min.z) {
        ball.position.z = box.min.z + ball.radius;
        ball.velocity.z = -ball.velocity.z;
    }
}