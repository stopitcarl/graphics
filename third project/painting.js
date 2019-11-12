var PAINTING_WIDTH = 4,
    PAINTING_THICK = 0.2;



class Painting extends THREE.Mesh {
    constructor(pos) {
        let nCols = 10;
        let nRows = 6;
        let a = 0.1;
        var sqrt2 = Math.sqrt(2) * a;
        let b = (PAINTING_WIDTH - a) / (nCols - 1);
        let PAINTING_HEIGHT = a + b * (nRows - 1);
        let objects = [];


        let geometry = new THREE.BoxBufferGeometry(PAINTING_HEIGHT, PAINTING_THICK, PAINTING_WIDTH);
        let frame1 = new THREE.BoxBufferGeometry(PAINTING_THICK, PAINTING_THICK, PAINTING_WIDTH);
        let frame2 = new THREE.BoxBufferGeometry(PAINTING_HEIGHT + 2 * PAINTING_THICK, PAINTING_THICK, PAINTING_THICK);

        let basicF = new THREE.MeshBasicMaterial({
            // flatShading: true,
            color: 0x666666
        });
        let lambertF = new THREE.MeshLambertMaterial({
            color: 0x666666

        });
        let phongF = new THREE.MeshPhongMaterial({
            color: 0x666666
        });

        let basicM = new THREE.MeshBasicMaterial({
            // flatShading: true,
            color: 0x666666
        });
        let lambertM = new THREE.MeshLambertMaterial({
            color: 0x666666

        });
        let phongM = new THREE.MeshPhongMaterial({
            color: 0x666666,

        });

        super(geometry, phongM);
        this.position.y = pos.y;
        this.position.z = pos.z;
        this.position.x = pos.x - PAINTING_THICK / 2;
        this.objects = objects;
        this.basicM = basicM;
        this.lambertM = lambertM;
        this.phongM = phongM;

        for (var j = 0; j < nRows; j++) { // How many rows
            for (var i = 0; i < nCols; i++) { // How many cols
                let cylinder = new Cylinder(a / 2,
                    -PAINTING_HEIGHT / 2 + a / 2 + j * b,
                    -PAINTING_WIDTH / 2 + a / 2 + i * b);
                objects.push(cylinder);
                this.add(cylinder);
                if (j > nRows - 2)
                    continue;
                if (i > nCols - 2)
                    continue;
                let box = new Box(b - sqrt2 / 2,
                    -PAINTING_HEIGHT / 2 + a / 2 + b / 2 + b * j,
                    -PAINTING_WIDTH / 2 + a / 2 + b / 2 + b * i);
                this.add(box);
                objects.push(box);
            }
        }
        this.add()

        // Frame
        let f1 = new THREE.Mesh(frame1, phongF);
        f1.position.x = -PAINTING_HEIGHT / 2 - PAINTING_THICK / 2;
        this.add(f1);
        let f2 = new THREE.Mesh(frame1, phongF);
        f2.position.x = +PAINTING_HEIGHT / 2 + PAINTING_THICK / 2;
        this.add(f2);
        let f3 = new THREE.Mesh(frame2, newM);
        f3.position.z = -PAINTING_WIDTH / 2 - PAINTING_THICK / 2;
        this.add(f3);
        let f4 = new THREE.Mesh(frame2, newM);
        f4.position.z = PAINTING_WIDTH / 2 + PAINTING_THICK / 2;
        this.add(f4);



        this.rotation.z -= Math.PI / 2;

    }

    getCenter() {
        return this.position;
    }

    getWidth() {
        return PAINTING_WIDTH;
    }

    phong() {
        this.material = this.phongM;
        this.objects.forEach(obj => {
            obj.phong();
        });
    }

    lambert() {
        this.material = this.lambertM;
        this.objects.forEach(obj => {
            obj.lambert();
        });
    }

    basic() {
        this.material = this.basicM;
        this.objects.forEach(obj => {
            obj.basic();
        });
    }
}

class Box extends THREE.Mesh {
    constructor(side, x, z) {
        let height = 0.2
        var basicM = new THREE.MeshBasicMaterial({
            // flatShading: true,
            color: 0x000000
        });
        let lambertM = new THREE.MeshLambertMaterial({
            color: 0x000000
        });
        let phongM = new THREE.MeshPhongMaterial({
            color: 0x000000
        });

        let geometry = new THREE.BoxBufferGeometry(side, height, side);
        super(geometry, phongM);
        this.position.set(x, -(height / 2 + PAINTING_THICK / 2), z);
        this.basicM = basicM;
        this.lambertM = lambertM;
        this.phongM = phongM;
    }
    phong() {
        this.material = this.phongM;
    }

    lambert() {
        this.material = this.lambertM;
    }

    basic() {
        this.material = this.basicM;
    }
}


class Cylinder extends THREE.Mesh {
    constructor(radius, x, z) {
        let height = 0.2
        var basicM = new THREE.MeshBasicMaterial({
            // flatShading: true,
            color: 0xffffff,

        });
        let lambertM = new THREE.MeshLambertMaterial({
            color: 0xffffff,

        });
        let phongM = new THREE.MeshPhongMaterial({
            color: 0xffffff,

        });
        let geometry = new THREE.CylinderBufferGeometry(radius, radius, height, 10);
        super(geometry, phongM);
        this.position.set(x, -(height / 2 + PAINTING_THICK / 2), z);
        this.basicM = basicM;
        this.lambertM = lambertM;
        this.phongM = phongM;
    }
    phong() {
        this.material = this.phongM;
    }

    lambert() {
        this.material = this.lambertM;
    }

    basic() {
        this.material = this.basicM;
    }
}


class Frame extends THREE.Mesh {
    constructor(width, height, depth, x, y, z) {
        let height = 0.2
        var basicM = new THREE.MeshBasicMaterial({
            // flatShading: true,
            color: 0x000000
        });
        let lambertM = new THREE.MeshLambertMaterial({
            color: 0x000000
        });
        let phongM = new THREE.MeshPhongMaterial({
            color: 0x000000
        });

        let geometry = new THREE.BoxBufferGeometry(width, height, depth);
        super(geometry, phongM);
        this.position.set(x, -(height / 2 + PAINTING_THICK / 2), z);
        this.basicM = basicM;
        this.lambertM = lambertM;
        this.phongM = phongM;
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
    phong() {
        this.material = this.phongM;
    }

    lambert() {
        this.material = this.lambertM;
    }

    basic() {
        this.material = this.basicM;
    }
}