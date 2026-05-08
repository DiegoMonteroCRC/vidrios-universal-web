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
   NAVBAR DINÁMICA
========================= */

const header = document.querySelector(".header");
const logo = document.getElementById("main-logo");

window.addEventListener("scroll", () => {

  if (window.scrollY > 80) {

    header.classList.add("scrolled");

    logo.src = "assets/img/logos/LOGO SOLO AZUL.PNG";

  } else {

    header.classList.remove("scrolled");

    logo.src = "assets/img/logos/LOGO COMPLETO AZUL.PNG";
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
   MODAL GALERÍA
========================= */

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.querySelector(".modal-close");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const title = item.querySelector(".gallery-caption h3")?.textContent || img.alt;
    const description = item.querySelector(".gallery-caption p")?.textContent || "";

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalCaption.innerHTML = `<strong>${title}</strong><br>${description}`;
    modal.classList.add("show");
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});