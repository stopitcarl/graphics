// Constants
let BALL_RADIUS = 2;
let PERIM_RADIUS = 10;
let MAX_VELOCITY = 3 * Math.PI / 180;
let ACCELERATION = 0.01 * Math.PI / 180;

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
            wireframe: false
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

    updatePhysics() {
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

        this.position.x = x * Math.cos(this.velocity) + z * Math.sin(this.velocity);
        this.position.z = z * Math.cos(this.velocity) - x * Math.sin(this.velocity);

        // Update rotation
        var posAxis = this.position.clone().normalize();
        var yAxis = new THREE.Vector3(0, 1, 0);

        this.rotateOnWorldAxis(posAxis, -1 * this.velocity);
        this.rotateOnWorldAxis(yAxis, this.velocity);
    }

    toggleAcceleration() {
        this.acceleration *= -1;
    }
}
