document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  if (!toggleButton) {
    console.error("No se encontró el botón theme-toggle");
    return;
  }

  const savedTheme = localStorage.getItem("theme") || "dark-mode";

  body.classList.remove("dark-mode", "light-mode");
  body.classList.add(savedTheme);

  toggleButton.textContent = savedTheme === "dark-mode" ? "☀️" : "🌙";

  toggleButton.addEventListener("click", () => {
    const isDark = body.classList.contains("dark-mode");

    if (isDark) {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
      toggleButton.textContent = "🌙";
      localStorage.setItem("theme", "light-mode");
    } else {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
      toggleButton.textContent = "☀️";
      localStorage.setItem("theme", "dark-mode");
    }
  });
});

/* =========================
   NAVBAR DINÁMICA CORREGIDA
========================= */

const header = document.querySelector(".header");
const logo = document.getElementById("main-logo");

let navbarCompacta = false;

window.addEventListener("scroll", () => {
  const scrollActual = window.scrollY;

  if (scrollActual > 120 && !navbarCompacta) {
    header.classList.add("scrolled");
    logo.src = "assets/img/logos/LOGO SOLO AZUL.PNG";
    navbarCompacta = true;
  }

  if (scrollActual < 40 && navbarCompacta) {
    header.classList.remove("scrolled");
    logo.src = "assets/img/logos/LOGO COMPLETO AZUL.PNG";
    navbarCompacta = false;
  }
});

/* =========================
   BOTÓN VOLVER ARRIBA
========================= */

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

  if (window.scrollY > 400) {

    scrollTopBtn.classList.add("show");

  } else {

    scrollTopBtn.classList.remove("show");
  }

});

scrollTopBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

/* =========================
   FILTROS GALERÍA
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach((item) => {
      if (filter === "todos" || item.classList.contains(filter)) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

/* =========================
   LIGHTBOX PREMIUM
========================= */

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");

const modalClose = document.querySelector(".modal-close");

const prevButton = document.querySelector(".modal-prev");
const nextButton = document.querySelector(".modal-next");

const galleryImages = document.querySelectorAll(".gallery-item");

let currentIndex = 0;

function openModal(index) {

  currentIndex = index;

  const item = galleryImages[index];

  const img = item.querySelector("img");

  const title =
    item.querySelector(".gallery-caption h3")?.textContent || "";

  const description =
    item.querySelector(".gallery-caption p")?.textContent || "";

  modalImage.src = img.src;

  modalCaption.innerHTML = `
    <strong>${title}</strong><br>
    ${description}
  `;

  modal.classList.add("show");
}

galleryImages.forEach((item, index) => {

  item.addEventListener("click", () => {
    openModal(index);
  });

});

function showNext() {

  currentIndex++;

  if (currentIndex >= galleryImages.length) {
    currentIndex = 0;
  }

  openModal(currentIndex);
}

function showPrev() {

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = galleryImages.length - 1;
  }

  openModal(currentIndex);
}

nextButton.addEventListener("click", showNext);

prevButton.addEventListener("click", showPrev);

modalClose.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {

  if (event.target === modal) {
    modal.classList.remove("show");
  }

});

/* Teclado */

document.addEventListener("keydown", (event) => {

  if (!modal.classList.contains("show")) return;

  if (event.key === "Escape") {
    modal.classList.remove("show");
  }

  if (event.key === "ArrowRight") {
    showNext();
  }

  if (event.key === "ArrowLeft") {
    showPrev();
  }

});

/* =========================
   ANIMACIONES AL HACER SCROLL
========================= */

const revealElements = document.querySelectorAll(
  ".section, .card, .service-card, .gallery-item, .video-social-box"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =========================
   LOADER INICIAL
========================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 700);
});

/* =========================
   MENÚ MÓVIL
========================= */

const menuToggle = document.getElementById("menu-toggle");
const navLinksMenu = document.getElementById("nav-links");

if (menuToggle && navLinksMenu) {
  menuToggle.addEventListener("click", () => {
    navLinksMenu.classList.toggle("show");

    menuToggle.textContent = navLinksMenu.classList.contains("show") ? "×" : "☰";
  });

  navLinksMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinksMenu.classList.remove("show");
      menuToggle.textContent = "☰";
    });
  });
}