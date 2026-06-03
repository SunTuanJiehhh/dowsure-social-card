/* Precision export for Figma reconstruction.
   1) Dumps figma/layout.json — every text block's exact geometry + type style.
   2) Renders figma/bg/<id>.png — paper + ink atmosphere + ALL rules/borders,
      but with text made transparent, so Figma text layers sit on top 1:1. */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const DIR = __dirname;
const HTML = "file://" + path.join(DIR, "index.html");
const FIGMA = path.join(DIR, "figma");
const BG = path.join(FIGMA, "bg");
fs.mkdirSync(BG, { recursive: true });

const POSTERS = [
  "xhs-01-cover", "xhs-02-surge", "xhs-03-whatis", "xhs-04-identity", "xhs-05-gap",
  "xhs-06-quote", "xhs-07-palantir", "xhs-08-gravel", "xhs-09-china",
  "xhs-10-crossborder", "xhs-11-fastpay", "xhs-12-paradigm", "xhs-13-closing",
];

(async () => {
  const browser = await chromium.launch({
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1600 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  try { await page.goto(HTML, { waitUntil: "networkidle", timeout: 25000 }); }
  catch (e) { await page.goto(HTML, { waitUntil: "load", timeout: 25000 }); }
  await page.evaluate(() => Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 8000))]));
  await page.waitForTimeout(1400);

  // ---- 1) geometry + type extraction ----
  const layout = await page.evaluate((POSTERS) => {
    function hex(c) {
      const m = c && c.match(/[\d.]+/g);
      if (!m) return "#000000";
      const [r, g, b] = m.map(Number);
      return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
    }
    const INLINE = new Set(["SPAN", "BR", "EM", "B", "I", "A", "STRONG", "SUP", "SUB"]);
    const out = {};
    for (const id of POSTERS) {
      const sec = document.getElementById(id);
      if (!sec) { out[id] = null; continue; }
      const pr = sec.getBoundingClientRect();
      const nodes = [];
      function parts(el) {
        const ps = [];
        for (const cn of el.childNodes) {
          if (cn.nodeType === 3) { const t = cn.textContent; if (t.trim()) ps.push({ text: t }); }
          else if (cn.nodeType === 1) {
            if (cn.tagName === "BR") { ps.push({ br: true }); continue; }
            const cs = getComputedStyle(cn);
            ps.push({ text: cn.innerText, size: parseFloat(cs.fontSize), color: hex(cs.color) });
          }
        }
        return ps;
      }
      function walk(el) {
        for (const child of el.children) {
          const cs = getComputedStyle(child);
          if (cs.display === "none" || cs.visibility === "hidden") continue;
          const txt = child.innerText ? child.innerText.trim() : "";
          const elemChildren = Array.from(child.children);
          const allInline = elemChildren.every((c) => INLINE.has(c.tagName));
          const isFlexGrid = cs.display.includes("flex") || cs.display.includes("grid");
          if (txt && allInline && (!isFlexGrid || elemChildren.length <= 1)) {
            const r = child.getBoundingClientRect();
            const lh = parseFloat(cs.lineHeight);
            const ls = cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing);
            const hasParts = elemChildren.some((c) => c.tagName !== "BR");
            nodes.push({
              cls: child.className || "",
              text: child.innerText.replace(/ /g, " ").trim(),
              x: +(r.left - pr.left).toFixed(1), y: +(r.top - pr.top).toFixed(1),
              w: +r.width.toFixed(1), h: +r.height.toFixed(1),
              fontFamily: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
              fontSize: +parseFloat(cs.fontSize).toFixed(1),
              fontWeight: parseInt(cs.fontWeight, 10) || 400,
              italic: cs.fontStyle === "italic",
              color: hex(cs.color),
              letterSpacing: +(isNaN(ls) ? 0 : ls).toFixed(2),
              lineHeight: +(isNaN(lh) ? parseFloat(cs.fontSize) * 1.2 : lh).toFixed(1),
              align: cs.textAlign,
              parts: hasParts ? parts(child) : null,
            });
          } else {
            walk(child);
          }
        }
      }
      walk(sec.querySelector(".content"));
      out[id] = { w: +pr.width.toFixed(1), h: +pr.height.toFixed(1), nodes };
    }
    return out;
  }, POSTERS);
  fs.writeFileSync(path.join(FIGMA, "layout.json"), JSON.stringify(layout, null, 2));
  console.log("layout.json ·", POSTERS.map((k) => k.slice(4) + "=" + (layout[k] ? layout[k].nodes.length : "X")).join(" "));

  // ---- 2) atmosphere + rules background (text transparent) ----
  await page.addStyleTag({
    content: `.poster .content, .poster .content *{ color:transparent !important; -webkit-text-fill-color:transparent !important; caret-color:transparent !important; } .poster .brandlogo, .poster .dot{ visibility:hidden !important; } .poster .closing-line{ border-left:0 !important; }`,
  });
  await page.waitForTimeout(300);
  for (const id of POSTERS) {
    const el = await page.$("#" + id);
    await el.screenshot({ path: path.join(BG, id + ".png") });
    console.log("bg ·", id);
  }

  await browser.close();
  console.log("done");
})().catch((e) => { console.error(e); process.exit(1); });
