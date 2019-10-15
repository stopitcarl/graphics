// Constants
let BALL_RADIUS = 0.5;
let BALL_DIAM = BALL_RADIUS + BALL_RADIUS;
let BALL_DRAG = 0;
let RESTITUTION = 1;
let epsilon = 0.01;


class Ball extends THREE.Mesh {
    constructor(x, y, z, velX, velY, velZ) {
        // 5x2.5 car with 0.5 radius wheels
        let geometry = new THREE.SphereBufferGeometry(BALL_RADIUS, 5, 5);
        let material = new THREE.MeshLambertMaterial({
            //        flatShading: true,
            color: 0x4083c7,
            wireframe: true
        });
        super(geometry, material);

        this.position.set(x, y + BALL_RADIUS, z);
        this.velocity = new THREE.Vector3(velX, velY, velZ);
        this.radius = BALL_RADIUS;
        this.mass = 1;
    }
    checkCollision2(ball) {
        // If balls are touching
        let dist = this.position.clone().sub(ball.position);
        let dist2 = dist.clone();
        let l = dist.length();
        if (l > BALL_DIAM) return; // Balls aren't colliding
        console.log("hit");

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

        let i = (-2 * vn) / (1 / m1 + 1 / m2);
        let impulse = dist2.clone().multiplyScalar(i);

        this.velocity.add(impulse.clone().multiplyScalar(1 / m1));
        ball.velocity.sub(impulse.clone().multiplyScalar(1 / m2));
    }

    updatePhysics(delta) {

        // Update position        
        this.position.addScaledVector(this.velocity, delta);
        let v = new THREE.Vector3(0, 0, 1);
        
        // this.rotation.x += this.velocity.z * 2;
        
        // this.rotation.y = this.velocity.y * 2;
        this.rotation.z += this.velocity.x * 2;
        // Update velocity
        this.velocity.addScaledVector(this.velocity, -BALL_DRAG);
        // Apply epsilon
        // if (this.velocity.length < epsilon)
        //     this.velocity.set(0, 0, 0);
    }

    compareTo(ball) {
        // Double ternary expression = 999 IQ 
        return this.position.x > ball.position.x ? 1 : this.position.x < ball.position.x ? -1 : 0;

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