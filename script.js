// 추가 기능: 달력, 남은 시간, 공유 버튼
const GROOM_NAME = "이성우";
const BRIDE_NAME = "임상영";
const EVENT_DATE_TEXT = "2026년 5월 17일 (일)";
const EVENT_TIME_TEXT = "오전 10시 30분";
const EVENT_DATETIME_TEXT = `${EVENT_DATE_TEXT} ${EVENT_TIME_TEXT}`;
const VENUE_LOCATION = "메리빌리아더프레스티지";
const VENUE_HALL = "2F 가든홀";
const VENUE_LAT = 37.2627302;
const VENUE_LNG = 126.9966484;
const WALK_INFO = "수원역 9번 출구에서 도보 10분";
const TRANSIT_INFO = "";
const PARKING_INFO = "예식장 내 주차장 이용 가능 (2시간 무료)";
const NAVER_MAP_API_KEY =
  (typeof process !== "undefined" && process.env.NAVER_MAP_API_KEY) ||
  (window.env && window.env.NAVER_MAP_API_KEY);
const KAKAO_API_KEY =
  (typeof process !== "undefined" && process.env.KAKAO_API_KEY) ||
  (window.env && window.env.KAKAO_API_KEY);

const getTemplate = () => `
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-names">
        <p class="groom">${GROOM_NAME}</p>
        <p class="bride">${BRIDE_NAME}</p>
      </div>
      <p class="hero-datetime">${EVENT_DATETIME_TEXT}</p>
      <p class="location">${VENUE_LOCATION}</p>
      <p class="hall">${VENUE_HALL}</p>
    </div>
  </section>

  <section class="invitation-section fade-section">
    <h2>초대의 글</h2>
    <p>
      긴 시간 서로의 마음을 나누어 온 저희 두 사람이
      <strong>${EVENT_DATE_TEXT}</strong> 새로운 시작을 약속합니다.
    </p>
    <p>
      <span class="highlight">귀한 걸음</span>으로 자리해 주셔서
      저희의 기쁨을 함께 나눠 주시면 감사하겠습니다.
    </p>
  </section>

  <section class="info-section fade-section">
    <h3>예식 안내</h3>
    <div class="info-names">
      <p class="groom">${GROOM_NAME}</p>
      <p class="bride">${BRIDE_NAME}</p>
    </div>
    <p class="datetime">${EVENT_DATETIME_TEXT}</p>
    <p class="location">${VENUE_LOCATION}</p>
    <p class="hall">${VENUE_HALL}</p>
  </section>

  <section class="map-section fade-section">
    <h3>오시는 길</h3>
    <div id="map" class="map-container"></div>
    <div class="map-buttons">
      <a class="map-btn" href="https://map.naver.com/p/search/%EB%A9%94%EB%A6%AC%EB%B9%8C%EB%A6%AC%EC%95%84%EB%8D%94%ED%94%84%EB%A0%88%EC%8A%A4%ED%8B%B0%EC%A7%80/place/1856237237" target="_blank" rel="noopener noreferrer"><img src="https://play-lh.googleusercontent.com/iqe1hFI03eD6nW3S8fxK_MDvNC8tDtod_gnhF9e8XN-IPmLXJvZVJLm-bQ4U5mKAVK0" alt="네이버맵 아이콘" class="btn-icon" />네이버 지도</a>
      <a class="map-btn" href="https://map.kakao.com/link/map/%EB%A9%94%EB%A6%AC%EB%B9%8C%EB%A6%AC%EC%95%84%EB%8D%94%ED%94%84%EB%A0%88%EC%8A%A4%ED%8B%B0%EC%A7%80,37.2627302,126.9966484" target="_blank" rel="noopener noreferrer"><img src="https://play-lh.googleusercontent.com/pPTTNz433EYFurg2j__bFU5ONdMoU_bs_-yS2JLZriua3iHrksGP6XBPF5VtDPlpGcW4" alt="카카오맵 아이콘" class="btn-icon" />카카오 지도</a>
    </div>
  </section>

  <section class="directions-section fade-section">
    <h3>오시는 방법</h3>
    <div class="direction-item walk">
      <h4 class="method">도보</h4>
      <p class="detail">${WALK_INFO}</p>
    </div>
    <div class="direction-item transit">
      <h4 class="method">대중교통</h4>
      <p class="detail">${TRANSIT_INFO}</p>
    </div>
    <div class="direction-item parking">
      <h4 class="method">주차</h4>
      <p class="detail">${PARKING_INFO}</p>
    </div>
  </section>

  <section class="calendar-section fade-section">
    <h3>달력</h3>
    <div id="calendar" class="calendar-container"></div>
  </section>

  <section class="countdown-section fade-section">
    <h3>남은 시간</h3>
    <div id="countdown"></div>
  </section>

  <section class="gallery-section fade-section">
    <h3>갤러리</h3>
    <div id="gallery-grid" class="gallery-grid"></div>
    <button id="gallery-more">더보기</button>
  </section>

  <div id="image-modal" class="image-modal">
    <button id="modal-close" class="modal-close">&times;</button>
    <button id="modal-prev" class="modal-prev">&#10094;</button>
    <img id="modal-image" alt="gallery" />
    <button id="modal-next" class="modal-next">&#10095;</button>
  </div>

  <section class="share-section fade-section">
    <button id="copy-url">
      <img
        src="https://img.icons8.com/ios-glyphs/30/copy.png"
        alt="복사 아이콘"
        class="btn-icon"
      />URL 복사
    </button>
    <button id="share-url">
      <img
        src="https://img.icons8.com/ios-glyphs/30/share.png"
        alt="공유 아이콘"
        class="btn-icon"
      />URL 공유
    </button>
    <button id="share-kakao">
      <img
        src="https://play-lh.googleusercontent.com/Ob9Ys8yKMeyKzZvl3cB9JNSTui1lJwjSKD60IVYnlvU2DsahysGENJE-txiRIW9_72Vd"
        alt="카카오톡 아이콘"
        class="btn-icon"
      />카카오톡 공유
    </button>
  </section>

  <div id="copy-toast" class="copy-toast"></div>

  <footer class="footer">© 2024 Wedding Invitation</footer>
`;

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

document.addEventListener("DOMContentLoaded", async () => {
  document.body.innerHTML = getTemplate();
  const eventDate = new Date(2026, 4, 17, 10, 30);
  const setDirectionInfo = (cls, info) => {
    const item = document.querySelector(`.directions-section .${cls}`);
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
  const directionsSection = document.querySelector(".directions-section");
  if (directionsSection) {
    const hasInfo = [...directionsSection.querySelectorAll(".direction-item")].some(
      (el) => el.style.display !== "none",
    );
    if (!hasInfo) directionsSection.style.display = "none";
  }

  const mapEl = document.getElementById("map");
  if (mapEl) {
    try {
      await loadScript(
        `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_API_KEY}`,
      );
      const position = new naver.maps.LatLng(VENUE_LAT, VENUE_LNG);
      const map = new naver.maps.Map("map", {
        center: position,
        zoom: 15,
      });
      const marker = new naver.maps.Marker({ position, map });
      const infoWindow = new naver.maps.InfoWindow({
        content:
          `<div style="padding:5px; word-break:break-all;"><div>${VENUE_LOCATION}</div><div>${VENUE_HALL}</div></div>`,
      });
      infoWindow.open(map, marker);
    } catch (e) {
      console.log(e);
    }
  }

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
      try {
        await navigator.clipboard.writeText(window.location.href);
        copyToast.textContent = "URL이 복사되었습니다";
        copyToast.classList.add("show");
        setTimeout(() => copyToast.classList.remove("show"), 2000);
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
      img.alt = `gallery image ${idx + 1}`;
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
