// assets/js/hero-background.js

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const category = hero.getAttribute("data-category");

  const heroImages = {
    hardware: "assets/img/hero-hardware.webp",
    software: "assets/img/hero-software.webp",
    redes: "assets/img/hero-redes.webp",
    blog: "assets/img/hero-blog-default.webp"
  };

  if (heroImages[category]) {
    const img = new Image();
    img.src = heroImages[category];

    img.onload = () => {
      hero.style.backgroundImage = `url('${heroImages[category]}')`;
      hero.style.backgroundColor = "transparent";
    };

    img.onerror = () => {
      hero.style.backgroundImage = "none";
      hero.style.backgroundColor = "var(--color-primary)";
    };
  } else {
    hero.style.backgroundImage = "none";
    hero.style.backgroundColor = "var(--color-primary)";
  }
});