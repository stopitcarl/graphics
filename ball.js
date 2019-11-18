// Constants
let BALL_RADIUS = 2;
let PERIM_RADIUS = 8;
let MAX_VELOCITY = 100 * Math.PI / 180;
let ACCELERATION = 1 * Math.PI / 180;
let Y_AXIS = new THREE.Vector3(0, 1, 0);

class Ball extends THREE.Mesh {
    constructor() {
        // Creates texture
        var texture = new THREE.TextureLoader().load("brisson.png");
        /*texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);*/

        // Creates object
        let geometry = new THREE.SphereBufferGeometry(BALL_RADIUS, 20, 20);
        let material = new THREE.MeshPhongMaterial({
            //        flatShading: true,
            //color: 0x4083c7,
            map: texture,
            shininess: 100,
            wireframe: !isWireframe
        });
        super(geometry, material);
        this.init();
        var axesHelper = new THREE.AxesHelper(1);
        this.add(axesHelper);
        this.axisHelp = axesHelper;
        this.axisHelp.visible = true;
    }

    init() {
        this.position.set(PERIM_RADIUS, BALL_RADIUS, 0);
        this.velocity = 0;
        this.acceleration = ACCELERATION;
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
        var posAxis = this.position.clone().normalize();

        this.rotateOnWorldAxis(posAxis, -1 * (this.velocity * PERIM_RADIUS / BALL_RADIUS) * delta);
        this.rotateOnWorldAxis(Y_AXIS, this.velocity * delta);
    }

    toggleAcceleration() {
        this.acceleration *= -1;
    }
}