function createRoboticArm(base) {
    var material = new THREE.MeshLambertMaterial({
        flatShading: true,
        color: 0xc49c18,
        wireframe: true
    });

    var mainJoint = createJoint(base, 0.2, 0);
    var primaryArm = createArm(mainJoint, 0.2, 3);
    var secJoint = createJoint(primaryArm, 0.3, 3);
    var secArm = createArm(secJoint, 0.1, 2);
    var endJoint = createJoint(secArm, 0.2, 2);


    // Helper functions
    function createArm(obj, width, length) {
        var armGeometry = new THREE.BoxBufferGeometry(width, length, width);
        var arm = new THREE.Mesh(armGeometry, material);
        arm.position.y = length * 0.5;
        obj.add(arm);
        return arm;
    }

    function createJoint(obj, radius, lengthOfArm) {
        var jointGeometry = new THREE.SphereBufferGeometry(radius, 10, 10);
        var joint = new THREE.Mesh(jointGeometry, material);
        joint.position.y = lengthOfArm * 0.5;
        obj.add(joint);
        return joint;
    }

    return mainJoint;
}