// Constants
let BALL_RADIUS = 0.5;
let BALL_DIAM = BALL_RADIUS + BALL_RADIUS;
let BALL_DRAG = 3;
let RESTITUTION = 1;
let epsilon = 0.1;
let GRAVITY = 12;
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
        this.insideFloor = true;
        var axesHelper = new THREE.AxesHelper(1);
        this.add(axesHelper);
        this.axisHelp = axesHelper;
        this.axisHelp.visible = ballAxisVisible;
    }

    toggleAxes(bool) {
        this.axisHelp.visible = bool;
    }

    checkCollision(ball) {
        // If balls are touching
        let dist = this.position.clone().sub(ball.position);
        let l = dist.length();
        if (l > BALL_DIAM) return; // Balls aren't colliding

        // Move them to where they're not touching
        dist.normalize();
        this.position.sub(dist.clone().multiplyScalar((l - BALL_DIAM) / 2));
        ball.position.add(dist.clone().multiplyScalar((l - BALL_DIAM) / 2));


        let m1 = this.mass;
        let m2 = ball.mass;


        let dist1 = this.position.clone().sub(ball.position); // (x1- x2)        
        let dist2 = ball.position.clone().sub(this.position); // (x1- x2)        

        let difv1 = this.velocity.clone().sub(ball.velocity); // (v1-v2)
        let difv2 = difv1.clone().negate(); // (v2-v1)
        let vn = difv1.dot(dist1) //  <(v1-v2), (x1-x2)>
        vn *= 2 * m2 / (m1 + m2) / (dist1.length() ** 2);

        let vn2 = difv2.dot(dist2); //  <(v2-v1), (x2-x1)>
        vn2 *= 2 * m1 / (m1 + m2) / (dist2.length() ** 2);

        this.velocity.sub(dist1.multiplyScalar(vn));
        ball.velocity.sub(dist2.multiplyScalar(vn2));

        /*  
            
        // Inelastic collision:

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

        // Update position
        this.position.addScaledVector(this.velocity, delta);

        // Update rotation                
        this.rotateOnWorldAxis(zAxis, -this.velocity.x * delta / BALL_RADIUS);
        this.rotateOnWorldAxis(xAxis, this.velocity.z * delta / BALL_RADIUS);

        // Update velocity with drag
        this.velocity.sub(this.velocity.clone().normalize().multiplyScalar(BALL_DRAG * delta));

        // Apply epsilon
        if (this.velocity.length() < epsilon)
            this.velocity.set(0, 0, 0);

        // if (this.gravity)
        this.velocity.y -= GRAVITY * delta;

        return this.position.y;
    }
}