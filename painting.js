var PAINTING_WIDTH = 4,
    PAINTING_THICK = 0.4;



class Painting extends THREE.Mesh {
    constructor(pos) {
        let nCols = 10;
        let nRows = 6;
        let a = 0.1;
        var sqrt2 = Math.sqrt(2) * a;
        let b = (PAINTING_WIDTH - a) / (nCols - 1);
        let PAINTING_HEIGHT = a + b * (nRows - 1);
        let objects = [];



        // 5x2.5 car with 0.5 radius wheels
        let geometry = new THREE.BoxBufferGeometry(PAINTING_HEIGHT, PAINTING_THICK, PAINTING_WIDTH);
        let material = new THREE.MeshBasicMaterial({
            // flatShading: true,
            color: 0x666666,
            wireframe: !isWireframe
        });

        super(geometry, material);
        this.position.y = pos.y;
        this.position.z = pos.z;
        this.position.x = pos.x - PAINTING_THICK / 2;
        this.height

        for (var j = 0; j < nRows; j++) { // How many rows
            for (var i = 0; i < nCols; i++) { // How many cols
                let cylinder = new Cylinder(a / 2,
                    -PAINTING_HEIGHT / 2 + a / 2 + j * b,
                    -PAINTING_WIDTH / 2 + a / 2 + i * b);
                this.add(cylinder);
                if (j > nRows - 2)
                    continue;
                if (i > nCols - 2)
                    continue;
                let box = new Box(b - sqrt2 / 2,
                    -PAINTING_HEIGHT / 2 + a / 2 + b / 2 + b * j,
                    -PAINTING_WIDTH / 2 + a / 2 + b / 2 + b * i);
                this.add(box);
            }
        }

        this.rotation.z -= Math.PI / 2;

        function createCylinder(radius, x, z) {
            let height = 0.2
            let geometry = new THREE.CylinderBufferGeometry(radius, radius, height, 10);
            var ball = new THREE.Mesh(geometry, whiteMaterial);
            ball.position.set(x, -(height / 2 + PAINTING_THICK / 2), z);
            return ball;
        }

    }

    getCenter() {
        return this.position;
    }

    getWidth() {
        return PAINTING_WIDTH;
    }

    phong() {
        return PAINTING_WIDTH;
    }
}

class Box extends THREE.Mesh {
    constructor(side, x, z) {
        let height = 0.2
        var basic = new THREE.MeshBasicMaterial({
            // flatShading: true,
            color: 0x000000,
            wireframe: !isWireframe
        });
        let lambert = new THREE.MeshLambertMaterial({
            color: 0x000000,
            wireframe: !isWireframe
        });
        let phong = new THREE.MeshPhongMaterial({
            color: 0x000000,
            wireframe: !isWireframe
        });

        let geometry = new THREE.BoxBufferGeometry(side, height, side);
        super(geometry, basic);
        this.position.set(x, -(height / 2 + PAINTING_THICK / 2), z);
        this.basic = basic;
        this.lambert = lambert;
        this.phong = phong;
    }
}


class Cylinder extends THREE.Mesh {
    constructor(radius, x, z) {
        let height = 0.2
        var basic = new THREE.MeshBasicMaterial({
            // flatShading: true,
            color: 0xffffff,
            wireframe: !isWireframe
        });
        let lambert = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            wireframe: !isWireframe
        });
        let phong = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            wireframe: !isWireframe
        });
        let geometry = new THREE.CylinderBufferGeometry(radius, radius, height, 10);
        super(geometry, basic);
        this.position.set(x, -(height / 2 + PAINTING_THICK / 2), z);
        this.basic = basic;
        this.lambert = lambert;
        this.phong = phong;
    }
}