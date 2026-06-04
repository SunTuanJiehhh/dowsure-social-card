# QA Checklist

Run this before final delivery.

## Dimensions

- Rednote images are `1080 x 1440`.
- WeChat 21:9 cover is `2100 x 900`.
- WeChat 1:1 cover is `1080 x 1080`.
- WeChat pair preview exists in the same HTML when WeChat covers are requested.
- File names are stable and ordered.

## Text

- No text overflows or touches the edge.
- No content collides with `.foot` / `.issue-strip`. If body copy or a closing line is overlapping the page footer, the footer is probably `position: absolute` while content above grew. Switch to flex `margin-top: auto` (see Anti-pattern C in `style-system.md`).
- Cover title is readable on a phone at thumbnail size.
- Body text is not smaller than it needs to be.
- Chinese line breaks are intentional.
- Important product names, English terms, and code snippets are spelled correctly.
- Captions match the source text; no invented facts.

## Layout

- Each page has one clear focal point.
- Pages do not all use the same structure.
- Lower empty space is either intentional or fixed.
- Images and screenshots align to the grid.
- Screenshot pages give the screenshot enough area.
- 1:1 WeChat cover uses a simplified short title and is composed separately, not blindly cropped.

### 4-band Density Check (3:4 only — run after render)

Open the rendered PNG. Mentally divide it into 4 horizontal bands of 360px each (0-25%, 25-50%, 50-75%, 75-100%). For each band, classify as:

- **Filled** — contains text, image, data, or rule.
- **Justified empty** — empty for a stated reason: hero-image breathing (M01/M16), single-sentence statement (M04/M13), leading/trailing margin (top 8% / bottom 8%).
- **Under-filled** — empty with no reason. **Any single under-filled band > 15% canvas height (>216px) is a fail.**

A poster passes when:

1. Total Filled + Justified empty ≥ 100%.
2. Filled bands cover ≥ 75% canvas height (≥ 1080px of 1440px).
3. No two adjacent bands are both "justified empty" — that creates a >25% void mid-poster.

If failing: don't shrink the canvas, don't add decorative blobs. Either expand copy (more ledger items, longer paragraphs, supporting evidence row, marginalia column) or switch recipe (M07 → M04 for genuinely-short content; M03 → M11 to add a marginal column; thin ledger → M08 Tall Ledger with bigger rows).

## Style

- Package uses one visual system.
- Swiss identity test passes for every Swiss poster (see `style-system.md` "Style Identity Test"). In particular: every display title >=72px uses a typed class with weight <=300; no serif font is loaded; only one accent color is used. A bold 90px headline is not Swiss.
- Editorial identity test passes for every Editorial poster: at least one atmosphere layer beyond a flat fill (paper grain / ink wash / WebGL); serif display family on the title; at least one of large photo well, serif pull quote, marginalia column, or true ledger structure. A flat paper with serif title + mono pills everywhere is Swiss-in-disguise.
- Swiss uses one accent color only.
- Magazine style uses restrained paper/ink tones.
- No random SVG blobs, ovals, drops, circles, stickers, or decorative gradients.
- No nested cards.
- No excessive rounded corners.

## Images

- Supplied images are not distorted.
- Faces, hardware, product UI, and key text are not accidentally cropped.
- Screenshots remain readable.
- Generated images do not contain unwanted text, logos, page numbers, or poster borders.
- Photo crops feel intentional.
- For any image fetched from the web (Pexels / Unsplash / Flickr CC / Wallhaven / direct search): the source URL is recorded in `assets/SOURCES.md`, and the user has been asked whether to add an in-image attribution caption. The user's answer is honored. Flickr CC attribution preserves the author name when the user opts in.

## Text-On-Image (when applicable)

Run these only for posters where text touches a photo (full-bleed cover, large image well, generated overlay). See `references/image-overlay.md`.

- Image area ≥60% of canvas → the photo passes the quiet-zone + light tests; no-mask composition was tried first; any tint is localized, image-toned, and only used if the thumbnail check fails.
- Subject map is documented as an HTML comment next to the hero block (face / focal feature location + safe zones).
- No display title (≥72 px) overlaps a face, hand, or key product feature.
- `object-position` was chosen from the subject-location table, not left at default for face shots.
- Thumbnail test: downscale the rendered PNG to 360 px wide and confirm the title is still legible without strain.

## Final Response

- Include the output path.
- Show the main cover inline when useful.
- Mention verification performed.
- Mention any limitations, such as low-resolution source assets.

---

## Dowsure 专项检查（在以上 guizang 检查全部通过之后再跑）

> 这是 DowInsights 卡片组在 guizang 通用检查之上的品牌铁律复核。规格依据 `brand-system.md`。**全部清零才算过。**

### 禁孤行寡字（hard rule）

- 跑 `node assets/scripts/check-orphans.cjs`，扫 body / lead / ledger-note / kv·v 等多行文本，**末行 ≤ ~3 字就报警**。
- 修法：**改文案**（加/减字让末行 ≥4–5 字），别只靠 `text-wrap:pretty`（Figma 不认）。改完**重跑直到清零**。
- HTML 改了文案，Figma 对应文字节点 `characters` 同步更新（`loadFontAsync` → `setCharacters`）。
- 例外：marginalia 边注栏（`.mg-col`）有意的短行堆叠不算孤行。

### 品牌色与标题

- **大标题 / 大引语全部玫红 `#F40064`**（`.h-display` / `.h-xl` / `.pullquote`）；正文墨色 `#15171c`，形成「黑字 + 玫红标题」对比。
- 玫红只有一个值：正文/标题用 `#F40064`，logo 盾牌是 `#E31860`，两者不要混用。
- 数据卡的大数字用玫红 serif，标注用冷灰 mono/sans。

### Logo（每卡右上）

- **每一张卡**（封面到尾页）右上角都有 logo，不只封面/尾页。
- 位置 x≈758 y≈98，尺寸 ≈234×34，右缘 992（= 1080 − 88 边距），与页眉 kicker 同基线。
- HTML 用 `<img class="card-logo">`（或 `.brandlogo`）；Figma 用 `createNodeFromSvg` + `rescale(34/h)`，**不烤进底图**。

### 收尾金句竖条一致性

- 所有 `.closing-line` 收尾金句的 **3px 玫红竖条 + 文字必须完全一致**：跨卡同 x、同 y、同长度、同字号 42 / 行高 59.6，水平对齐。
- HTML/PNG：统一用 `.closing-line` 类（`border-left:3px`），别给单卡内联 `font-size`。
- **Figma：竖条不烤进底图**（`figma-export.cjs` 注入 `.closing-line{border-left:0!important}`）；金句文字统一到同一 `(x=121,y)`，每条单独建 3px `createRectangle`（`x=88`、同 y、`height=文字节点高`）→ 跨卡对齐。
- 金句太长（首行折成 3 行）→ 竖条会变长不齐。**压到 2 行**，每行 ≤ ~15 字。

### 数字格式

- **千位符 + 单位前空格**：`$1,000 万`、`$1B`、`+729%`、`+47%`。
- 硬事实优先：带「测算/估算/约」的软指标能砍就砍，宁少而硬。

### 页码全卡一致

- `.deck-foot` 左侧 `NN / 总数` 页码，**封面到尾页每张都有，别漏尾页**。
- 页脚 in-flow（`margin-top:auto`，不要 `position:absolute`），hairline 上边线 + mono。
- 尾页页脚放品牌事实：`5 万卖家 · 100 亿发展资金 · SOC1 / ISO27001`。

### 背景（禁 WebGL）

- 背景 = 白底 `--paper` + `.grain`（淡颗粒 opacity .12，4px dot，multiply）+ `.atmo`（**右上**玫红径向柔光 + 左下墨晕）。
- **无 `<canvas class="mag-bg">` WebGL、无等高线 / 网格 / 点阵 / blob**（TJ 嫌「细胞分裂」）。

### 密度

- 每张 3:4 内容覆盖 ≥75% 画布高度（≥1080px / 1440px），跑上面的「4-band Density Check」，纯引语/封面可留呼吸。
