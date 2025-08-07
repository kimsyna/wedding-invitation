const fs = require("fs");
const path = require("path");

test("index.html includes redesigned hero section", () => {
  const html = fs.readFileSync(
    path.join(__dirname, "..", "index.html"),
    "utf8",
  );
  expect(html).toMatch(/class="hero-section"/);
  expect(html).toMatch(/<p class="groom">이성우<\/p>/);
  expect(html).toMatch(/<p class="bride">임상영<\/p>/);
});
