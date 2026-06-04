/* Detect orphan lines (孤行寡字): a wrapped paragraph whose LAST visual line
   is only 1-3 characters. Uses Chromium greedy wrapping (no text-wrap:pretty)
   as a proxy for Figma's line breaking. */
const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const p = await b.newPage();
  await p.goto("file://" + path.join(__dirname, "index.html"), { waitUntil: "networkidle" });
  await p.evaluate(() => Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 6000))]));
  await p.waitForTimeout(500);
  const orphans = await p.evaluate(() => {
    const out = [];
    const SEL = ".body, .lead, .ledger-note, .marginalia .mg-col p, .kv .v, .bignum .t, .compare > div, blockquote.closing-line";
    for (const sec of document.querySelectorAll("section.poster")) {
      const seen = new Set();
      for (const el of sec.querySelectorAll(SEL)) {
        if (seen.has(el)) continue; seen.add(el);
        const txt = (el.innerText || "").trim();
        if (!txt) continue;
        const r = document.createRange();
        try { r.selectNodeContents(el); } catch (e) { continue; }
        const rects = [...r.getClientRects()].filter((x) => x.width > 1 && x.height > 1);
        if (rects.length < 2) continue;
        const last = rects[rects.length - 1];
        const maxW = Math.max(...rects.map((x) => x.width));
        const fs = parseFloat(getComputedStyle(el).fontSize);
        const lastChars = Math.round(last.width / fs);
        if (last.width < fs * 3.2) {
          out.push({ poster: sec.id, cls: el.className, fs: Math.round(fs), lines: rects.length, lastChars, tail: txt.slice(-22) });
        }
      }
    }
    return out;
  });
  console.log("=== 孤行检测（last line ≤ ~3 字）===");
  if (!orphans.length) console.log("✅ 无孤行");
  else for (const o of orphans) console.log(`${o.poster}  [${o.cls}]  ${o.lines}行·末行~${o.lastChars}字  …${o.tail}`);
  await b.close();
})();
