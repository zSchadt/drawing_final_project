/* Zachary Schadt (zts214)
Assignment 7: WebGL */

function randomInInterval(min, max, asInteger=false) {
  if(!asInteger) {
      return Math.random() * (max - min) + min;
  }else { // whole number
      return Math.floor(Math.random() * (max - min) + min);
  }
}

function initTwo() {
  const box = document.querySelectorAll(".portal")[1];

  const meshes = [];

  // create a scene:
  const scene = new THREE.Scene();
  let width = box.clientWidth;
  let height = box.clientHeight;

  // create a camera
  const camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
  camera.position.z = 500;
  scene.add(camera);

  let light = new THREE.DirectionalLight(0xffffff);
  light.position.set(20,20,20);
  scene.add(light);

  // create backdrop
  const planeMat = new THREE.MeshLambertMaterial({color:0x000000});
  const planeGeo = new THREE.PlaneGeometry(1000,1000, 20, 20);
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
  const renderer = new THREE.WebGLRenderer({alpha:1, antialias: true});
  renderer.setSize(width, height);

  box.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  animateTwo(renderer, scene, camera, meshes)
}

multiplier = false;
// animate the spheres
function animateTwo(renderer, scene, camera, meshes) {
  requestAnimationFrame(animateTwo.bind(null, renderer, scene, camera, meshes));

  for(let i = 0; i < meshes.length; i++) {
    const mesh = meshes[i].mesh;
      //mesh.rotation.x += 0.01;
    if(!multiplier) {
      mesh.position.z += meshes[i].speed;
    } else {
      mesh.position.z += ( meshes[i].speed * 5 );
    }

    if(mesh.position.z > 500) {
      mesh.position.z = -501;
    }
  }

  renderer.render(scene, camera);
}

// after loading ...
function mainTwo() {

  initTwo();


  return 0;
}

// after loading page all page resources start exectution
window.addEventListener("load", mainTwo);
