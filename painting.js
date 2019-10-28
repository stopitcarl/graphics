var PAINTING_WIDTH = 8,
    PAINTING_HEIGHT = 5,
    PAINTING_THICK = 0.1;

class Painting extends THREE.Mesh {
    constructor() {
        // 5x2.5 car with 0.5 radius wheels
        let geometry = new THREE.BoxBufferGeometry(1, 5, 3);
        let material = new THREE.MeshBasicMaterial({
            //        flatShading: true,
            color: 0x4083c7,
            wireframe: !isWireframe
        });
        super(geometry, material);
        this.position.y = 0.5;

        var axesHelper = new THREE.AxesHelper(1);
        this.add(axesHelper);
        this.axisHelp = axesHelper;
        this.axisHelp.visible = ballAxisVisible;
    }

    toggleAxes(bool) {
        this.axisHelp.visible = bool;
    }
}