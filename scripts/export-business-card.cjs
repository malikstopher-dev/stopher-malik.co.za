// Export the approved artwork using the same document shown on the website.
// Run with Playwright installed: node scripts/export-business-card.cjs
// Optional PLAYWRIGHT_MODULE and CHROMIUM_PATH select system installations.
const path = require('node:path');
const fs = require('node:fs/promises');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    headless: true,
    args: ['--no-sandbox'],
  });
  try {
    const page = await browser.newPage({ deviceScaleFactor: 3.125 });
    const publicDir = path.resolve(__dirname, '../public');
    const artwork = await fs.readFile(path.join(publicDir, 'downloads/stopher-malik-business-card-mockup.png'));
    const html = await fs.readFile(path.join(publicDir, 'business-card.html'), 'utf8');
    await page.setContent(html.replaceAll('downloads/stopher-malik-business-card-mockup.png',
      `data:image/png;base64,${artwork.toString('base64')}`), { waitUntil: 'load' });
    for (const side of ['front', 'back']) {
      await page.locator(`#${side}`).screenshot({
        path: path.join(publicDir, `downloads/stopher-malik-card-${side}.png`),
      });
    }
    await page.pdf({
      path: path.join(publicDir, 'downloads/stopher-malik-business-card.pdf'),
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: false,
    });
    console.log('Exported approved artwork: front, back, and two-page PDF.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
