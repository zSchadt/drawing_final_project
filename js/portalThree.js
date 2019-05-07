/* Zachary Schadt (zts214)
Assignment 7: WebGL */


function initThree() {
  let portal = document.querySelectorAll(".portal")[2];
  let meshes = [];

  // create a scene:
  const scene = new THREE.Scene();
  let width = portal.clientWidth;
  let height = portal.clientHeight;

  // create a camera
  const camera = new THREE.PerspectiveCamera(45, width/height, 1, 2000);
  camera.position.z = 500;
  scene.add(camera);

  let light = new THREE.DirectionalLight(0xc6dcff);
  light.position.set(300,200,20);
  scene.add(light);

  let amb = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add(amb);

  // create backdrop
  const planeMat = new THREE.MeshLambertMaterial({color:0x000000});
  const planeGeo = new THREE.PlaneGeometry(2000,2000, 20, 20);
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
  const renderer = new THREE.WebGLRenderer({alpha:1, antialias: true});
  renderer.setSize(width, height);

  portal.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  animateThree(renderer, scene, camera, meshes);
}
function animateThree(renderer, scene, camera, meshes) {
  requestAnimationFrame(animateThree.bind(null, renderer, scene, camera, meshes));

  for(let i = 0; i < meshes.length; i++) {
    const mesh = meshes[i];

    if(i % 2 == 0) {
      mesh.rotation.z += .005;
    } else {
      mesh.rotation.z -= .005;
    }
  }

  renderer.render(scene, camera);
}

// after loading ...
function mainThree() {

  initThree();

  return 0;
}

// after loading page all page resources start exectution
window.addEventListener("load", mainThree);
