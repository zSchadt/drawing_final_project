// Final Project Prototype
let camera, scene, renderer, controls;

const fileNames = ["bluebump.jpg", "jupiter.jpg","neptune.jpg","ice.jpg","asteroid.jpg"];

let meshes = [];

// return random in range
function randomInInterval(min, max, asInteger=false) {
  if(!asInteger) {
      return Math.random() * (max - min) + min;
  }else { // whole number
      return Math.floor(Math.random() * (max - min) + min);
  }
}

function init() {
  // only rendering within the div
  const box = document.getElementById("box");

  // create a scene:
  scene = new THREE.Scene();
  let width = box.clientWidth;
  let height = box.clientHeight;

  // create a camera
  camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
  camera.position.z = 500;
  scene.add(camera);

  let light = new THREE.DirectionalLight(0xc6dcff);
  light.position.set(20,20,20);
  scene.add(light);

  // create backdrop
  const planeMat = new THREE.MeshLambertMaterial({color:0x000000});
  const planeGeo = new THREE.PlaneGeometry(900, 900, 20, 20);
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.position.set(0,0,-500);
  scene.add(plane);

  // create portal shapes
  for(let i = 0; i < 12; i++) {
    const planetTexture = fileNames[randomInInterval(0, fileNames.length, true)];
    const path = "media/"+planetTexture;

    var loader = new THREE.TextureLoader();
    loader.load(path, (texture) => {
      const material = new THREE.MeshLambertMaterial({map:texture});
      const geo = new THREE.SphereGeometry(25, 20, 20);
      const mesh = new THREE.Mesh(geo, material);
      // ranomly place in our scene
      const posx = randomInInterval( -350 , 350 );
      const posy = randomInInterval( -(height/2) , (height/2) );
      const posz = randomInInterval(-501, 200);
      mesh.position.set(posx,posy,posz);

      const speed = randomInInterval(.1,.6);
      const rotation = randomInInterval(.005,.01);

      let direction = Math.random() > .5 ? 1 : -1;

      meshes.push( {mesh: mesh, speed:speed, direction:direction, rotation:rotation} );
      scene.add(mesh);
    });
  }

  // create a renderer and add it to the dom
  renderer = new THREE.WebGLRenderer({alpha:1, antialias: true});
  renderer.setSize(width, height);

  box.appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

// animate the toruses, rotate them each a different way (alternating)
function animate() {
  requestAnimationFrame(animate);

  for(let i = 0; i < meshes.length; i++) {
    const mesh = meshes[i].mesh;

    mesh.position.x += ( meshes[i].speed * meshes[i].direction );

    if(mesh.position.x > 600 || mesh.position.x < -600) {
      meshes[i].direction = Math.random() > .5 ? 1 : -1;
      mesh.position.x = meshes[i].direction==1 ? -350 : 350;
      mesh.position.z += 1;
    }

  }

  renderer.render(scene, camera);
}

function changeColor(box) {
  const curr = box.style.borderColor;
  if(curr == "rgb(137, 182, 255)") {
    box.style.borderColor = "rgb(255, 255, 255)"
  } else {
    box.style.borderColor = "rgb(137, 182, 255)"
  }
}

function main() {
  init();
  animate();

  const box = document.getElementById("box");
  setInterval(changeColor.bind(null,box),2000);
}

// wait for page load
window.addEventListener("load", main);
