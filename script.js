// 추가 기능: 달력, 남은 시간, 공유 버튼
const GROOM_NAME = "이성우";
const BRIDE_NAME = "임상영";
const GROOM_FIRST_NAME = GROOM_NAME.slice(1);
const BRIDE_FIRST_NAME = BRIDE_NAME.slice(1);
const EVENT_DATE_TEXT = "2026년 5월 17일 일요일";
const EVENT_TIME_TEXT = "오전 10시 30분";
const EVENT_DATETIME_TEXT = `${EVENT_DATE_TEXT} ${EVENT_TIME_TEXT}`;
const VENUE_LOCATION = "메리빌리아더프레스티지";
const VENUE_HALL = "2층 가든홀";
const VENUE_ADDRESS =
  "경기도 수원시 권선구 세화로 116 메리빌리아더프레스티지 웨딩홀 (서둔동 389)";
const VENUE_LAT = 37.2627302;
const VENUE_LNG = 126.9966484;
const WALK_INFO = "수원역 9번 출구에서 도보 10분";
const TRANSIT_INFO = "";
const PARKING_INFO = "예식장 내 주차장 이용 가능 (2시간 무료)";
const GROOM_FATHER = "이강호";
const GROOM_MOTHER = "박지연";
const BRIDE_FATHER = "김성훈";
const BRIDE_MOTHER = "최은지";
const GROOM_PHONE = "010-1234-5678";
const BRIDE_PHONE = "010-8765-4321";
const GROOM_FATHER_PHONE = "010-1111-2222";
const GROOM_MOTHER_PHONE = "010-3333-4444";
const BRIDE_FATHER_PHONE = "010-5555-6666";
const BRIDE_MOTHER_PHONE = "010-7777-8888";
const GROOM_ACCOUNT_BANK = "국민은행";
const GROOM_ACCOUNT_NUMBER = "123456-78-901234";
const BRIDE_ACCOUNT_BANK = "신한은행";
const BRIDE_ACCOUNT_NUMBER = "987654-32-109876";
const NAVER_MAP_API_KEY =
  (typeof process !== "undefined" && process.env.NAVER_MAP_API_KEY) ||
  (window.env && window.env.NAVER_MAP_API_KEY);
const KAKAO_API_KEY =
  (typeof process !== "undefined" && process.env.KAKAO_API_KEY) ||
  (window.env && window.env.KAKAO_API_KEY);

const getTemplate = () => `
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-names sequential-item">
        <p class="groom">${GROOM_NAME}</p>
        <div class="name-separator"></div>
        <p class="bride">${BRIDE_NAME}</p>
      </div>
      <p class="hero-datetime sequential-item">${EVENT_DATETIME_TEXT}</p>
      <p class="location sequential-item">${VENUE_LOCATION}</p>
      <p class="hall sequential-item">${VENUE_HALL}</p>
    </div>
  </section>

  <section class="invitation-section fade-section">
    <h2 class="sequential-item">초대의 글</h2>
    <p class="sequential-item">
      꽃 향기 가득한 봄날, 서로를 존중하며 걸어온 두 사람이 한 자리에 서려 합니다.
    </p>
    <p class="sequential-item">
      <strong>${EVENT_DATE_TEXT}</strong>
      따뜻한 축복의 발걸음으로 함께해 주시면 큰 기쁨이 되겠습니다.
    </p>
  </section>
  <section class="family-contact-section fade-section">
    <img src="https://picsum.photos/seed/wed0/600/400" alt="contact photo" class="contact-image floating sequential-item" loading="eager" />
    <div class="family-section">
        <p class="info-line sequential-item">
          <span class="info-name parent-name">${GROOM_FATHER}</span>
          <span class="name-dot">·</span>
          <span class="info-name parent-name">${GROOM_MOTHER}</span><span class="relation-particle">의</span>
          <span class="relation-child">아들</span>
          <span class="info-name child-name">${GROOM_FIRST_NAME}</span>
        </p>
        <p class="info-line sequential-item">
          <span class="info-name parent-name">${BRIDE_FATHER}</span>
          <span class="name-dot">·</span>
          <span class="info-name parent-name">${BRIDE_MOTHER}</span><span class="relation-particle">의</span>
          <span class="relation-child">딸</span>
          <span class="info-name child-name">${BRIDE_FIRST_NAME}</span>
        </p>
    </div>
      <button id="contact-btn" class="contact-btn floating sequential-item">연락하기</button>
  </section>

  <div id="contact-modal" class="contact-modal">
    <div class="contact-content">
      <div class="contact-columns">
        <div class="contact-column">
          <ul class="contact-list">
            <li>
              <span class="contact-info">
                <span class="role">신랑</span>
                <span>${GROOM_NAME}</span>
              </span>
              <span class="contact-actions">
                <a aria-label="${GROOM_NAME}에게 전화하기" href="tel:${GROOM_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/phone.png" alt="전화" /></a>
                <a aria-label="${GROOM_NAME}에게 문자 보내기" href="sms:${GROOM_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/sms.png" alt="문자" /></a>
              </span>
            </li>
            <li>
              <span class="contact-info">
                <span class="role">父</span>
                <span>${GROOM_FATHER}</span>
              </span>
              <span class="contact-actions">
                <a aria-label="${GROOM_FATHER}에게 전화하기" href="tel:${GROOM_FATHER_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/phone.png" alt="전화" /></a>
                <a aria-label="${GROOM_FATHER}에게 문자 보내기" href="sms:${GROOM_FATHER_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/sms.png" alt="문자" /></a>
              </span>
            </li>
            <li>
              <span class="contact-info">
                <span class="role">母</span>
                <span>${GROOM_MOTHER}</span>
              </span>
              <span class="contact-actions">
                <a aria-label="${GROOM_MOTHER}에게 전화하기" href="tel:${GROOM_MOTHER_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/phone.png" alt="전화" /></a>
                <a aria-label="${GROOM_MOTHER}에게 문자 보내기" href="sms:${GROOM_MOTHER_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/sms.png" alt="문자" /></a>
              </span>
            </li>
            <li class="account">
              <div class="account-info">
                <span class="account-label">신랑 측 계좌</span>
                <span class="account-bank">${GROOM_ACCOUNT_BANK}</span>
                <span class="account-number">${GROOM_ACCOUNT_NUMBER}</span>
              </div>
              <button class="copy-account" data-account="${GROOM_ACCOUNT_NUMBER} ${GROOM_ACCOUNT_BANK}"><img src="https://img.icons8.com/ios-glyphs/16/copy.png" alt="복사" /></button>
            </li>
          </ul>
        </div>
        <div class="contact-column">
          <ul class="contact-list">
            <li>
              <span class="contact-info">
                <span class="role">신부</span>
                <span>${BRIDE_NAME}</span>
              </span>
              <span class="contact-actions">
                <a aria-label="${BRIDE_NAME}에게 전화하기" href="tel:${BRIDE_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/phone.png" alt="전화" /></a>
                <a aria-label="${BRIDE_NAME}에게 문자 보내기" href="sms:${BRIDE_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/sms.png" alt="문자" /></a>
              </span>
            </li>
            <li>
              <span class="contact-info">
                <span class="role">父</span>
                <span>${BRIDE_FATHER}</span>
              </span>
              <span class="contact-actions">
                <a aria-label="${BRIDE_FATHER}에게 전화하기" href="tel:${BRIDE_FATHER_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/phone.png" alt="전화" /></a>
                <a aria-label="${BRIDE_FATHER}에게 문자 보내기" href="sms:${BRIDE_FATHER_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/sms.png" alt="문자" /></a>
              </span>
            </li>
            <li>
              <span class="contact-info">
                <span class="role">母</span>
                <span>${BRIDE_MOTHER}</span>
              </span>
              <span class="contact-actions">
                <a aria-label="${BRIDE_MOTHER}에게 전화하기" href="tel:${BRIDE_MOTHER_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/phone.png" alt="전화" /></a>
                <a aria-label="${BRIDE_MOTHER}에게 문자 보내기" href="sms:${BRIDE_MOTHER_PHONE.replace(/-/g, "")}"><img src="https://img.icons8.com/ios-glyphs/20/sms.png" alt="문자" /></a>
              </span>
            </li>
            <li class="account">
              <div class="account-info">
                <span class="account-label">신부 측 계좌</span>
                <span class="account-bank">${BRIDE_ACCOUNT_BANK}</span>
                <span class="account-number">${BRIDE_ACCOUNT_NUMBER}</span>
              </div>
              <button class="copy-account" data-account="${BRIDE_ACCOUNT_NUMBER} ${BRIDE_ACCOUNT_BANK}"><img src="https://img.icons8.com/ios-glyphs/16/copy.png" alt="복사" /></button>
            </li>
          </ul>
        </div>
      </div>
      <div id="contact-toast" class="copy-toast"></div>
    </div>
    <button id="contact-close" class="modal-close">&times;</button>
  </div>

  <section class="map-section fade-section">
    <h3>오시는 길</h3>
    <p class="map-address">${VENUE_ADDRESS}</p>
    <p class="map-hall">${VENUE_HALL}</p>
      <div id="map" class="map-container floating"></div>
    <div class="map-buttons">
      <a aria-label="네이버 지도" class="map-btn floating" href="https://map.naver.com/p/search/%EB%A9%94%EB%A6%AC%EB%B9%8C%EB%A6%AC%EC%95%84%EB%8D%94%ED%94%84%EB%A0%88%EC%8A%A4%ED%8B%B0%EC%A7%80/place/1856237237" target="_blank" rel="noopener noreferrer"><img src="https://play-lh.googleusercontent.com/iqe1hFI03eD6nW3S8fxK_MDvNC8tDtod_gnhF9e8XN-IPmLXJvZVJLm-bQ4U5mKAVK0" alt="네이버맵 아이콘" class="btn-icon" />네이버 지도</a>
      <a aria-label="카카오 지도" class="map-btn floating" href="https://map.kakao.com/link/map/%EB%A9%94%EB%A6%AC%EB%B9%8C%EB%A6%AC%EC%95%84%EB%8D%94%ED%94%84%EB%A0%88%EC%8A%A4%ED%8B%B0%EC%A7%80,37.2627302,126.9966484" target="_blank" rel="noopener noreferrer"><img src="https://play-lh.googleusercontent.com/pPTTNz433EYFurg2j__bFU5ONdMoU_bs_-yS2JLZriua3iHrksGP6XBPF5VtDPlpGcW4" alt="카카오맵 아이콘" class="btn-icon" />카카오 지도</a>
    </div>
    <div class="directions">
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
    </div>
  </section>

  <section class="schedule-section fade-section">
    <div id="calendar" class="calendar-container floating"></div>
    <p class="countdown-intro">${GROOM_NAME} & ${BRIDE_NAME}<span class="count-thin">의</span> 결혼식<span class="count-thin">까지</span></p>
    <h3>남은 시간</h3>
    <div id="countdown"></div>
    <button id="countdown-complete-btn" class="floating">카운트다운 완료</button>
  </section>

  <section class="gallery-section fade-section">
    <div id="gallery-grid" class="gallery-grid"></div>
    <button id="gallery-more" class="floating">더보기</button>
  </section>

  <div id="image-modal" class="image-modal">
    <div id="modal-swiper" class="swiper">
      <div id="modal-swiper-wrapper" class="swiper-wrapper"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <button id="modal-close" class="modal-close">&times;</button>
  </div>

  <section class="share-section fade-section">
    <div class="share-row">
        <button id="copy-url" class="floating">
        <img
          src="https://img.icons8.com/ios-glyphs/30/copy.png"
          alt="복사 아이콘"
          class="btn-icon"
        />URL 복사
      </button>
        <button id="share-url" class="floating">
        <img
          src="https://img.icons8.com/ios-glyphs/30/share.png"
          alt="공유 아이콘"
          class="btn-icon"
        />URL 공유
      </button>
    </div>
    <div class="share-row">
        <button id="share-kakao" class="floating">
        <img
          src="https://play-lh.googleusercontent.com/Ob9Ys8yKMeyKzZvl3cB9JNSTui1lJwjSKD60IVYnlvU2DsahysGENJE-txiRIW9_72Vd"
          alt="카카오톡 아이콘"
          class="btn-icon"
        />카카오톡 공유
      </button>
    </div>
  </section>

  <div id="copy-toast" class="copy-toast"></div>

  <footer class="footer">© 2024 Wedding Invitation</footer>
`;

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
    { threshold: 0.3 },
  );
  observer.observe(container);
};

const init = async () => {
  document.body.innerHTML = getTemplate();
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.loading = "lazy";
      img.decoding = "async";
    }
  });
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  applySequentialAnimation(".hero-section");
  applySequentialAnimation(".invitation-section");
  applySequentialAnimation(".family-contact-section");
  const heroSection = document.querySelector(".hero-section");
  if (heroSection && !prefersReducedMotion) {
    heroSection.classList.add("hero-zoom");
  }
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
    try {
      await loadExternalScript(
        `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_MAP_API_KEY}`,
      );
      const position = new naver.maps.LatLng(VENUE_LAT, VENUE_LNG);
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(
          VENUE_LAT + 0.0025,
          VENUE_LNG + 0.003,
        ),
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
        content:
          `<div style="padding:5px 10px; min-width:120px; white-space:nowrap; font-size:12px;"><div>${VENUE_LOCATION}</div><div>${VENUE_HALL}</div></div>`,
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

    const showThanks = () => {
      if (introEl) {
        introEl.textContent = `${GROOM_NAME} & ${BRIDE_NAME}의 결혼식에 참석해주셔서 진심으로 감사드립니다.`;
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
        showThanks();
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
    const completeBtn = document.getElementById("countdown-complete-btn");
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
    try {
      await loadExternalScript(
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
      );
    } catch (e) {
      console.error("Failed to load Swiper", e);
    }
    const images = Array.from(
      { length: 15 },
      (_, i) => `https://picsum.photos/seed/wed${i}/600/400`,
    );
    const moreBtn = document.getElementById("gallery-more");
    const modal = document.getElementById("image-modal");
    const swiperWrapper = document.getElementById("modal-swiper-wrapper");
    const closeBtn = document.getElementById("modal-close");
    let swiper;

    const initSwiper = () => {
      if (typeof Swiper !== "undefined" && !swiper) {
        swiper = new Swiper("#modal-swiper", {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      }
    };

    const openModal = (idx) => {
      modal.classList.add("open");
      document.body.classList.add("no-scroll");
      initSwiper();
      if (swiper) {
        swiper.slideTo(idx, 0);
      }
    };

    const cols = getComputedStyle(galleryGrid)
      .getPropertyValue("grid-template-columns")
      .split(" ").length;
    const visibleMap = { 2: 8, 3: 9, 4: 8 };
    const initialVisible = Math.min(
      visibleMap[cols] ?? 8,
      images.length
    );

    images.forEach((src, idx) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `gallery image ${idx + 1}`;
      img.className = "gallery-image floating";
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 600;
      img.height = 400;
      if (idx >= initialVisible) img.classList.add("hidden");
      img.addEventListener("click", () => openModal(idx));
      galleryGrid.appendChild(img);

      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      const slideImg = document.createElement("img");
      slideImg.src = src;
      slideImg.alt = `gallery slide ${idx + 1}`;
      slideImg.loading = "lazy";
      slideImg.decoding = "async";
      slideImg.width = 600;
      slideImg.height = 400;
      slide.appendChild(slideImg);
      swiperWrapper.appendChild(slide);
    });

    if (images.length <= initialVisible) {
      moreBtn.style.display = "none";
    }

    const closeGallery = () => {
      modal.classList.remove("open");
      document.body.classList.remove("no-scroll");
    };

    moreBtn.addEventListener("click", () => {
      galleryGrid
        .querySelectorAll(".hidden")
        .forEach((el) => el.classList.remove("hidden"));
      moreBtn.style.display = "none";
    });

    closeBtn.addEventListener("click", closeGallery);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeGallery();
    });
  }

  const contactBtn = document.getElementById("contact-btn");
  const contactModal = document.getElementById("contact-modal");
  const contactClose = document.getElementById("contact-close");
  if (contactBtn && contactModal && contactClose) {
    const openContact = () => {
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
      try {
        await navigator.clipboard.writeText(btn.dataset.account);
        if (contactToast) {
          contactToast.textContent = "복사되었습니다";
          contactToast.classList.add("show");
          setTimeout(() => contactToast.classList.remove("show"), 2000);
        }
      } catch (e) {
        console.log(e);
      }
    });
  });

  const shareSection = document.querySelector(".share-section");
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (shareSection && !isMobile) {
    shareSection.style.display = "none";
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
      { threshold: 0.5 },
    );
    fadeSections.forEach((sec) => observer.observe(sec));
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
