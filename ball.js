// Constants
let BALL_RADIUS = 3;
let PERIM_RADIUS = 8;
let MAX_VELOCITY = 80 * Math.PI / 180;
let ACCELERATION = 1 * Math.PI / 180;
let Y_AXIS = new THREE.Vector3(0, 1, 0);

class Ball extends THREE.Mesh {
    constructor() {
        // Creates texture
        var texture = new THREE.TextureLoader().load("assets/lenna.png");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);

        // Creates object
        let geometry = new THREE.SphereBufferGeometry(BALL_RADIUS, 20, 20);
        let phong = new THREE.MeshPhongMaterial({
            map: texture,
            shininess: 100
        });

        let basic = new THREE.MeshBasicMaterial({
            map: texture           
        });
        
        super(geometry, phong);
        this.phongM = phong;
        this.basicM = basic;
        this.init();
    }

    init() {
        this.position.set(PERIM_RADIUS, BALL_RADIUS, 0);
        this.velocity = 0;
        this.acceleration = ACCELERATION;
        this.phong();
    }

    updatePhysics(delta) {
        // Update velocity
        this.velocity += this.acceleration;

        if (this.velocity > MAX_VELOCITY) {
            this.velocity = MAX_VELOCITY;
        } else if (this.velocity < 0) {
            this.velocity = 0;
        }

        // Update position
        var x = this.position.x;
        var z = this.position.z;

        this.position.x = x * Math.cos(this.velocity * delta) + z * Math.sin(this.velocity * delta);
        this.position.z = z * Math.cos(this.velocity * delta) - x * Math.sin(this.velocity * delta);

        // Update rotation
        var posAxis = this.position.clone();
        posAxis.y = 0;
        posAxis.normalize()

        this.rotateOnWorldAxis(posAxis, -1 * (this.velocity * PERIM_RADIUS / BALL_RADIUS) * delta);
        this.rotateOnWorldAxis(Y_AXIS, this.velocity * delta);
    }

    toggleAcceleration() {
        this.acceleration *= -1;
    }

    phong() {
        this.material = this.phongM;
    }

    basic() {
        this.material = this.basicM;
    }

    wireframe(bool) {
        this.basicM.wireframe = bool;
        this.phongM.wireframe = bool;
        this.material.wireframe = bool;
    }
}