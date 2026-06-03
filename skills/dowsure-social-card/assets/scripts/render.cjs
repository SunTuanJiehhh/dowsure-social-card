/* Render each .poster section in index.html to output/ as PNG.
   Uses Playwright + swiftshader so the WebGL ink-flow background renders headless. */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const DIR = __dirname;
const HTML = "file://" + path.join(DIR, "index.html");
const OUT = path.join(DIR, "output");
fs.mkdirSync(OUT, { recursive: true });

const TARGETS = [
  ["#xhs-01-cover", "xhs-01-cover.png"],
  ["#xhs-02-surge", "xhs-02-surge.png"],
  ["#xhs-03-whatis", "xhs-03-whatis.png"],
  ["#xhs-04-identity", "xhs-04-identity.png"],
  ["#xhs-05-gap", "xhs-05-gap.png"],
  ["#xhs-06-quote", "xhs-06-quote.png"],
  ["#xhs-07-palantir", "xhs-07-palantir.png"],
  ["#xhs-08-gravel", "xhs-08-gravel.png"],
  ["#xhs-09-china", "xhs-09-china.png"],
  ["#xhs-10-crossborder", "xhs-10-crossborder.png"],
  ["#xhs-11-fastpay", "xhs-11-fastpay.png"],
  ["#xhs-12-paradigm", "xhs-12-paradigm.png"],
  ["#xhs-13-closing", "xhs-13-closing.png"],
];

(async () => {
  const browser = await chromium.launch({
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 1600 },
    deviceScaleFactor: 2, // 2x retina export -> 2160x2880
  });
  const page = await ctx.newPage();

  try {
    await page.goto(HTML, { waitUntil: "networkidle", timeout: 25000 });
  } catch (e) {
    console.warn("networkidle timeout, retry with load:", e.message);
    await page.goto(HTML, { waitUntil: "load", timeout: 25000 });
  }

  // Wait for webfonts (Google CDN) but don't hang forever if offline.
  await page.evaluate(() =>
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 8000))])
  );
  // Let the frozen WebGL ink-flow draw + grain settle.
  await page.waitForTimeout(1400);

  for (const [sel, name] of TARGETS) {
    const el = await page.$(sel);
    if (!el) {
      console.error("MISSING:", sel);
      continue;
    }
    await el.screenshot({ path: path.join(OUT, name) });
    console.log("saved", name);
  }

  await browser.close();
  console.log("done");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
