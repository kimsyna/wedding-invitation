/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");

test("script.js loads API keys from environment", async () => {
  process.env.NAVER_MAP_API_KEY = "naver_test";
  process.env.KAKAO_API_KEY = "kakao_test";

  document.body.innerHTML = `
    <div id="map"></div>
    <button id="share-kakao"></button>
  `;

  const appended = [];
  const originalAppend = document.head.appendChild.bind(document.head);
  document.head.appendChild = (el) => {
    appended.push(el);
    if (typeof el.onload === "function") {
      el.onload();
    }
    return originalAppend(el);
  };

  global.Kakao = { init: jest.fn(), Share: { sendDefault: jest.fn() } };
  global.naver = {
    maps: {
      LatLng: function () {},
      Map: function () {},
      Marker: function () {},
      InfoWindow: function () {
        return { open: function () {} };
      },
    },
  };
  global.IntersectionObserver = function () {
    return { observe() {}, unobserve() {} };
  };

  const scriptContent = fs.readFileSync(
    path.join(__dirname, "..", "script.js"),
    "utf8",
  );
  const scriptEl = document.createElement("script");
  scriptEl.textContent = scriptContent;
  document.head.appendChild(scriptEl);

  document.dispatchEvent(new Event("DOMContentLoaded"));

  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(appended[1].src).toContain(
    `ncpKeyId=${process.env.NAVER_MAP_API_KEY}`,
  );
  expect(Kakao.init).toHaveBeenCalledWith(process.env.KAKAO_API_KEY);
});
