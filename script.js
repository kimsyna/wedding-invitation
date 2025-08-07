// 추가 기능: 달력, 남은 시간, 공유 버튼
document.addEventListener("DOMContentLoaded", () => {
  const eventDate = new Date(2026, 4, 17, 10, 30);

  const calendarEl = document.getElementById("calendar");
  if (calendarEl) {
    const year = eventDate.getFullYear();
    const month = eventDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    let html = `<div class="calendar-header">${year}. ${String(month + 1).padStart(2, "0")}</div>`;
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

    const updateCountdown = () => {
      const now = new Date();
      let diff = eventDate - now;
      if (diff < 0) diff = 0;
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
    setInterval(updateCountdown, 1000);
  }

  const copyUrlBtn = document.getElementById("copy-url");
  const copyToast = document.getElementById("copy-toast");
  if (copyUrlBtn && copyToast) {
    copyUrlBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(window.location.href);
      copyToast.textContent = "URL이 복사되었습니다";
      copyToast.classList.add("show");
      setTimeout(() => copyToast.classList.remove("show"), 2000);
    });
  }

  const shareUrlBtn = document.getElementById("share-url");
  if (shareUrlBtn) {
    shareUrlBtn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "이성우 ♥ 임상영 청첩장",
            text: "2026년 5월 17일 메리빌리아더프레스티지\n가든홀",
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
      Kakao.init("ad9882a7a0abfaffbde309e333d2e43e");
      shareKakaoBtn.addEventListener("click", () => {
        Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: "이성우 ♥ 임상영 청첩장",
            description:
              "2026년 5월 17일 일요일 오전 10시 30분 메리빌리아더프레스티지\n가든홀",
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
    const images = Array.from(
      { length: 15 },
      (_, i) => `https://picsum.photos/seed/wed${i}/600/400`,
    );
    const moreBtn = document.getElementById("gallery-more");
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const prevBtn = document.getElementById("modal-prev");
    const nextBtn = document.getElementById("modal-next");
    const closeBtn = document.getElementById("modal-close");
    let currentIndex = 0;

    const openModal = (idx) => {
      currentIndex = idx;
      modalImg.src = images[idx];
      modal.classList.add("open");
    };

    const showPrev = () => {
      currentIndex = (currentIndex + images.length - 1) % images.length;
      modalImg.src = images[currentIndex];
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % images.length;
      modalImg.src = images[currentIndex];
    };

    images.forEach((src, idx) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "gallery-image";
      if (idx >= 9) img.classList.add("hidden");
      img.addEventListener("click", () => openModal(idx));
      galleryGrid.appendChild(img);
    });

    moreBtn.addEventListener("click", () => {
      galleryGrid
        .querySelectorAll(".hidden")
        .forEach((el) => el.classList.remove("hidden"));
      moreBtn.style.display = "none";
    });

    prevBtn.addEventListener("click", showPrev);
    nextBtn.addEventListener("click", showNext);
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }

  const shareSection = document.querySelector(".share-section");
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (shareSection && !isMobile) {
    shareSection.style.display = "none";
  }

  const fadeSections = document.querySelectorAll(".fade-section");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  fadeSections.forEach((sec) => observer.observe(sec));
});
