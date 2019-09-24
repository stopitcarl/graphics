var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();
var up = 1;
function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;
    //camera.position.y = 0.1;
    //camera.position.x = 0.1;

    scene = new THREE.Scene();
    

	// geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	// material = new THREE.MeshNormalMaterial();

    // mesh = new THREE.Mesh( geometry, material );
    table = createTable();
    scene.add( table );
	// scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

//	mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.02;    
    if(camera.position.y > 0.1)
        up =-1;
    else if(camera.position.y < -0.1)
        up = 1;        
    
    camera.position.y += 0.01* up;

	renderer.render( scene, camera );

}



