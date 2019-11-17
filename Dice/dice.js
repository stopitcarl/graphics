let SIDE = 2.5;
let SPEED = 0.5;
/* ROTATEZ = -2arctg(sqrt(2) - sqrt(3)) */
let ROTATEZ = 0.6154797087
let xAxis = new THREE.Vector3(1, 0, 0);
let yAxis = new THREE.Vector3(0, 1, 0);
let zAxis = new THREE.Vector3(0, 0, 1);

class Dice extends THREE.Mesh {

    constructor() {

        let geometry = new THREE.BoxGeometry(SIDE, SIDE, SIDE);
        let material = [ 
            new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("Dice/texture/1.png"), bumpMap: new THREE.TextureLoader().load("Dice/bump/1.png")}),
            new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("Dice/texture/2.png"), bumpMap: new THREE.TextureLoader().load("Dice/bump/2.png")}),
            new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("Dice/texture/3.png"), bumpMap: new THREE.TextureLoader().load("Dice/bump/3.png")}),
            new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("Dice/texture/4.png"), bumpMap: new THREE.TextureLoader().load("Dice/bump/4.png")}),
            new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("Dice/texture/5.png"), bumpMap: new THREE.TextureLoader().load("Dice/bump/5.png")}),
            new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("Dice/texture/6.png"), bumpMap: new THREE.TextureLoader().load("Dice/bump/6.png")}),
        ];

        super(geometry, material);
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

    update(delta) {
        this.rotateOnWorldAxis(yAxis, SPEED * delta);
    }

}