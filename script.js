const {
  GROOM_NAME, BRIDE_NAME,
  EVENT_DATE_TEXT, EVENT_TIME_TEXT,
  VENUE_LOCATION, VENUE_HALL, VENUE_LAT, VENUE_LNG,
  WALK_INFO, TRANSIT_INFO, PARKING_INFO,
} = window.DATA;

const NAVER_MAP_API_KEY =
  (typeof process !== "undefined" && process.env.NAVER_MAP_API_KEY) ||
  (window.env && window.env.NAVER_MAP_API_KEY);
const KAKAO_API_KEY =
  (typeof process !== "undefined" && process.env.KAKAO_API_KEY) ||
  (window.env && window.env.KAKAO_API_KEY);

const loadExternalScript = (src) =>
  new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

const applySequentialAnimation = (containerSelector) => {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const items = container.querySelectorAll(".sequential-item");
  items.forEach((el, index) => {
    el.style.setProperty("--delay", `${index * 0.2}s`);
  });
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    container.classList.add("loaded");
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  observer.observe(container);
};

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

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  applySequentialAnimation(".family-contact-section");
  const eventDate = new Date(2026, 4, 17, 10, 30);

  const setDirectionInfo = (cls, info) => {
    const item = document.querySelector(`.map-section .${cls}`);
    if (!item) return;
    const detailEl = item.querySelector(".detail");
    if (info) {
      detailEl.textContent = info;
    } else {
      item.style.display = "none";
    }
  };
  setDirectionInfo("walk", WALK_INFO);
  setDirectionInfo("transit", TRANSIT_INFO);
  setDirectionInfo("parking", PARKING_INFO);
  const directionsContainer = document.querySelector(".map-section .directions");
  if (directionsContainer) {
    const hasInfo = [...directionsContainer.querySelectorAll(".direction-item")].some(
      (el) => el.style.display !== "none",
    );
    if (!hasInfo) directionsContainer.style.display = "none";
  }

  const mapEl = document.getElementById("map");
  if (mapEl) {
    // Only attempt to load if key is present
    if (NAVER_MAP_API_KEY) {
      loadExternalScript(
        `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_API_KEY}`,
      )
        .then(() => {
          if (typeof naver === "undefined" || !naver.maps) {
            throw new Error("Naver Maps API not loaded");
          }
          const position = new naver.maps.LatLng(VENUE_LAT, VENUE_LNG);
          const map = new naver.maps.Map("map", {
            center: new naver.maps.LatLng(VENUE_LAT + 0.0025, VENUE_LNG + 0.003),
            zoom: 16,
            minZoom: 16,
            maxZoom: 16,
            zoomControl: false,
            scrollWheel: false,
            draggable: false,
            disableDoubleTapZoom: true,
            disableDoubleClickZoom: true,
            disableTwoFingerTapZoom: true,
            pinchZoom: false,
            keyboardShortcuts: false,
          });
          const marker = new naver.maps.Marker({ position, map });
          const infoWindow = new naver.maps.InfoWindow({
            content: `<div style="padding:5px 10px; min-width:120px; white-space:nowrap; font-size:12px;"><div>${VENUE_LOCATION}</div><div>${VENUE_HALL}</div></div>`,
          });
          infoWindow.open(map, marker);
        })
        .catch((e) => {
          console.warn("Map loading failed:", e);
          mapEl.style.display = "none"; // Hide map container if loading fails
          const mapBtn = document.querySelector('.map-btn[aria-label="네이버"]');
          if (mapBtn) mapBtn.style.display = "flex"; // Ensure button is still visible
        });
    } else {
       console.warn("No Naver Map API Key provided");
       mapEl.style.display = "none";
    }
  }

  const calendarEl = document.getElementById("calendar");
  if (calendarEl) {
    const year = eventDate.getFullYear();
    const month = eventDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    let html = `<div class="calendar-header">${year} / ${String(month + 1).padStart(2, "0")} / ${String(eventDate.getDate()).padStart(2, "0")}</div>`;
    html += "<table><thead><tr>";
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    html += days.map((d) => `<th>${d}</th>`).join("");
    html += "</tr></thead><tbody><tr>";
    for (let i = 0; i < firstDay; i++) html += "<td></td>";
    for (let d = 1; d <= lastDate; d++) {
      const isEvent = d === eventDate.getDate();
      html += `<td>${isEvent ? '<span class="event-day">' + d + '</span>' : d}</td>`;
      if ((firstDay + d) % 7 === 0 && d !== lastDate) html += "</tr><tr>";
    }
    html += "</tr></tbody></table>";
    calendarEl.innerHTML = html;
    const eventDayEl = calendarEl.querySelector(".event-day");
    if (eventDayEl) {
      const activate = () => eventDayEl.classList.add("heart-active");
      const deactivate = () => eventDayEl.classList.remove("heart-active");
      calendarEl.addEventListener("mousedown", activate);
      calendarEl.addEventListener("touchstart", (e) => {
        // e.preventDefault(); // allow scrolling
        activate();
      });
      calendarEl.addEventListener("mouseup", deactivate);
      calendarEl.addEventListener("mouseleave", deactivate);
      calendarEl.addEventListener("touchend", deactivate);
      calendarEl.addEventListener("touchcancel", deactivate);
    }
  }

  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    countdownEl.innerHTML = `
      <div class="countdown-item"><span class="countdown-num" id="cd-days">00</span><span class="countdown-label">DAYS</span></div>
      <div class="countdown-item"><span class="countdown-num" id="cd-hours">00</span><span class="countdown-label">HRS</span></div>
      <div class="countdown-item"><span class="countdown-num" id="cd-minutes">00</span><span class="countdown-label">MIN</span></div>
      <div class="countdown-item"><span class="countdown-num" id="cd-seconds">00</span><span class="countdown-label">SEC</span></div>
    `;
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");
    const introEl = document.querySelector(".countdown-intro");
    const titleEl = countdownEl.previousElementSibling;
    const completeBtn = document.getElementById("countdown-complete-btn");
    if (completeBtn) completeBtn.style.display = "none";

    const showThanks = () => {
      if (introEl) {
        introEl.innerHTML =
          `${GROOM_NAME} & ${BRIDE_NAME}<span class="count-thin">의</span><br />결혼식<span class="count-thin">에</span> <span class="count-thin">참석해주셔서</span><br /><span class="count-thin">진심으로 감사드립니다.</span>`;
      }
      if (titleEl) titleEl.style.display = "none";
      countdownEl.style.display = "none";
      const btn = document.getElementById("countdown-complete-btn");
      if (btn) btn.style.display = "none";
    };

    let countdownTimer;
    const updateCountdown = () => {
      const now = new Date();
      let diff = eventDate - now;
      if (diff <= 0) {
        diff = 0;
        clearInterval(countdownTimer);
        if (completeBtn) completeBtn.style.display = "inline-block";
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");
    };
    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);
    if (completeBtn) {
      completeBtn.addEventListener("click", () => {
        clearInterval(countdownTimer);
        showThanks();
      });
    }
  }

  const copyUrlBtn = document.getElementById("copy-url");
  const copyToast = document.getElementById("copy-toast");
  const contactToast = document.getElementById("contact-toast");
  const showToast = (btn, toast, message, container) => {
    const rect = btn.getBoundingClientRect();
    const containerRect = container
      ? container.getBoundingClientRect()
      : null;
    let left = rect.left + rect.width / 2;
    let top = rect.top - 8;
    if (containerRect) {
      left -= containerRect.left;
      top -= containerRect.top;
    }
    toast.textContent = message;
    const toastWidth = toast.offsetWidth;
    const maxWidth = containerRect
      ? containerRect.width
      : window.innerWidth;
    const margin = 10;
    const maxLeft = maxWidth - toastWidth / 2 - margin;
    const minLeft = toastWidth / 2 + margin;
    left = Math.min(Math.max(left, minLeft), maxLeft);
    toast.style.left = `${left}px`;
    toast.style.top = `${top}px`;
    toast.style.bottom = "auto";
    toast.style.transform = "translate(-50%, -100%)";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  };
  if (copyUrlBtn && copyToast) {
    copyUrlBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast(copyUrlBtn, copyToast, "URL이 복사되었습니다");
      } catch (e) {
        alert("URL 복사에 실패했습니다. 다시 시도해주세요.");
      }
    });
  }

  const shareUrlBtn = document.getElementById("share-url");
  if (shareUrlBtn) {
    shareUrlBtn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${GROOM_NAME}♥${BRIDE_NAME} 청첩장`,
            text: `${EVENT_DATE_TEXT} ${EVENT_TIME_TEXT} ${VENUE_LOCATION} ${VENUE_HALL}`,
            url: window.location.href,
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("공유를 지원하지 않는 브라우저입니다");
      }
    });
  }

  const shareKakaoBtn = document.getElementById("share-kakao");
  if (shareKakaoBtn && window.Kakao) {
    try {
      Kakao.init(KAKAO_API_KEY);
      shareKakaoBtn.addEventListener("click", () => {
        Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: `${GROOM_NAME}♥${BRIDE_NAME} 청첩장`,
            description: `${EVENT_DATE_TEXT} ${EVENT_TIME_TEXT} ${VENUE_LOCATION} ${VENUE_HALL}`,
            imageUrl: "https://www.iwedding.co.kr/center/iweddingb/product/800_17588_1730685980_90793400_3232256098.jpg",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  // 갤러리
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

  const contactBtn = document.getElementById("contact-btn");
  const contactModal = document.getElementById("contact-modal");
  const contactClose = document.getElementById("contact-close");
  const contactContent = document.querySelector(".contact-content");
  if (contactBtn && contactModal && contactClose && contactContent) {
    const openContact = () => {
      const rect = contactBtn.getBoundingClientRect();
      const modalWidth = contactContent.offsetWidth;
      const modalHeight = contactContent.offsetHeight;
      const originX =
        rect.left + rect.width / 2 - (window.innerWidth - modalWidth) / 2;
      const originY =
        rect.top + rect.height / 2 - (window.innerHeight - modalHeight) / 2;
      contactContent.style.setProperty("--origin-x", `${originX}px`);
      contactContent.style.setProperty("--origin-y", `${originY}px`);
      contactModal.classList.add("open");
      document.body.classList.add("no-scroll");
    };
    const closeContact = () => {
      contactModal.classList.remove("open");
      document.body.classList.remove("no-scroll");
    };
    contactBtn.addEventListener("click", openContact);
    contactClose.addEventListener("click", closeContact);
    contactModal.addEventListener("click", (e) => {
      if (e.target === contactModal) closeContact();
    });
  }

  const accountCopyBtns = document.querySelectorAll(".copy-account");
  accountCopyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const account = btn.dataset.account;
      let success = false;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(account);
          success = true;
        } catch (e) {
          // will attempt fallback below
        }
      }
      if (!success) {
        const textarea = document.createElement("textarea");
        textarea.value = account;
        textarea.style.position = "fixed";
        textarea.style.top = "-1000px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          success = document.execCommand("copy");
        } catch (e) {
          success = false;
        }
        document.body.removeChild(textarea);
      }
      if (contactToast && contactContent) {
        showToast(
          btn,
          contactToast,
          success
            ? "복사되었습니다"
            : "복사에 실패했습니다. 직접 복사해주세요.",
          contactContent,
        );
      } else if (!success) {
        alert("복사에 실패했습니다. 직접 복사해주세요.");
      }
    });
  });

  const shareSection = document.querySelector(".share-section");
  const tmapBtn = document.querySelector('.map-btn[aria-label="티맵"]');
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (shareSection && !isMobile) {
    shareSection.style.display = "none";
  }
  if (tmapBtn && !isMobile) {
    tmapBtn.style.display = "none";
  }

  const fadeSections = document.querySelectorAll(".fade-section");
  if (prefersReducedMotion) {
    fadeSections.forEach((sec) => sec.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );
    fadeSections.forEach((sec) => observer.observe(sec));
  }

  const invitationSection = document.querySelector(".invitation-section");
  const triggerOffset =
    invitationSection
      ? invitationSection.offsetTop - window.innerHeight + 80
      : 80;
  const updateHeroScroll = () => {
    if (window.scrollY > triggerOffset) {
      document.body.classList.add("scrolled");
    } else {
      document.body.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", updateHeroScroll);
  updateHeroScroll();
};

const finishLoading = () => {
  document.body.classList.add("loaded");
  document.body.classList.remove("loading");
  // Removed scrollTo(0, 90) and interaction blocking
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
