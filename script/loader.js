export function initLoader() {
  const name = document.querySelector(".name");
  const loader = document.querySelector(".loader");

  const mainContent = document.querySelector("#main-content");
  const sectionAbout = document.querySelector("#section-about");

  setTimeout(() => {
    const reveals = document.querySelectorAll(".name-block-reveal");

    name.style.opacity = "1";
    name.style.top = "0";

    // Reveal name
    setTimeout(() => {
      reveals.forEach((reveal, index) => {
        setTimeout(() => {
          reveal.classList.add("show");
        }, index * 250);
      });
    }, 500);
    // Hide loader
    setTimeout(() => {
      name.style.opacity = "0";
      name.style.top = "-2.5rem";
      loader.style.transform = "translateY(-100%)";
      mainContent.style.transform = "translateY(0)";
      nameWaveAnimation();

      setTimeout(() => {
        sectionAbout.style.transform = "translateY(0)";
      }, 400);
    }, 2000);
  }, 1000);
}

function nameWaveAnimation() {
  const waveText = document.getElementById("wave-text");
  const originalText = waveText.textContent;

  function animateWave() {
    waveText.textContent = "";
    originalText.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.animationDelay = `${i * 0.05}s`;
      waveText.appendChild(span);
    });
  }

  animateWave(); // initial

  // re-trigger every 5 seconds
  setInterval(() => {
    animateWave();
  }, 5000);
}
