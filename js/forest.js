// Final Project Prototype
let camera, scene, renderer, controls, mesh;

function init() {
  // create a scene:
  scene = new THREE.Scene();
  let width = window.innerWidth;
  let height = window.innerHeight;

  // create a camera
  camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 25000);
  camera.position.z = 700;
  camera.position.y = 200;
  scene.add(camera);

  let light = new THREE.AmbientLight(0x2F32F3);
  scene.add(light);

  // lets make some textures
  let textureLoader = new THREE.TextureLoader();
  textureLoader.load('ice.jpg', function(texture) {
    // create a box and material to go on the cube
    geometry = new THREE.SphereGeometry(100, 20, 20); // radius, additional vertices
    // create a mesh with our geometry and material
    let material = new THREE.MeshStandardMaterial({map: texture});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-100,50,-300);
    scene.add(mesh);
  });

  // create a renderer and add it to the dom
  renderer = new THREE.WebGLRenderer({alpha:1, antialias: true});
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
}

// animate the exit portal
let current = -100;
let dir = 1;
function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.005;

  if(current > 50) {
    dir = -1;
  } else if (current < -100) {
    dir = 1;
  }
  current += 0.5*dir;
  mesh.position.x = current;

  renderer.render(scene, camera);
}

function enlarge(e) {
  if(mesh.position.z > 0) {
    return;
  }
  requestAnimationFrame(enlarge);
  mesh.position.z += 0.5;
}

init();

// wait for page load
window.addEventListener("load", function(e){
  animate();
  document.querySelector("canvas").addEventListener("click", function() {
    enlarge();
    obj = document.getElementById("helper");
    obj.style.visibility = 'visible';
  });
});
