export function initSmoothScroll() {
  const container = document.querySelector("main");

  const parallaxLayer = document.querySelector("#parallax-layer");
  const footer = document.querySelector("footer");

  document.body.style.height = container.clientHeight + "px";

  //   name.style.fontSize = window.innerWidth / 120 + "rem";

  let sx = 0,
    sy = 0,
    dx = 0,
    dy = 0;
  const power = 0.05;
  const li = (a, b, n) => (1 - n) * a + n * b;

  function renderScroll() {
    dx = li(dx, sx, power);
    dy = li(dy, sy, power);
    dx = Math.floor(dx * 100) / 100;
    dy = Math.floor(dy * 100) / 100;

    container.style.transform = `translate3d(-${dx}px, -${dy}px, 0px)`;

    if (parallaxLayer) {
      parallaxLayer.style.transform = `translate3d(0%, -${dy / 1.6}px, 0px)`;
      document.body.style.height = container.clientHeight - dy / 1.6 + "px";
    }
    if (footer && !isMobile()) {
      footer.style.transform = `translate3d(0, -${dy / 3}px, 0)`;
    } else if (footer && isMobile()) {
      footer.style.bottom = `${dy / 1.6}px`;
    }

    requestAnimationFrame(renderScroll);
  }

  function easeScroll() {
    sx = window.pageXOffset;
    sy = window.pageYOffset;
  }

  window.addEventListener("scroll", easeScroll);
  window.addEventListener("wheel", easeScroll);

  requestAnimationFrame(renderScroll);
}

function isMobile() {
  return window.innerWidth <= 768;
}
