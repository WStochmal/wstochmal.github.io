export let aimX = 0;
export let aimY = 0;

let tempX = 0;
let tempY = 0;
let staticElementX = 0;
let staticElementY = 0;

const speed = 0.1;
const bcgSpeed = 0.02;

let freezeCursor = false;

const mouseCursor = document.querySelector("#mouseCursor");
const bg = document.querySelector("#section-hero");

export function initMouseCursor() {
  window.addEventListener("mousemove", (e) => {
    aimX = e.pageX;
    aimY = e.pageY;
  });

  renderCursor();
}

function renderCursor() {
  tempX += (aimX - tempX) * speed;
  tempY += (aimY - tempY) * speed;

  const diffX = aimX - tempX;
  const diffY = aimY - tempY;
  const angle = Math.atan2(diffY, diffX);
  let diff = Math.sqrt(diffX * diffX + diffY * diffY) * 0.023;
  if (diff < 1) diff = 1;

  if (bg) {
    bg.style.backgroundPosition =
      -1 * tempX * bcgSpeed + "px " + -1 * tempY * bcgSpeed + "px";
  }

  const rotation = (angle * 180) / Math.PI;

  if (!freezeCursor) {
    mouseCursor.style.top = tempY + "px";
    mouseCursor.style.left = tempX + "px";
    mouseCursor.style.setProperty("--rotation", `${rotation}deg`);
    mouseCursor.style.setProperty("--scaleX", diff);
    mouseCursor.style.transform = `rotate(${rotation}deg) scale(${diff}, 1)`;
  } else {
    mouseCursor.style.top = staticElementY + "px";
    mouseCursor.style.left = staticElementX + "px";
    mouseCursor.style.transform = `rotate(${rotation}deg) scale(1, 1)`;
  }

  requestAnimationFrame(renderCursor);
}

export function freezeAt(x, y) {
  staticElementX = x;
  staticElementY = y;
  freezeCursor = true;
}

export function unfreeze() {
  freezeCursor = false;
}
