let SIDE = 2.5;
let SPEED = 0.5;
let xAxis = new THREE.Vector3(1, 0, 0);
let yAxis = new THREE.Vector3(0, 1, 0);
let zAxis = new THREE.Vector3(0, 0, 1);

class Dice extends THREE.Mesh {

    constructor() {

        let geometry = new THREE.BoxBufferGeometry(SIDE, SIDE, SIDE);
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
        /* THESE QUICK MATHS ARE TRASH */
        this.position.set(0, SIDE, 0);
        this.rotation.x = Math.PI / 4;
        this.rotation.z = Math.PI / 4;
    }

    update(delta) {
        this.rotateOnWorldAxis(yAxis, SPEED * delta);
    }

}