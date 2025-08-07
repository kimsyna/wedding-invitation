/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");

test("script.js initializes immediately if DOM is ready", async () => {
  document.body.innerHTML = "";
  Object.defineProperty(document, "readyState", { value: "complete", configurable: true });

  const appended = [];
  const originalAppend = document.head.appendChild.bind(document.head);
  document.head.appendChild = (el) => {
    appended.push(el);
    if (typeof el.onload === "function") {
      el.onload();
    }
    return originalAppend(el);
  };

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
  global.Kakao = { init: jest.fn(), Share: { sendDefault: jest.fn() } };
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

  await new Promise((resolve) => setTimeout(resolve, 0));

  const hero = document.querySelector(".hero-section");
  expect(hero).not.toBeNull();
});
