// Constants
let BALL_RADIUS = 0.5;
let BALL_DIAM = BALL_RADIUS + BALL_RADIUS;
let BALL_DRAG = 0.03;
let RESTITUTION = 1;
let epsilon = 0.05;
let GRAVITY = 9.8;
var xAxis = new THREE.Vector3(1, 0, 0);
var zAxis = new THREE.Vector3(0, 0, 1);


class Ball extends THREE.Mesh {
    constructor(pos, vel) {
        // 5x2.5 car with 0.5 radius wheels
        let geometry = new THREE.SphereBufferGeometry(BALL_RADIUS, 8, 8);
        let material = new THREE.MeshBasicMaterial({
            //        flatShading: true,
            color: 0x4083c7,
            wireframe: true
        });
        super(geometry, material);

        this.position.set(pos.x, pos.y, pos.z);
        this.velocity = vel;
        this.radius = BALL_RADIUS;
        this.mass = 1;
        this.gravity = false;
        var axesHelper = new THREE.AxesHelper(1);
        this.add(axesHelper);
    }
    checkCollision(ball) {
        let m1 = this.mass;
        let m2 = ball.mass;
        let dist = this.position.clone().sub(ball.position); // (x1- x2)        

        // v1'
        // this.velocity.sub()


        /*
        // If balls are touching
        let dist = this.position.clone().sub(ball.position);
        let dist2 = dist.clone();
        let l = dist.length();
        if (l > BALL_DIAM) return; // Balls aren't colliding


        // Move them to where they're not touching
        dist.normalize();
        this.position.sub(dist.clone().multiplyScalar((l - BALL_DIAM) / 2));
        ball.position.add(dist.clone().multiplyScalar((l - BALL_DIAM) / 2));

        // Give respective velocities
        let m1 = this.mass;
        let m2 = ball.mass;
        let v = this.velocity.clone().sub(ball.velocity);
        let vn = v.clone().dot(dist);

        if (vn > 0) return;

        let i = (-(1 + RESTITUTION) * vn) / (1 / m1 + 1 / m2);
        let impulse = dist2.clone().multiplyScalar(i);

        this.velocity.add(impulse.clone().multiplyScalar(1 / m1));
        ball.velocity.sub(impulse.clone().multiplyScalar(1 / m2));
        */
    }

    updatePhysics(delta) {
        if (this.velocity.length() == 0)
            return

        // Update rotation                
        this.rotateOnWorldAxis(zAxis, -this.velocity.x * delta * 2);
        this.rotateOnWorldAxis(xAxis, this.velocity.z * delta * 2);

        // Update position
        this.position.addScaledVector(this.velocity, delta);

        // Update velocity
        // Create drag vector
        // let drag = this.velocity.clone().negate().normalize().multiplyScalar
        this.velocity.sub(this.velocity.clone().normalize().multiplyScalar(BALL_DRAG));
        if (this.gravity)
            this.velocity.y += GRAVITY * delta;
        // Apply epsilon
        if (this.velocity.length() < epsilon)
            this.velocity.set(0, 0, 0);

        return this.position.y;
    }


}


function insertionSort(bals) {
    for (let p = 1; p < bals.length; p++) {
        let tmp = bals[p];
        let j = p;

        for (; j > 0 && tmp.compareTo(bals[j - 1]) < 0; j--)
            bals[j] = bals[j - 1];

        bals[j] = tmp;
    }
}