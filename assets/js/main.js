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

