// Creating a Scene
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100 );

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 3;

// Adding light to the scene
const light	= new THREE.DirectionalLight( 0xffffff, 1.3 );
light.position.set(5,5,5);
scene.add( light );
light.castShadow = true;
light.shadowCameraNear = 0.01;
light.shadowCameraFar	= 15;
light.shadowCameraFov	= 45;
light.shadowCameraLeft = -1;
light.shadowCameraRight	=  1;
light.shadowCameraTop	=  1;
light.shadowCameraBottom = -1;
light.shadowBias = 0.001;
light.shadowDarkness = 0.2;
light.shadowMapWidth = 1024;
light.shadowMapHeight	= 1024;

// Creating the sphere
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshPhongMaterial();
const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

// Applying texture to the sphere
material.map = THREE.ImageUtils.loadTexture('ressources/earthmap1k.jpg');
// Adding the bumps to the texture
material.bumpMap = THREE.ImageUtils.loadTexture('ressources/earthbump1k.jpg');
material.bumpScale = 0.02;

//Adding the starfield
let starGeometry = new THREE.SphereGeometry(4, 50, 50);
let starMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.ImageUtils.loadTexture('ressources/galaxy_starfield.png'),
  side: THREE.DoubleSide,
  shininess: 0
});
let starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);

// Rendering the scene
let r = 2;
let theta = 0;
let dTheta = 2 * Math.PI / 1000;

const animate = () => {
  requestAnimationFrame(animate);

  theta += dTheta;
  earthMesh.rotation.y -= 0.005;
  earthMesh.position.x = r * Math.cos(theta);
  earthMesh.position.z = r * Math.sin(theta);
	renderer.render(scene, camera);
}

animate();