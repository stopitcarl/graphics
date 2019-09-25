var camera, scene, renderer;
var table;

init();
animate();
var up = true;
//var step = 0;

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;    

    scene = new THREE.Scene();


    table = createTable();
    scene.add(table);
    // scene.add( mesh );

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);

    table.rotation.x += 0.01;
    table.rotation.y += 0.02;
    //    camera.rotation.x = Math.sin(step)*0.2
    //step += 0.02;




    renderer.render(scene, camera);

}