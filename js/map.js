// js/map.js

const initMap = () => {
  const {
    VENUE_LOCATION, VENUE_HALL, VENUE_LAT, VENUE_LNG,
    WALK_INFO, TRANSIT_INFO, PARKING_INFO,
  } = window.DATA;

  const NAVER_MAP_API_KEY =
    (typeof process !== "undefined" && process.env.NAVER_MAP_API_KEY) ||
    (window.env && window.env.NAVER_MAP_API_KEY);

  const loadExternalScript = (src) =>
    new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });

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
    const showFallback = () => {
       console.warn("Map loading failed or no key. Showing fallback.");
       mapEl.innerHTML = '';
       mapEl.style.display = "flex";
       mapEl.style.justifyContent = "center";
       mapEl.style.alignItems = "center";
       mapEl.style.backgroundColor = "#f0f0f0";
       mapEl.style.color = "#666";

       // Try to load a static map image if available
       const fallbackImg = document.createElement('img');
       fallbackImg.src = 'images/map_static.webp'; // Expected static image
       fallbackImg.alt = '약도 이미지';
       fallbackImg.style.width = '100%';
       fallbackImg.style.height = '100%';
       fallbackImg.style.objectFit = 'cover';

       fallbackImg.onerror = () => {
         // If image fails, show text
         mapEl.textContent = "지도를 불러올 수 없습니다.";
         fallbackImg.remove();
       };

       mapEl.appendChild(fallbackImg);

       const mapBtn = document.querySelector('.map-btn[aria-label="네이버"]');
       if (mapBtn) mapBtn.style.display = "flex";
    };

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
          showFallback();
        });
    } else {
       console.warn("No Naver Map API Key provided");
       showFallback();
    }
  }
};

window.initMap = initMap;
