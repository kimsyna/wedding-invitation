const themes = ["default", "dark", "pastel-pink", "pastel-blue", "pastel-green"];
let currentTheme = 0;

const removeThemeClasses = () => {
  const themeClasses = Array.from(document.body.classList).filter((cls) =>
    /^theme-/.test(cls),
  );
  if (themeClasses.length) {
    document.body.classList.remove(...themeClasses);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  removeThemeClasses();
  const storedTheme = localStorage.getItem("currentTheme");
  if (storedTheme !== null) {
    const idx = parseInt(storedTheme, 10);
    if (!Number.isNaN(idx)) {
      currentTheme = idx % themes.length;
      const theme = themes[currentTheme];
      if (theme !== "default") {
        document.body.classList.add(`theme-${theme}`);
      }
    }
  }

  const btn = document.getElementById("theme-button");
  if (!btn) return;
  btn.addEventListener("click", () => {
    removeThemeClasses();
    currentTheme = (currentTheme + 1) % themes.length;
    const theme = themes[currentTheme];
    if (theme !== "default") {
      document.body.classList.add(`theme-${theme}`);
    }
    localStorage.setItem("currentTheme", String(currentTheme));
  });
});
