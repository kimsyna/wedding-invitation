const init = async () => {
  const app = document.getElementById("app");
  if (app && window.renderApp) {
    app.innerHTML = window.renderApp();
  }

  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.loading = "lazy";
      img.decoding = "async";
    }
  });

  // Initialize modules
  if (window.initUI) window.initUI();
  if (window.initMap) window.initMap();
  if (window.initCalendar) window.initCalendar();
  if (window.initGallery) window.initGallery();
};

const finishLoading = () => {
  document.body.classList.add("loaded");
  document.body.classList.remove("loading");
};

const onDomContentLoaded = async () => {
  await init();
  finishLoading();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onDomContentLoaded);
} else {
  onDomContentLoaded();
}
