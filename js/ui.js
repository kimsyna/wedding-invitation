// js/ui.js

const initUI = () => {
  const {
    GROOM_NAME, BRIDE_NAME,
    EVENT_DATE_TEXT, EVENT_TIME_TEXT,
    VENUE_LOCATION, VENUE_HALL,
  } = window.DATA;

  const KAKAO_API_KEY =
    (typeof process !== "undefined" && process.env.KAKAO_API_KEY) ||
    (window.env && window.env.KAKAO_API_KEY);

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

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  applySequentialAnimation(".family-contact-section");

  // Contact Modal
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

  // Toasts
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
          // fallback
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

  // Sharing
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
      if (!Kakao.isInitialized()) {
        Kakao.init(KAKAO_API_KEY);
      }
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

  // Hide Tmap on desktop
  const shareSection = document.querySelector(".share-section");
  const tmapBtn = document.querySelector('.map-btn[aria-label="티맵"]');
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (shareSection && !isMobile) {
    shareSection.style.display = "none";
  }
  if (tmapBtn && !isMobile) {
    tmapBtn.style.display = "none";
  }

  // Fade Sections
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

  // Scroll effect
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
  window.addEventListener("scroll", updateHeroScroll, { passive: true });
  updateHeroScroll();
};

window.initUI = initUI;
