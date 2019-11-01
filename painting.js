var PAINTING_WIDTH = 8,
    PAINTING_HEIGHT = 5,
    PAINTING_THICK = 0.1;

class Painting extends THREE.Mesh {
    constructor() {
        let a = 1;
        let b = 2.5;

        // 5x2.5 car with 0.5 radius wheels
        let geometry = new THREE.BoxBufferGeometry(0.01, 0.01, 0.01); // FIX, this is bullshit
        let material = new THREE.MeshBasicMaterial({
            //        flatShading: true,
            color: 0x4083c7,
            wireframe: !isWireframe
        });

        super(geometry, material);
        this.position.y = 5;
        this.position.z = -5;
        this.position.x = 3;

        for (var j = 0; j < 8; j++) {
            for (var i = 0; i < 6; i++) {
                let cylinder = this.createCylinder(a / 2, a / 2 + (i * (b + a)), a / 2 + (j * (b + a)));
                this.add(cylinder);
                if (j > 6)
                    continue;
                if (i > 4)
                    continue;
                let box = this.createBox(b - a / 2, a + b / 2 + (a + b) * i, a + b / 2 + (a + b) * j);
                this.add(box);

            }
        }

        this.rotation.z -= Math.PI / 2;
    }

    toggleAxes(bool) {
        this.axisHelp.visible = bool;
    }

    createCylinder(radius, x, z) {
        let height = 1
        let geometry = new THREE.CylinderBufferGeometry(radius, radius, height, 10);
        let material = new THREE.MeshBasicMaterial({
            //        flatShading: true,
            color: 0x4083c7,
            wireframe: !isWireframe
        });
        var ball = new THREE.Mesh(geometry, material);
        ball.position.set(x, height / 2, z);
        return ball;
    }

    createBox(side, x, z) {
        let height = 1
        let geometry = new THREE.BoxBufferGeometry(side, height, side);
        let material = new THREE.MeshBasicMaterial({
            //        flatShading: true,
            color: 0x4083c7,
            wireframe: !isWireframe
        });
        var box = new THREE.Mesh(geometry, material);
        box.position.set(x, height / 2, z);
        return box;
    }
}