# Production Workflow

## Recommended Folder Shape

Create a task folder under the current workspace:

```text
social-card-<slug>/
  index.html
  render.cjs
  assets/
  output/
```

Use descriptive slugs:

- `social-card-doubao-input`
- `social-card-hiking-outfit`
- `wechat-ai-card-skill-cover`

## HTML/CSS Rendering Pattern

Build one HTML file containing all frames:

```html
<main class="sheet">
  <section class="poster xhs" id="xhs-01">...</section>
  <section class="poster xhs" id="xhs-02">...</section>
  <section class="cover wechat wide" id="wechat-21x9">...</section>
  <section class="cover wechat square" id="wechat-1x1">...</section>
  <section class="wechat-pair-preview" id="wechat-pair-preview">
    <div class="preview-wide">...</div>
    <div class="preview-square">...</div>
  </section>
</main>
```

Each frame must have stable dimensions:

```css
.xhs {
  width: 1080px;
  height: 1440px;
}

.wechat.wide {
  width: 2100px;
  height: 900px;
}

.wechat.square {
  width: 1080px;
  height: 1080px;
}

.wechat-pair-preview {
  width: 2400px;
  min-height: 1180px;
}
```

Use `box-sizing:border-box`, fixed safe margins, and `overflow:hidden`.

For WeChat covers:

- Compose `wechat-21x9` and `wechat-1x1` as separate source frames.
- Also include `wechat-pair-preview` in the same HTML so the pair can be inspected together.
- Export the two real deliverables separately.
- Export the pair preview only when helpful for review.
- The `1:1` cover should use a simplified title derived from the long title, not a crop or text squeeze from the `21:9` frame.

For electronic-magazine pages, place background canvases inside each `.poster` instead of relying only on CSS color:

```html
<section class="poster magazine hero" id="xhs-01">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content">...</div>
</section>
```

The skill includes a reusable helper at `assets/magazine-bg-webgl.js`. Copy or inline it into the generated project when a WebGL background is useful.

## Rendering

Use Playwright or an equivalent browser screenshot workflow:

1. Open `index.html`.
2. Wait for fonts and images.
3. Screenshot each frame node by id.
4. Save to `output/`.
5. Verify dimensions.

If using WebGL or procedural canvas backgrounds:

- Wait at least 500-900ms before screenshots so the canvas has rendered.
- Use deterministic seeds or a fixed time when repeatability matters.
- On normal content pages, keep background opacity subtle.
- On cover, divider, pull-quote, and sparse pages, let the atmosphere show more strongly.

Example render logic:

```js
const targets = [
  ["#xhs-01", "xhs-01-cover.png"],
  ["#xhs-02", "xhs-02-point.png"],
  ["#wechat-21x9", "wechat-21x9-cover.png"],
  ["#wechat-1x1", "wechat-1x1-cover.png"],
  ["#wechat-pair-preview", "wechat-cover-pair-preview.png"],
];
```

If a local dev server is needed for assets or font loading, start it and tell the user the URL. If `file://` rendering works, no server is required.

## Verification Commands

Useful checks on macOS:

```bash
sips -g pixelWidth -g pixelHeight output/*.png
```

For visual inspection in Codex:

- Use image viewing tools for local PNGs.
- Show final PNGs inline with absolute paths.

## Screenshot Treatment

Programmatic framing is preferred for user-provided screenshots:

- Create a clean target-ratio frame.
- Add plain white, refined grey, or paper background. Do not add page-wide grid/dot backgrounds unless the user explicitly asks for a technical blueprint look.
- If the capture contains a floating window/card over unrelated UI, crop to the foreground subject before placing it.
- Place screenshot inside with safe padding.
- Preserve readable text.
- Do not redraw the screenshot unless the user asked for redesign.
- Do not add perspective, skew, rotation, or mockup tilt unless the user explicitly asks for a scene mockup.

For Swiss:

- Straight corners.
- No shadow by default.
- Hairline only if the screenshot edge disappears.

For editorial magazine:

- Small radius or subtle shadow is allowed, but avoid SaaS marketing-card styling.

## Generated Images

When generating missing visuals:

- Generate only the raw visual asset.
- Keep text out of generated images.
- Match the page role and style mode.
- Save generated assets into `assets/` and place them in the HTML.
- Generate only the pages that need it, usually 1-2 images for a set.

## Accessibility And Readability

- Use strong contrast for all text.
- Do not place long text over busy photos.
- If text must sit over photo, use a solid ink/paper block or a high-contrast strip, not a blur blob.
- Avoid negative letter spacing in Chinese body text.
- Use line-height that lets Chinese breathe: roughly 1.08-1.22 for big titles, 1.35-1.55 for body.

## Common Fixes

- Cover feels empty: enlarge title, enlarge image, or add a functional bottom strip.
- Screenshot too small: reduce side text, give screenshot 55%-70% of the canvas.
- Lower area empty: read `portrait-fill.md`; merge pages, add a full-height ledger, use a larger evidence image, add a marginal quote column, or switch to an atmospheric thesis page.
- Style feels generic: add issue metadata, better type hierarchy, a stronger evidence image, richer WebGL/ink atmosphere, or more intentional content dividers.
- Text overflows: shorten copy before shrinking type.

---

## Dowsure 管线（接在以上 guizang 渲染流程之后）

> DowInsights 卡片组在 guizang 通用渲染之上的两条专属管线：① 出 PNG 成品；② **精准导出可编辑 Figma 画板**（TJ 核心诉求）。脚本在 `assets/scripts/`，**风格无关**（从渲染 DOM 抽坐标），Editorial / Swiss 两套模板通用。Editorial 已用 example-deck 13 卡验证；Swiss 是新接，第一组重点验证文字定位。规格依据 `brand-system.md` + `figma-pipeline.md`。

### 0. 渲染前自检

- 跑 `node assets/scripts/check-orphans.cjs` → 孤行清零（见 `qa-checklist.md` Dowsure 专项）。
- 确认背景无 WebGL（白底 + grain + 右上 atmo）、每卡右上 logo、页码全卡 `NN / 总数`。

### 1. 出 PNG 成品

```
node assets/scripts/render.cjs    # DSF2 → 每卡 2160×2880（3:4 @2x）
```

- Playwright 截图，等字体 + 图片加载完再截。
- 输出 `output/*.png`，跑 `sips -g pixelWidth -g pixelHeight output/*.png` 验尺寸。

### 2. 精准导出 Figma 画板

固定文件 `fileKey = 6XD1W72t7OegPTiyEClwGT`，**绝不 `create_new_file`**；新一组卡用 `figma.createPage()` 建新 page。流程：

1. **`node assets/scripts/figma-export.cjs`** —— 出**干净底图**：给 bg 注入 CSS 让文字透明（`color:transparent`）、logo 隐藏（`display:none`）、**竖条 `border-left:0 !important`**（金句竖条不烤进底图，否则文字一挪就错位）；同时抽 `layout.json`（每个文字/图片节点的 x/y/w/h/字号/字重）。
2. **`node assets/scripts/gen-figma-text.cjs`** —— 把文字注入指令**分块 < 50k**（单次 use_figma payload 上限），生成多段可顺序执行的 JS。
3. **先加载 `figma:figma-use` skill**，再调 `use_figma`：按 layout.json 建命名帧（帧名 = 卡片 id）。
4. **`upload_assets`** 拿 submitUrl（10 分钟有效）→ `curl` POST 底图 PNG → 作为帧的图片填充。
5. **分块注入文字**：每个文字节点 `NONE → resize → HEIGHT`（auto-resize）；字体映射 500→Medium / 400→Regular / Noto Serif SC 无斜体→Medium / Playfair italic→Italic；`loadFontAsync` → `setCharacters`。
6. **`createNodeFromSvg`** 贴 logo（矢量无损，`rescale(34/h)`，右上角 x758 y98）。
7. **收尾金句竖条**：每条单独 `createRectangle`（`x=88`、同 y、`height=文字节点高`、玫红填充），跨卡坐标尺寸一致 → 对齐（不依赖底图）。

### 3. 飞书取稿

- 当源稿是飞书文档（给了 URL / token）：先用 **`lark-doc` skill** 读取/提取正文（`docs +fetch --api-version v2`），再走压缩阶梯 → 排页 → 渲染。
- 文档里的嵌入表格 / 多维表格 / 画板，先用 `lark-doc` 提 token，再切对应 skill 下钻。
