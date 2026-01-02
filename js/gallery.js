// js/gallery.js

const initGallery = () => {
  const galleryGrid = document.getElementById("gallery-grid");
  if (galleryGrid) {
    // Images are already rendered by render.js
    const moreBtn = document.getElementById("gallery-more");
    const modal = document.getElementById("image-modal");
    const modalContent = document.getElementById("modal-swiper");
    const closeBtn = document.getElementById("modal-close");
    let swiper;

    const initSwiper = () => {
      if (typeof Swiper !== "undefined" && !swiper) {
        swiper = new Swiper("#modal-swiper", {
          effect: "coverflow",
          coverflowEffect: {
            rotate: 30,
            slideShadows: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          spaceBetween: 20,
        });
      }
    };

    const openModal = (idx, trigger) => {
      if (trigger && modalContent) {
        const rect = trigger.getBoundingClientRect();
        const modalWidth = modalContent.offsetWidth;
        const modalHeight = modalContent.offsetHeight;
        const originX =
          rect.left + rect.width / 2 - (window.innerWidth - modalWidth) / 2;
        const originY =
          rect.top + rect.height / 2 - (window.innerHeight - modalHeight) / 2;
        modalContent.style.setProperty("--origin-x", `${originX}px`);
        modalContent.style.setProperty("--origin-y", `${originY}px`);
      }
      modal.classList.add("open");
      document.body.classList.add("no-scroll");
      initSwiper();
      if (swiper) {
        swiper.update();
        swiper.slideTo(idx, 0);
      }
    };

    const cols = getComputedStyle(galleryGrid)
      .getPropertyValue("grid-template-columns")
      .split(" ").length;
    const visibleMap = { 2: 8, 3: 9, 4: 8 };
    const correctInitialVisible = visibleMap[cols] ?? 8;

    // Re-apply visibility logic to ensure consistency with current screen size
    const galleryImages = galleryGrid.querySelectorAll(".gallery-image");
    galleryImages.forEach((img, idx) => {
        if (idx >= correctInitialVisible) {
            img.classList.add("hidden");
        } else {
            img.classList.remove("hidden");
        }

        img.addEventListener("click", (e) => openModal(idx, e.currentTarget));
        img.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal(idx, img);
            }
        });
    });

    if (galleryImages.length <= correctInitialVisible) {
      if (moreBtn) moreBtn.style.display = "none";
    } else {
      if (moreBtn) moreBtn.style.display = "inline-block";
    }

    const closeGallery = () => {
      modal.classList.remove("open");
      document.body.classList.remove("no-scroll");
    };

    if (moreBtn) {
        moreBtn.addEventListener("click", () => {
        galleryGrid
            .querySelectorAll(".hidden")
            .forEach((el) => el.classList.remove("hidden"));
        moreBtn.style.display = "none";
        });
    }

    closeBtn.addEventListener("click", closeGallery);
    closeBtn.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeGallery();
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeGallery();
    });
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeGallery();
    });
  }
};

window.initGallery = initGallery;
