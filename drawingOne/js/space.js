// Final Project Prototype
let camera, scene, renderer, controls;

let meshes = [];

function randomInInterval(min, max) {
    return Math.random() * (max - min) + min;
}

function init() {
  const box = document.getElementById("box");

  // create a scene:
  scene = new THREE.Scene();
  let width = box.clientWidth;
  let height = box.clientHeight;

  // create a camera
  camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
  camera.position.z = 500;
  scene.add(camera);

  let light = new THREE.DirectionalLight(0xffffff);
  light.position.set(20,20,20);
  scene.add(light);

  // create backdrop
  const planeMat = new THREE.MeshLambertMaterial({color:0x000000});
  const planeGeo = new THREE.PlaneGeometry(900, 900, 20, 20);
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.position.set(0,0,-500);
  scene.add(plane);

  // create portal shapes
  const material = new THREE.MeshLambertMaterial({color: 0xffffff});
  for(let i = 0; i < 150; i++) {
    const geo = new THREE.SphereGeometry(1, 20, 20);
    const mesh = new THREE.Mesh(geo, material);

    // ranomly place in our scene
    const posx = randomInInterval( -(width/2) , (width/2) );
    const posy = randomInInterval( -(height/2) , (height/2) );
    const posz = randomInInterval(-501, 450);
    mesh.position.set(posx,posy,posz);

    const speed = randomInInterval(1,4);

    meshes.push( {mesh: mesh, speed:speed} );
    scene.add(mesh);
  }

  // create a renderer and add it to the dom
  renderer = new THREE.WebGLRenderer({alpha:1, antialias: true});
  renderer.setSize(width, height);

  box.appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

multiplier = false;
// animate the spheres
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

function changeColor(box) {
  const curr = box.style.borderColor;
  if(curr == "rgb(224, 0, 74)") {
    box.style.borderColor = "rgb(19, 28, 127)"
  } else {
    box.style.borderColor = "rgb(224, 0, 74)"
  }
}

function main() {
  init();
  animate();

  const box = document.getElementById("box");
  setInterval(changeColor.bind(null,box),2000);

  // speed up particles on click
  document.body.addEventListener("mousedown", (e) => {multiplier=(!multiplier)});
}

// wait for page load
window.addEventListener("load", main);
