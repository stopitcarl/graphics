function createTarget() {
    // Em vez de copiarem tudo do createFloor ou createCar, preencham linha a linha
    // assim fazem so uma funçao e percebem tudo o que há pra perceber sobre three js
    // ps: os eixos estao trocados no threejs, o coutinho sabe mas ninguem diga ao neves
    // deixem-no perceber qual é qual

    var cylinderGeometry = new THREE.CylinderBufferGeometry(0.5, 0.5, 3, 32);
    var torusGeometry = new THREE.TorusBufferGeometry(0.3, 0.05, 20, 15);

    var cylinderMaterial = new THREE.MeshLambertMaterial({
        color: 0x32a852,
        wireframe: false
    });
    var torusMaterial = new THREE.MeshLambertMaterial({
        color: 0x4287f5,
        wireframe: false
    });

    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    var torus = new THREE.Mesh(torusGeometry, torusMaterial);

    cylinder.add(torus);

    /*
    Some moving around and rotating happens here:

    note: if u move fistObject (whichever that is) up, it will start from origin (where car is)
    but secondObject's starting point will be fistObject'center.

    u may need to rotate torus so it faces up.
    draw on paper first, hardcoding shit wont work cause brisson will know
    and we need paper for brisson, brisson likes paper, brisson was there when paper was invented
    he was the grandfather of the guy who invented paper
*/
    cylinder.position.x = 6;
    cylinder.position.y = 1.5;

    torus.position.y = 1.5 + 0.35;
    torus.rotation.y = Math.PI / 2;


    return cylinder;
