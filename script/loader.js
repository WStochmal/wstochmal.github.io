export function initLoader() {
  const name = document.querySelector(".name");
  const loader = document.querySelector(".loader");
  const main = document.querySelector("main");

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

      setTimeout(() => {
        main.style.top = 0;
      }, 200);
    }, 2000);
  }, 1000);
}
