
// moving the background with mouse pointer

let bGround, bWidth, bHeight;


// move the background with the mouse
function moveBackground(e) {
  const posx = e.clientX / bWidth;
  const posy = e.clientY/ bHeight;

  const tran = "translate(" + (-posx) + "%, " + (-posy) + "%)"
  bGround.style.transform = tran;

}

function main() {
  bGround = document.getElementById("background");

  bWidth = window.innerWidth / 3;
  bHeight = window.innerHeight / 3;

  window.addEventListener("mousemove",moveBackground);
}


window.addEventListener("load", main);
