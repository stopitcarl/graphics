let TURN_RATE = 2,
    SHOOT_SPEED = 7;


class Cannon extends THREE.Mesh {
    constructor(selected, x, z) {
        var outerRadius = 0.8;
        var innerRadius = 0.7;
        var height = 5;
        var deselectedMaterial = new THREE.MeshBasicMaterial({
            color: 0x4083c7,
            wireframe: true
        });

        var selectedMaterial = new THREE.MeshBasicMaterial({
            color: 0x722fd2,
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

        // 90IQ play
        super(geometry, selected ? selectedMaterial : deselectedMaterial);

        this.selectedMaterial = selectedMaterial;
        this.deselectedMaterial = deselectedMaterial;

        // Set rotation
        this.rotation.z = Math.PI / 2;
        this.position.y += innerRadius;

        // Set cannon to right position
        this.position.x = x;
        this.position.z = z;

        this.dir = 0;
    }

    select() {
        this.material = this.selectedMaterial;
    }

    deselect() {
        this.material = this.deselectedMaterial;
    }

    rotate(deg, delta) {
        deg /= 180 / Math.PI;
        this.dir += deg * TURN_RATE * delta;
        this.rotation.y = -dir;
    }

    shoot() {
        var ball = new Ball(this.position,
            new THREE.Vector3(
                SHOOT_SPEED * Math.cos(this.dir),
                0,
                SHOOT_SPEED * Math.sin(this.dir)));
        return ball;
    }

}