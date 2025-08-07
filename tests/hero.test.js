/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");

test("script.js dynamically renders hero section", async () => {
  document.body.innerHTML = "";
  process.env.NAVER_MAP_API_KEY = "test";

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

  const hero = document.querySelector(".hero-section");
  expect(hero).not.toBeNull();
  expect(hero.textContent).toContain("이성우");
  expect(hero.textContent).toContain("임상영");
});
