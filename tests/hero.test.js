const fs = require("fs");
const path = require("path");

test("index.html includes redesigned hero section", () => {
  const html = fs.readFileSync(
    path.join(__dirname, "..", "index.html"),
    "utf8",
  );
  expect(html).toMatch(/class="hero-section"/);
  expect(html).toMatch(/이성우 ♥ 임상영/);
});
