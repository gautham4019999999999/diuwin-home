// Main JavaScript functionality

document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations for buttons
  initButtonAnimations();

  // Initialize glow effects
  initGlowEffects();

  // Set current year in footer
  setCurrentYear();
});

function getDailyGiftCode() {
  const today = new Date().toISOString().slice(0, 10); // e.g., '2025-05-23'
  const seed = [...today].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return generateCode(seed, 32);
}

function generateCode(seed, length) {
  let code = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let random = seed;

  for (let i = 0; i < length; i++) {
    // Simple seed-based pseudo-random number generator
    random = (random * 9301 + 49297) % 233280;
    const index = Math.floor((random / 233280) * chars.length);
    code += chars[index];
  }

  return code;
}
const giftCode = getDailyGiftCode();
document.querySelector(`#gift-code`).textContent = giftCode;

function initButtonAnimations() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.3s ease";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transition = "all 0.3s ease";
    });
  });
}

function initGlowEffects() {
  const heroLogo = document.querySelector(".hero-logo img");

  if (heroLogo) {
    // Random glow effect for the logo
    setInterval(() => {
      const intensity = 0.2 + Math.random() * 0.2; // 0.2-0.4
      heroLogo.style.boxShadow = `0 0 20px rgba(95, 236, 208, ${intensity})`;

      setTimeout(() => {
        heroLogo.style.boxShadow = `0 0 20px rgba(95, 236, 208, 0.3)`;
      }, 1000);
    }, 5000);
  }

  // Stars twinkling effect
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, index) => {
    setInterval(() => {
      // Stagger the twinkling for a more natural effect
      setTimeout(() => {
        star.style.opacity = "0.7";
        setTimeout(() => {
          star.style.opacity = "1";
        }, 300);
      }, index * 200);
    }, 5000);
  });
}

function setCurrentYear() {
  const yearElement = document.querySelector(".copyright");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = `© ${currentYear} DiuWin`;
  }
}

document.addEventListener("click", function (e) {
  const anchor = e.target.closest("a");
  if (anchor && anchor.classList.contains("demo-link")) {
    e.preventDefault();
  }
});

// Create a custom cursor effect for buttons
document.addEventListener("mousemove", function (e) {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      button.style.background =
        button.classList.contains("btn-register") ||
        button.classList.contains("btn-register-large")
          ? `linear-gradient(45deg, var(--button-color), var(--button-hover))`
          : button.style.background;
    } else {
      if (
        button.classList.contains("btn-register") ||
        button.classList.contains("btn-register-large")
      ) {
        button.style.background = "var(--button-color)";
      }
    }
  });
});
