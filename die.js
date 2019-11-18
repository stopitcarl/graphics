let SIDE = 2.5;
let SPEED = 0.5;
let FACES = 6;
/* ROTATEZ = -2arctg(sqrt(2) - sqrt(3)) */
let ROTATEZ = 0.6154797087
let xAxis = new THREE.Vector3(1, 0, 0);
let yAxis = new THREE.Vector3(0, 1, 0);
let zAxis = new THREE.Vector3(0, 0, 1);

class Die extends THREE.Mesh {

    constructor() {

        let geometry = new THREE.BoxGeometry(SIDE, SIDE, SIDE);

        /* Phong */
        let phong = [
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load("assets/texture/1.png"),
                bumpMap: new THREE.TextureLoader().load("assets/bump/1.png")
            }),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load("assets/texture/2.png"),
                bumpMap: new THREE.TextureLoader().load("assets/bump/2.png")
            }),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load("assets/texture/3.png"),
                bumpMap: new THREE.TextureLoader().load("assets/bump/3.png")
            }),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load("assets/texture/4.png"),
                bumpMap: new THREE.TextureLoader().load("assets/bump/4.png")
            }),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load("assets/texture/5.png"),
                bumpMap: new THREE.TextureLoader().load("assets/bump/5.png")
            }),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load("assets/texture/6.png"),
                bumpMap: new THREE.TextureLoader().load("assets/bump/6.png")
            }),
        ];

        /* Basic */
        let basic = [
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("assets/texture/1.png")
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("assets/texture/2.png")
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("assets/texture/3.png")
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("assets/texture/4.png")
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("assets/texture/5.png")
            }),
            new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("assets/texture/6.png")
            }),
        ];

        super(geometry, phong);
        this.phongM = phong;
        this.basicM = basic;
        this.init();

    }

    init() {
        this.position.set(0, 0, 0);
        this.rotation.x = 0;
        this.rotation.y = 0;
        this.rotation.z = 0;
        this.rotateOnWorldAxis(xAxis, -Math.PI / 4);
        this.rotateOnWorldAxis(zAxis, ROTATEZ);
        this.position.set(0, SIDE * Math.sqrt(3) / 2 + FLOOR_HEIGHT / 2, 0);
    }

    phong() {
        this.material = this.phongM;
    }

    basic() {
        this.material = this.basicM;
    }

    update(delta) {
        this.rotateOnWorldAxis(yAxis, SPEED * delta);
    }

    wireFrame(bool) {
        for (let i = 0; i < FACES; i++) {
            this.phongM[i].wireframe = bool;
            this.basicM[i].wireframe = bool;
        }
    }
}