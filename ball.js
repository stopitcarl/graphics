// Constants
let BALL_RADIUS = 0.5;
let BALL_DRAG = 0.01;
let RESTITUTION = 0.8;
let epsilon = 0.01;


class Ball extends THREE.Mesh {
    constructor(x, y, z, velX, velY, velZ) {
        // 5x2.5 car with 0.5 radius wheels
        let geometry = new THREE.SphereBufferGeometry(BALL_RADIUS, 10, 10);
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
    checkCollision(ball) {
        // get the mtd
        let myPos = this.position.clone();

        let delta = (myPos.sub(ball.position));
        let r = this.radius + ball.radius;
        let dist2 = delta.dot(delta);

        if (dist2 > r * r) return; // they aren't colliding

        debugger;
        let d = delta.length();

        let mtd = new THREE.Vector3();
        if (d != 0.0) {
            mtd = delta.multiplyScalar(((this.radius + ball.radius) - d) / d); // minimum translation distance to push balls apart after intersecting

        } else // Special case. Balls are exactly on top of eachother.  Don't want to divide by zero.
        {
            console.log("nope");
            d = ball.radius + this.radius - 1.0;
            delta = new THREE.Vector3(ball.radius + this.radius, 0, 0);

            mtd = delta.multiplyScalar(((this.radius + ball.radius) - d) / d);
        }

        // resolve intersection
        let im1 = 1 / this.mass; // inverse mass quantities
        let im2 = 1 / ball.mass;

        // push-pull them apart
        let mtd1 = mtd.clone();
        let mtd2 = mtd.clone();
        let mtd3 = mtd.clone();
        let mtd4 = mtd.clone();
        this.position.add(mtd1.multiplyScalar(im1 / (im1 + im2)));
        ball.position.sub(mtd2.multiplyScalar(im2 / (im1 + im2)));

        // impact speed
        let v = this.velocity.sub(ball.velocity);
        let vn = v.dot(mtd3.normalize());

        // sphere intersecting but moving away from each other already
        if (vn > 0.0) return;

        // collision impulse
        let i = (-(1.0 + RESTITUTION) * vn) / (im1 + im2);
        let impulse = mtd4.multiplyScalar(i);

        // change in momentum
        this.velocity = this.velocity.add(impulse.multiplyScalar(im1));
        ball.velocity = ball.velocity.sub(impulse.multiplyScalar(im2));
    }

    updatePhysics(delta) {

        // Update position        
        this.position.addScaledVector(this.velocity, delta);
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