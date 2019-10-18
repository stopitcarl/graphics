let base, armBase;
let wheels = [];
let VELOCITY = 0.1,
    TURN_RATE = 2,
    ARM_TURN_RATE = 3;
let dir = 0;

class Cannon extends THREE.Mesh {
    constructor(height, width) {

        var outerRadius = 1.2;
        var innerRadius = 1;
        var height = 5;
        let material = new THREE.MeshLambertMaterial({
            //        flatShading: true,
            color: 0x4083c7,
            wireframe: true
        });

        var arcShape = new THREE.Shape();
        arcShape.moveTo(outerRadius * 2, outerRadius);
        arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false);
        var holePath = new THREE.Path();
        holePath.moveTo(outerRadius + innerRadius, outerRadius);
        holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, true);
        arcShape.holes.push(holePath);

        var geometry = new THREE.ExtrudeGeometry(arcShape, {
            amount: height,
            bevelEnabled: false,
            steps: 1,
            curveSegments: 20
        });
        geometry.center();
        geometry.rotateX(Math.PI * -.5);
        // var mesh = new THREE.Mesh(geometry, material);



        // 5x2.5 car with 0.5 radius wheels
        let geometrybox = new THREE.BoxBufferGeometry(5, 0.2, 2.5);
        super(geometry, material);
        this.rotation.z = Math.PI / 2;
        this.position.y = outerRadius >> 1;
        // base.castShadow = true;
        // base.receiveShadow = true;

        // this.createWheel(this, 2, -0.6, 0.75); //  front right wheel
        // this.createWheel(this, 2, -0.6, -0.75); // front left wheel 
        // this.createWheel(this, -2, -0.6, 0.75); // back right wheel
        // this.createWheel(this, -2, -0.6, -0.75); // back left wheel
        // armBase = this.createBase(this);
        // createRoboticArm(armBase);
        base = this;
    }

    createWheel(obj, x, y, z) {
        let geometry = new THREE.SphereBufferGeometry(0.5, 10, 10);
        let material = new THREE.MeshLambertMaterial({
            flatShading: true,
            color: 0x3eb59b,
            wireframe: true
        });
        var wheel = new THREE.Mesh(geometry, material);
        let wheelAxis = new THREE.Mesh(new THREE.Geometry(), material);
        wheelAxis.position.x = x;
        wheelAxis.position.y = y;
        wheelAxis.position.z = z;
        // wheel.castShadow = true;
        //wheel.receiveShadow = true;
        wheelAxis.add(wheel);
        obj.add(wheelAxis)
        wheels.push(wheelAxis);
    }

    createBase(obj) {
        var geometry = new THREE.SphereBufferGeometry(0.7, 15, 15, 0, Math.PI * 2, 0, Math.PI / 2);
        var material = new THREE.MeshLambertMaterial({
            flatShading: true,
            color: 0xe6af63,
            wireframe: true
        });
        var base = new THREE.Mesh(geometry, material);

        base.position.y = 0.1;
        base.side = THREE.DoubleSide;
        // base.receiveShadow = true;
        obj.add(base);
        return base;
    }
}

function rotateCar(deg) {
    deg /= 180 / Math.PI;
    dir += deg * TURN_RATE;
    base.rotation.y = -dir;
    for (let i = 0; i < 4; i++)
        // wheels[i].children[0].rotation.x -= (i < 2 ? -1 : 1) * 4 * deg;
        break;

}

function moveCar(vel) {
    vel *= VELOCITY;
    base.position.x += vel * Math.cos(dir);
    base.position.z += vel * Math.sin(dir);
    wheels.forEach(wheel => {
        wheel.rotation.z -= 2 * vel;
    })
}