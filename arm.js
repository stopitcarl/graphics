let mainJoint, secJoint;

function createRoboticArm(base) {
    var materialLight = new THREE.MeshLambertMaterial({
        color: 0x6e653b,
        wireframe: true
    });
    var materialDark = new THREE.MeshLambertMaterial({
        color: 0xe6af63,
        wireframe: true
    });
    var materialDarkGrey = new THREE.MeshLambertMaterial({
        color: 0x3d7a3c,
        wireframe: true
    });
    var materialBlack = new THREE.MeshLambertMaterial({
        color: 0x9c9c9c,
        wireframe: true
    });



    mainJoint = createJoint(base, 0.01, 0);
    var primaryArm = createArm(mainJoint, 0.2, 3);
    secJoint = createJoint(primaryArm, 0.3, 3);
    secJoint.rotation.z = -Math.PI / 2;
    var secArm = createArm(secJoint, 0.1, 2);
    var endJoint = createJoint(secArm, 0.05, 2);
    var baseHand = createBox(endJoint, 0.7, 0.05, 0.4, 0, 0, 0);
    createBox(baseHand, 0.15, 0.6, 0.15, 0.25, 0.6 * 0.5, 0).material = materialDarkGrey;
    createBox(baseHand, 0.15, 0.6, 0.15, -0.25, 0.6 * 0.5, 0).material = materialDarkGrey;

    mainJoint.castShadow = true;



    // Helper functions
    function createArm(obj, width, length) {
        var armGeometry = new THREE.BoxBufferGeometry(width, length, width);
        var arm = new THREE.Mesh(armGeometry, materialLight);
        arm.castShadow = true;
        arm.position.y = length * 0.5;
        obj.add(arm);
        return arm;
    }

    function createJoint(obj, radius, lengthOfArm) {
        var jointGeometry = new THREE.SphereBufferGeometry(radius, 10, 10);
        var joint = new THREE.Mesh(jointGeometry, materialDark);
        joint.position.y = lengthOfArm * 0.5;
        obj.add(joint);
        return joint;
    }

    function createBox(obj, x, y, z, x_offset, y_offset, z_offset) {
        var boxGeometry = new THREE.BoxBufferGeometry(x, y, z);
        var box = new THREE.Mesh(boxGeometry, materialBlack);
        box.position.x = x_offset;
        box.position.y = y_offset;
        box.position.z = z_offset;
        obj.add(box);
        return box;
    }

    return endJoint;
}


function rotateMain(deg) {
    deg /= 180 / Math.PI;
    mainJoint.rotation.z += deg;
}