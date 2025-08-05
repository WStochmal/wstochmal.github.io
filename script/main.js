import { initLoader } from "./loader.js";
import { initMouseCursor } from "./mouseCursor.js";
import { initSmoothScroll } from "./smoothScroll.js";
import { initTranslations } from "./translation.js";
import { initHeroCanvas } from "./canvas.js";
document.addEventListener("DOMContentLoaded", function () {
  //   TRANSLATION
  initTranslations();
  //    LOADER
  initLoader();
  //   MOUSE CURSOR
  initMouseCursor();
  //   SMOOTH SCROLL
  initSmoothScroll();
  //   HERO CANVAS
  initHeroCanvas();

  document.querySelectorAll(".tech").forEach((card) => {
    const inner = card.querySelector(".tech-inner");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // tekst przeciwnie i słabiej – efekt głębi
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
      inner.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });
});
