/* Zachary Schadt (zts214)
Assignment 7: WebGL */


function setupOne() {
  let portal = document.querySelectorAll(".portal")[0];

  // create a scene:
  const scene = new THREE.Scene();
  let width = portal.offsetWidth;
  let height = portal.offsetHeight;

  // create a camera
  const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 10000);
  camera.position.z = 500;
  scene.add(camera);

  let light = new THREE.AmbientLight(0x2F32F3);
  scene.add(light);

  let dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(1,1,1);
  scene.add(dir);

  // create a box and material to go on the cube
  let geometry = new THREE.SphereGeometry(150, 40, 40); // radius, additional vertices
  // create a mesh with our geometry and material
  let material = new THREE.MeshStandardMaterial({color: 0xff0000, wireframe:true});
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0,0,0);
  scene.add(mesh);

  // create a renderer and add it to the dom
  const renderer = new THREE.WebGLRenderer({alpha:1, antialias: true});
  renderer.setSize(width, height);
  portal.appendChild(renderer.domElement);

  animateOne(renderer, scene, camera);
}
function animateOne(renderer, scene, camera) {
  requestAnimationFrame(animateOne.bind(null, renderer, scene, camera));

  renderer.render(scene, camera);
}

function setupTwo() {
  let portal = document.querySelectorAll(".portal")[1];

  // create a scene:
  const scene = new THREE.Scene();
  let width = portal.offsetWidth;
  let height = portal.offsetHeight;

  // create a camera
  const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 10000);
  camera.position.z = 500;
  scene.add(camera);

  let light = new THREE.AmbientLight(0x2F32F3);
  scene.add(light);

  let dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(1,1,1);
  scene.add(dir);

  // create a box and material to go on the cube
  let geometry = new THREE.SphereGeometry(150, 40, 40); // radius, additional vertices
  // create a mesh with our geometry and material
  let material = new THREE.MeshStandardMaterial({color: 0xff0000, wireframe:true});
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0,0,0);
  scene.add(mesh);

  // create a renderer and add it to the dom
  const renderer = new THREE.WebGLRenderer({alpha:1, antialias: true});
  renderer.setSize(width, height);
  portal.appendChild(renderer.domElement);

  animateOne(renderer, scene, camera);
}
function animateTwo(renderer, scene, camera) {
  requestAnimationFrame(animateTwo.bind(null, renderer, scene, camera));

  renderer.render(scene, camera);
}

// after loading ...
function main() {

  setupOne();

  setupTwo();

  
  return 0;
}

// after loading page all page resources start exectution
window.addEventListener("load", main);
