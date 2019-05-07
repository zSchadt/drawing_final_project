// Final Project Prototype
let camera, scene, renderer, controls;

let meshes = [];

function init() {
  // only rendering within the div
  const box = document.getElementById("box");

  // create a scene:
  scene = new THREE.Scene();
  let width = window.innerWidth;
  let height = window.innerHeight;

  // create a camera
  camera = new THREE.PerspectiveCamera(45, width/height, 1, 2000);
  camera.position.z = 500;
  scene.add(camera);

  let light = new THREE.DirectionalLight(0xc6dcff);
  light.position.set(300,200,20);
  scene.add(light);

  let amb = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add(amb);

  // create backdrop
  const planeMat = new THREE.MeshLambertMaterial({color:0x000000});
  const planeGeo = new THREE.PlaneGeometry(800,800, 20, 20);
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.position.set(0,0,-1490);
  scene.add(plane);

  // create series of toruses coming towards user
  const loader = new THREE.TextureLoader();

  //1
  let torusGeometry = new THREE.TorusGeometry(100, 15, 15, 100);
  //let material = new THREE.MeshStandardMaterial({map: loader.load("media/asteroid.jpg")});
  let material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: true});
  let torus = new THREE.Mesh(torusGeometry, material);
  torus.position.set(0,0,390);
  // cast shadow
  torus.castShadow = true;
  meshes.push(torus);
  scene.add(torus);

  //2
  torusGeometry = new THREE.TorusGeometry(100, 15, 15, 100);
  //let material = new THREE.MeshStandardMaterial({map: loader.load("media/asteroid.jpg")});
  material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: true});
  torus = new THREE.Mesh(torusGeometry, material);
  torus.position.set(0,0,290);
  // cast shadow
  torus.castShadow = true;
  meshes.push(torus);
  scene.add(torus);

  //3
  torusGeometry = new THREE.TorusGeometry(100, 15, 15, 100);
  //let material = new THREE.MeshStandardMaterial({map: loader.load("media/asteroid.jpg")});
  material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: true});
  torus = new THREE.Mesh(torusGeometry, material);
  torus.position.set(0,0,130);
  // cast shadow
  torus.castShadow = true;
  meshes.push(torus);
  scene.add(torus);

  //4
  torusGeometry = new THREE.TorusGeometry(100, 15, 15, 100);
  //let material = new THREE.MeshStandardMaterial({map: loader.load("media/asteroid.jpg")});
  material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: true});
  torus = new THREE.Mesh(torusGeometry, material);
  torus.position.set(0,0,-200);
  // cast shadow
  torus.castShadow = true;
  meshes.push(torus);
  scene.add(torus);

  //5
  torusGeometry = new THREE.TorusGeometry(100, 15, 15, 100);
  //let material = new THREE.MeshStandardMaterial({map: loader.load("media/asteroid.jpg")});
  material = new THREE.MeshStandardMaterial({color: 0xffffff, wireframe: true});
  torus = new THREE.Mesh(torusGeometry, material);
  torus.position.set(0,0,-1000);
  // cast shadow
  torus.castShadow = true;
  meshes.push(torus);
  scene.add(torus);

  // create a renderer and add it to the dom
  renderer = new THREE.WebGLRenderer({alpha:1, antialias: true});
  renderer.setSize(width, height);

  document.body.appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

let zoom=false;
// animate the spheres
function animate() {
  requestAnimationFrame(animate);

  for(let i = 0; i < meshes.length; i++) {
    const mesh = meshes[i];

    if(i % 2 == 0) {
      mesh.rotation.z += .005;
    } else {
      mesh.rotation.z -= .005;
    }
    if(zoom) {
      mesh.position.z += 2;
      if(mesh.position.z > 550) {
        mesh.position.z = -1600;
      }
    }
  }

  renderer.render(scene, camera);
}

function changeColor(box) {
  const curr = box.style.borderColor;
  if(curr == "rgb(1, 48, 7)") {
    box.style.borderColor = "rgb(37, 140, 50)"
  } else {
    box.style.borderColor = "rgb(1, 48, 7)"
  }
}

function main() {
  init();
  animate();

  const box = document.getElementById("box");
  //setInterval(changeColor.bind(null,box),2000);
  setTimeout(()=>{zoom=true}, 2000);
}

// wait for page load
window.addEventListener("load", main);
