/**
 * Creates floor and walls, returns floor mesh
 */
var FLOOR_WIDTH = 40,
    FLOOR_LONG = 20,
    EXTRA_FLOOR = 4,
    FLOOR_HEIGHT = 0.1,
    WALL_HEIGHT = 1,
    WALL_THICK = 0.2;

var boundingBox;

class Floor extends THREE.Mesh {

    constructor() {
        // let screenRatio = window.innerHeight / window.innerWidth;
        let geometry = new THREE.BoxBufferGeometry(FLOOR_WIDTH, FLOOR_HEIGHT, FLOOR_LONG);
        let material = new THREE.MeshBasicMaterial({
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

        this.walls.forEach(wall => {
            this.add(wall);
        });

        boundingBox = this.getBoundingBox();
        boundingBox.max.x -= WALL_THICK;
        boundingBox.min.x += WALL_THICK;
        boundingBox.max.z -= WALL_THICK;
        boundingBox.min.z += WALL_THICK;

    }

    getBoundingBox() {
        return new THREE.Box3().setFromObject(this);
    }

}


class Wall extends THREE.Mesh {
    constructor(width, x, z) {
        // let screenRatio = window.innerHeight / window.innerWidth;
        let geometry = new THREE.BoxBufferGeometry(width, WALL_HEIGHT, WALL_THICK);
        let material = new THREE.MeshBasicMaterial({
            flatShading: true,
            color: 0xa5105f,
            // wireframe: true
        });
        super(geometry, material);
        this.position.x = x;
        this.position.z = z;
        this.position.y = WALL_HEIGHT / 2;

        if (z == 0) {
            this.rotation.y = -Math.PI / 2
        } //else {
        //     this.position.x += EXTRA_FLOOR / 2;
        // }
    }
}

function wallCollision(ball) {
    // debugger;
    if ((ball.position.x + ball.radius) > boundingBox.max.x) {
        ball.position.x = boundingBox.max.x - ball.radius;
        ball.velocity.x = -ball.velocity.x;
    } else if ((ball.position.x + ball.radius) < boundingBox.min.x) {
        ball.insideFloor = false;
        // ball.position.x = boundingBox.min.x + ball.radius;
        // ball.velocity.x = -ball.velocity.x;
    }

    if ((ball.position.z + ball.radius) > boundingBox.max.z) {
        ball.position.z = boundingBox.max.z - ball.radius;
        ball.velocity.z = -ball.velocity.z;
    } else if ((ball.position.z - ball.radius) < boundingBox.min.z) {
        ball.position.z = boundingBox.min.z + ball.radius;
        ball.velocity.z = -ball.velocity.z;
    }

    if (ball.insideFloor) {
        ball.position.y = BALL_RADIUS;
        ball.velocity.y = 0;
    }
}