const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load local file directly since it is static
  const filePath = path.join(process.cwd(), 'index.html');
  await page.goto('file://' + filePath);

  // Wait for loading to finish
  await page.waitForSelector('body.loaded', { timeout: 10000 });

  // Take screenshot of Hero
  await page.screenshot({ path: 'verification/hero.png' });

  // Scroll to Map and take screenshot
  const mapSection = page.locator('.map-section');
  await mapSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // Wait for fade
  await page.screenshot({ path: 'verification/map.png' });

  // Open Contact Modal and take screenshot (to verify icons)
  const contactBtn = page.locator('#contact-btn');
  await contactBtn.click();
  await page.waitForSelector('#contact-modal.open', { timeout: 5000 });
  await page.waitForTimeout(500); // Wait for transition
  await page.screenshot({ path: 'verification/contact.png' });

  // Close contact modal
  await page.locator('#contact-close').click();

  // Scroll to Share Section and take screenshot
  const shareSection = page.locator('.share-section');
  await shareSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'verification/share.png' });

  await browser.close();
})();
