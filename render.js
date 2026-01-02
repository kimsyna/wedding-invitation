// render.js

(() => {
  const {
    GROOM_NAME, BRIDE_NAME, GROOM_FIRST_NAME, BRIDE_FIRST_NAME,
    EVENT_DATE_TEXT, EVENT_TIME_TEXT, EVENT_DATETIME_TEXT,
    VENUE_LOCATION, VENUE_HALL, VENUE_ADDRESS,
    WALK_INFO, TRANSIT_INFO, PARKING_INFO,
    GROOM_FATHER, GROOM_MOTHER, BRIDE_FATHER, BRIDE_MOTHER,
    GROOM_PHONE, BRIDE_PHONE, GROOM_FATHER_PHONE, GROOM_MOTHER_PHONE, BRIDE_FATHER_PHONE, BRIDE_MOTHER_PHONE,
    GROOM_ACCOUNT_BANK, GROOM_ACCOUNT_NUMBER, BRIDE_ACCOUNT_BANK, BRIDE_ACCOUNT_NUMBER,
    images: IMAGE_KEYS
  } = window.DATA;

  const renderHero = () => `
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-names">
          <p class="groom">${GROOM_NAME}</p>
          <div class="name-separator"></div>
          <p class="bride">${BRIDE_NAME}</p>
        </div>
        <p class="hero-datetime">${EVENT_DATETIME_TEXT}</p>
        <p class="location">${VENUE_LOCATION}</p>
        <p class="hall">${VENUE_HALL}</p>
      </div>
    </section>
  `;

  const renderInvitation = () => `
    <section class="invitation-section glass-section">
      <h2>초대의 글</h2>
      <p>
        꽃 향기 가득한 봄날, 서로를 존중하며 걸어온 두 사람이 한 자리에 서려 합니다.
      </p>
      <p>
        <strong>${EVENT_DATE_TEXT}</strong>
        따뜻한 축복의 발걸음으로 함께해 주시면 큰 기쁨이 되겠습니다.
      </p>
    </section>
  `;

  const renderFamilyContact = () => `
    <section class="family-contact-section glass-section fade-section">
      <div class="section-content">
        <img
          src="images/middle_DSC06713_0.webp"
          alt="contact photo"
          class="contact-image floating sequential-item"
          loading="eager"
        />
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
        <button id="contact-btn" class="contact-btn floating sequential-item glass-button">연락하기</button>
      </div>
    </section>
  `;

  const renderContactModal = () => `
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
                  <a aria-label="${GROOM_NAME}에게 전화하기" href="tel:${GROOM_PHONE.replace(/-/g, "")}"><img src="images/icons/phone.png" alt="전화" /></a>
                  <a aria-label="${GROOM_NAME}에게 문자 보내기" href="sms:${GROOM_PHONE.replace(/-/g, "")}"><img src="images/icons/sms.png" alt="문자" /></a>
                </span>
              </li>
              <li>
                <span class="contact-info">
                  <span class="role">父</span>
                  <span>${GROOM_FATHER}</span>
                </span>
                <span class="contact-actions">
                  <a aria-label="${GROOM_FATHER}에게 전화하기" href="tel:${GROOM_FATHER_PHONE.replace(/-/g, "")}"><img src="images/icons/phone.png" alt="전화" /></a>
                  <a aria-label="${GROOM_FATHER}에게 문자 보내기" href="sms:${GROOM_FATHER_PHONE.replace(/-/g, "")}"><img src="images/icons/sms.png" alt="문자" /></a>
                </span>
              </li>
              <li>
                <span class="contact-info">
                  <span class="role">母</span>
                  <span>${GROOM_MOTHER}</span>
                </span>
                <span class="contact-actions">
                  <a aria-label="${GROOM_MOTHER}에게 전화하기" href="tel:${GROOM_MOTHER_PHONE.replace(/-/g, "")}"><img src="images/icons/phone.png" alt="전화" /></a>
                  <a aria-label="${GROOM_MOTHER}에게 문자 보내기" href="sms:${GROOM_MOTHER_PHONE.replace(/-/g, "")}"><img src="images/icons/sms.png" alt="문자" /></a>
                </span>
              </li>
              <li class="account">
                <div class="account-info">
                  <span class="account-label">신랑 측 계좌</span>
                  <span class="account-bank">${GROOM_ACCOUNT_BANK}</span>
                  <span class="account-number">${GROOM_ACCOUNT_NUMBER}</span>
                </div>
                <button class="copy-account glass-button" data-account="${GROOM_ACCOUNT_NUMBER} ${GROOM_ACCOUNT_BANK}"><img src="images/icons/copy_small.png" alt="복사" /></button>
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
                  <a aria-label="${BRIDE_NAME}에게 전화하기" href="tel:${BRIDE_PHONE.replace(/-/g, "")}"><img src="images/icons/phone.png" alt="전화" /></a>
                  <a aria-label="${BRIDE_NAME}에게 문자 보내기" href="sms:${BRIDE_PHONE.replace(/-/g, "")}"><img src="images/icons/sms.png" alt="문자" /></a>
                </span>
              </li>
              <li>
                <span class="contact-info">
                  <span class="role">父</span>
                  <span>${BRIDE_FATHER}</span>
                </span>
                <span class="contact-actions">
                  <a aria-label="${BRIDE_FATHER}에게 전화하기" href="tel:${BRIDE_FATHER_PHONE.replace(/-/g, "")}"><img src="images/icons/phone.png" alt="전화" /></a>
                  <a aria-label="${BRIDE_FATHER}에게 문자 보내기" href="sms:${BRIDE_FATHER_PHONE.replace(/-/g, "")}"><img src="images/icons/sms.png" alt="문자" /></a>
                </span>
              </li>
              <li>
                <span class="contact-info">
                  <span class="role">母</span>
                  <span>${BRIDE_MOTHER}</span>
                </span>
                <span class="contact-actions">
                  <a aria-label="${BRIDE_MOTHER}에게 전화하기" href="tel:${BRIDE_MOTHER_PHONE.replace(/-/g, "")}"><img src="images/icons/phone.png" alt="전화" /></a>
                  <a aria-label="${BRIDE_MOTHER}에게 문자 보내기" href="sms:${BRIDE_MOTHER_PHONE.replace(/-/g, "")}"><img src="images/icons/sms.png" alt="문자" /></a>
                </span>
              </li>
              <li class="account">
                <div class="account-info">
                  <span class="account-label">신부 측 계좌</span>
                  <span class="account-bank">${BRIDE_ACCOUNT_BANK}</span>
                  <span class="account-number">${BRIDE_ACCOUNT_NUMBER}</span>
                </div>
                <button class="copy-account glass-button" data-account="${BRIDE_ACCOUNT_NUMBER} ${BRIDE_ACCOUNT_BANK}"><img src="images/icons/copy_small.png" alt="복사" /></button>
              </li>
            </ul>
          </div>
        </div>
        <div id="contact-toast" class="copy-toast"></div>
      </div>
      <button id="contact-close" class="modal-close glass-button">&times;</button>
    </div>
  `;

  const renderMap = () => `
    <section class="map-section glass-section fade-section">
      <div class="section-content">
        <h3>오시는 길</h3>
        <p class="map-address">${VENUE_ADDRESS}</p>
        <p class="map-hall">${VENUE_HALL}</p>
        <div id="map" class="map-container floating"></div>
        <div class="map-buttons">
          <a aria-label="네이버" class="map-btn floating glass-button" href="https://map.naver.com/p/search/%EB%A9%94%EB%A6%AC%EB%B9%8C%EB%A6%AC%EC%95%84%EB%8D%94%ED%94%84%EB%A0%88%EC%8A%A4%ED%8B%B0%EC%A7%80/place/1856237237" target="_blank" rel="noopener noreferrer"><img src="images/icons/naver_map.png" alt="네이버맵 아이콘" class="btn-icon" />네이버</a>
          <a aria-label="카카오" class="map-btn floating glass-button" href="https://place.map.kakao.com/871976307" target="_blank" rel="noopener noreferrer"><img src="images/icons/kakao_map.png" alt="카카오맵 아이콘" class="btn-icon" />카카오</a>
          <a aria-label="티맵" class="map-btn floating glass-button" href="https://tmap.life/1b2851ce" target="_blank" rel="noopener noreferrer"><img src="images/icons/tmap.png" alt="티맵 아이콘" class="btn-icon" />티맵</a>
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
      </div>
    </section>
  `;

  const renderSchedule = () => `
    <section class="schedule-section glass-section fade-section">
      <div class="section-content">
        <div id="calendar" class="calendar-container floating"></div>
        <p class="countdown-intro">${GROOM_NAME} & ${BRIDE_NAME}<span class="count-thin">의</span> 결혼식<span class="count-thin">까지</span></p>
        <h3>남은 시간</h3>
        <div id="countdown"></div>
        <button id="countdown-complete-btn" class="floating glass-button">카운트다운 완료</button>
      </div>
    </section>
  `;

  const renderGallery = () => {
    const images = IMAGE_KEYS.map((key) => ({
      full: `images/${key}.webp`,
      preview: `images/${key}_thumb.webp`,
    }));

    const initialVisible = 8;

    const galleryImagesHTML = images.map((item, idx) => `
      <img
        src="${item.preview}"
        alt="gallery image ${idx + 1}"
        class="gallery-image floating ${idx >= initialVisible ? 'hidden' : ''}"
        loading="${idx < initialVisible ? 'eager' : 'lazy'}"
        decoding="async"
        tabindex="0"
        data-idx="${idx}"
        data-full="${item.full}"
      />
    `).join('');

    const swiperSlidesHTML = images.map((item, idx) => `
      <div class="swiper-slide">
        <img src="${item.full}" alt="gallery slide ${idx + 1}" loading="lazy" decoding="async" />
      </div>
    `).join('');

    return `
    <section class="gallery-section glass-section fade-section">
      <div class="section-content">
        <div id="gallery-grid" class="gallery-grid">
          ${galleryImagesHTML}
        </div>
        <button id="gallery-more" class="floating glass-button" style="${images.length <= initialVisible ? 'display: none;' : ''}">더보기</button>
      </div>
    </section>

    <div id="image-modal" class="image-modal">
      <div id="modal-swiper" class="swiper">
        <div id="modal-swiper-wrapper" class="swiper-wrapper">
          ${swiperSlidesHTML}
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
      <button id="modal-close" class="modal-close glass-button">&times;</button>
    </div>
  `;
  };

  const renderShare = () => `
    <section class="share-section glass-section fade-section">
      <div class="section-content">
        <div class="share-row">
          <button id="copy-url" class="floating glass-button">
          <img
            src="images/icons/copy.png"
            alt="복사 아이콘"
            class="btn-icon"
          />URL 복사
        </button>
          <button id="share-url" class="floating glass-button">
          <img
            src="images/icons/share.png"
            alt="공유 아이콘"
            class="btn-icon"
          />URL 공유
        </button>
        </div>
        <div class="share-row">
          <button id="share-kakao" class="floating glass-button">
          <img
            src="images/icons/kakao_talk.png"
            alt="카카오톡 아이콘"
            class="btn-icon"
          />카카오톡 공유
        </button>
        </div>
      </div>
    </section>

    <div id="copy-toast" class="copy-toast"></div>

    <footer class="footer-section glass-section fade-section">© 2026 Made by Seongwoo</footer>
  `;

  const getAppContent = () => {
    return [
      renderHero(),
      renderInvitation(),
      renderFamilyContact(),
      renderContactModal(),
      renderMap(),
      renderSchedule(),
      renderGallery(),
      renderShare()
    ].join('');
  };

  window.renderApp = getAppContent;
})();
