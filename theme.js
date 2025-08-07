const themes = ["default", "dark", "pastel-pink", "pastel-blue", "pastel-green"];
let currentTheme = 0;

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("theme-button");
  if (!btn) return;
  btn.addEventListener("click", () => {
    document.body.classList.remove(
      "theme-dark",
      "theme-pastel-pink",
      "theme-pastel-blue",
      "theme-pastel-green",
    );
    currentTheme = (currentTheme + 1) % themes.length;
    const theme = themes[currentTheme];
    if (theme !== "default") {
      document.body.classList.add(`theme-${theme}`);
    }
  });
});
