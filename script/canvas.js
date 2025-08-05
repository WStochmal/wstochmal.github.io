import { aimX, aimY } from "./mouseCursor.js";

// Pobieramy canvas, jego kontekst i kontener
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const container = document.querySelector("#section-hero .container");

let width, height;
const rows = 10,
  cols = 10;
const pieces = [];

const img = new Image();
img.src = "assets/hero.jpg"; // Ścieżka do obrazu

// Pozycja kursora z mouseCursor.js (płynna)
let tempX = 0;
let tempY = 0;
const speed = 0.1;

function resizeCanvas() {
  const bounds = container.getBoundingClientRect();

  width = canvas.width = bounds.width;
  height = canvas.height = bounds.height;

  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = bounds.width + "px";
  canvas.style.height = bounds.height + "px";

  // Resetuj kawałki
  pieces.length = 0;

  const pieceWidth = img.width / cols;
  const pieceHeight = img.height / rows;

  // Oblicz offset: obraz maksymalnie do prawej strony (X), wyśrodkowany w Y
  const offsetX = width - img.width; // Obraz przy prawej krawędzi
  const offsetY = (height - img.height) / 2; // Wyśrodkowanie w Y

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      pieces.push({
        x: offsetX + x * pieceWidth,
        y: offsetY + y * pieceHeight,
        ox: offsetX + x * pieceWidth,
        oy: offsetY + y * pieceHeight,
        w: pieceWidth,
        h: pieceHeight + 1,
        vx: 0,
        vy: 0,
      });
    }
  }
}

function updateCanvas() {
  // Pobierz pozycję canvasu względem okna przeglądarki
  const canvasBounds = canvas.getBoundingClientRect();
  const canvasOffsetX = canvasBounds.left; // Przesunięcie canvasu w osi X
  const canvasOffsetY = canvasBounds.top; // Przesunięcie canvasu w osi Y (dla pewności)

  // Oblicz offset obrazu: obraz maksymalnie do prawej strony (X), wyśrodkowany w Y
  const offsetX = width - img.width;
  const offsetY = (height - img.height) / 2;

  // Płynne śledzenie kursora z korektą przesunięcia canvasu
  tempX += (aimX - canvasOffsetX - offsetX - tempX) * speed;
  tempY += (aimY - canvasOffsetY - offsetY - tempY) * speed;

  ctx.clearRect(0, 0, width, height);

  for (let p of pieces) {
    const dx = tempX - (p.x - offsetX + p.w / 2); // Korekta dx względem offsetX
    const dy = tempY - (p.y - offsetY + p.h / 2); // Korekta dy względem offsetY
    const dist = Math.sqrt(dx * dx + dy * dy);
    const force = Math.min(100, 10000 / (dist * dist));
    const angle = Math.atan2(dy, dx);

    if (dist < 150) {
      p.vx -= Math.cos(angle) * force;
      p.vy -= Math.sin(angle) * force;
    }

    p.vx += (p.ox - p.x) * 0.05;
    p.vy += (p.oy - p.y) * 0.05;
    p.vx *= 0.7;
    p.vy *= 0.7;

    p.x += p.vx;
    p.y += p.vy;

    ctx.drawImage(
      img,
      p.ox - offsetX,
      p.oy - offsetY,
      p.w,
      p.h,
      p.x,
      p.y,
      p.w,
      p.h
    );
  }

  requestAnimationFrame(updateCanvas);
}

export function initHeroCanvas() {
  if (!img.complete) {
    img.onload = () => {
      resizeCanvas();
      updateCanvas();
    };
  } else {
    resizeCanvas();
    updateCanvas();
  }

  window.addEventListener("resize", resizeCanvas);
}
