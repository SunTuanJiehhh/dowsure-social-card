# Theme Presets

Use one theme for one image package. Do not mix palettes across pages unless the user explicitly asks for a deliberate multi-chapter system.

## Editorial Magazine x E-ink Palettes

These are adapted from the Guizang PPT electronic-magazine mode for static Rednote and WeChat images.

> **备用调色板。Dowsure 默认锁玫红（见文末「Dowsure 品牌主题」），一般不用这 10 套。** 仅当 TJ 明确要求非品牌色（例如借某主题原生骨架做一次性探索）时才动它们。

### Ink Classic

Use for business commentary, AI essays, product thinking, and neutral editorial posts.

```css
:root {
  --paper: #f3f0e8;
  --paper-2: #ebe6da;
  --ink: #0a0a0b;
  --muted: #68625a;
  --line: rgba(10,10,11,.22);
  --accent: #111111;
  --accent-soft: #d8d2c6;
}
```

### Indigo Porcelain

Use for technology, research, data, AI infrastructure, and calm analytical writing.

```css
:root {
  --paper: #f2f4f5;
  --paper-2: #e5ebef;
  --ink: #0a1f3d;
  --muted: #5f6d78;
  --line: rgba(10,31,61,.20);
  --accent: #315d93;
  --accent-soft: #d7e1ec;
}
```

### Forest Ink

Use for hiking, outdoor, nature, sustainability, personal field notes, and grounded lifestyle posts.

```css
:root {
  --paper: #f5f1e8;
  --paper-2: #e8dfcf;
  --ink: #16251b;
  --muted: #5d665d;
  --line: rgba(22,37,27,.22);
  --accent: #2e6b4f;
  --accent-soft: #d4dfd2;
}
```

### Kraft Paper

Use for memory, craft, personal essays, old objects, creator notes, and warm low-tech topics.

```css
:root {
  --paper: #eedfc7;
  --paper-2: #dfc9a8;
  --ink: #2a1e13;
  --muted: #755f49;
  --line: rgba(42,30,19,.24);
  --accent: #9b5a2e;
  --accent-soft: #d5b58f;
}
```

### Dune

Use for design, object studies, portfolio-like covers, gallery tone, and restrained aesthetic posts.

```css
:root {
  --paper: #f0e6d2;
  --paper-2: #ded0b7;
  --ink: #1f1a14;
  --muted: #6f6557;
  --line: rgba(31,26,20,.22);
  --accent: #8f7650;
  --accent-soft: #d4c2a4;
}
```

### Midnight Ink

The **only** official dark Editorial palette. Use for game key art, night photography, cinematic covers, dark-themed cultural pieces — content whose source imagery is already dark and would be diminished by paper backgrounds. Do not improvise other dark palettes; if Midnight Ink does not fit, pick a different mode (Editorial dark is not a universal switch).

```css
:root {
  --paper: #0e0d0c;
  --paper-2: #1a1714;
  --ink: #ece2cf;
  --muted: #9a8c75;
  --line: rgba(236,226,207,.22);
  --accent: #d4a04a;
  --accent-soft: #3a2a14;
}
```

Midnight Ink **must** also override two background layers — light-paper math does not carry over:

```css
[data-theme="midnight-ink"] .grain {
  opacity: .26;
  mix-blend-mode: screen;
  background-image: radial-gradient(rgba(255,244,214,.10) 1px, transparent 1px);
}
[data-theme="midnight-ink"] .paper-wash {
  background:
    radial-gradient(80% 50% at 28% 16%, rgba(212,160,74,.12), transparent 64%),
    radial-gradient(70% 60% at 80% 86%, rgba(60,40,20,.20), transparent 72%),
    linear-gradient(180deg, rgba(236,226,207,.02), rgba(0,0,0,.32));
}
[data-theme="midnight-ink"] .frame-img {
  background: #18120f;
  box-shadow: 0 0 0 1px rgba(236,226,207,.10);
}
```

The seed `template-editorial-card.html` ships these overrides — just switch `data-theme` and they apply automatically.

Magazine palette rules:

- Use `--paper` as the main background and `--ink` as primary type.
- Use `--accent` sparingly: section marker, page number, pull quote rule, or one highlighted phrase.
- `--paper-2` can support photo wells, issue strips, or checklist bands.
- Light palettes (the first five): do not turn into beige-on-beige. Maintain real contrast.
- Midnight Ink: do not stack opaque cards or fills on the page. Dark Editorial relies on photo bleeds + warm gilt accent for hierarchy, not background blocks.

## Swiss International Palettes

These are adapted from the Guizang PPT Swiss mode.

> **备用调色板。Dowsure 默认锁玫红（见文末「Dowsure 品牌主题」），一般不用这 4 套 IKB/柠黄/柠绿/安全橙。** Dowsure 的 Swiss 用 `dowsure-swiss` / `dowsure-swiss-dark`，accent 唯一玫红。

### IKB Blue

Default for AI, technology, product updates, design, and engineering topics.

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #002FA7;
  --accent-on: #ffffff;
}
```

### Lemon Yellow

Use for young, consumer, active, retail, sporty, or playful information.

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #FFD500;
  --accent-on: #0a0a0a;
}
```

### Lemon Green

Use for ecology, future, emerging tech, health, and highlighter-like contemporary topics.

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #C5E803;
  --accent-on: #0a0a0a;
}
```

### Safety Orange

Use for industrial, warning, urgency, risk, decision points, and sharp corrections.

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #FF6B35;
  --accent-on: #ffffff;
}
```

Swiss palette rules:

- Use exactly one `--accent`.
- Do not use gradients, shadows, glass, or mixed accent colors.
- If the accent is yellow or green, text on accent must use `--accent-on: #0a0a0a`.
- Prefer pure blocks, hairline rules, and grid rhythm.

---

## Dowsure 品牌主题（默认锁定 · 4 套）

**这 4 套是 Dowsure 的默认调色板。** 上面 guizang 的 10 套（6 Editorial + 4 Swiss）是备用，除非 TJ 明确点名，否则一律从这 4 套里选。

权威来源是 `assets/template-dowsure-editorial.html` —— 下面的 token 与该模板逐字一致，模板有更新时以模板为准。

四套覆盖「两套视觉系统 × 亮/暗」：

| 主题 | data-theme | 视觉系统 | 明暗 | 用途 |
|---|---|---|---|---|
| Dowsure-Editorial 亮 | `dowsure` | Editorial 杂志 × 水墨 | 亮（白底） | **默认主力**。行业洞察、商业评论、产品解读、DowInsights 常规图文 |
| Dowsure-Editorial 暗 | `dowsure-dark` | Editorial 杂志 × 水墨 | 暗（黑底） | 封面 key art、强冲击 hero、夜景 / 暗调配图、电影感封面 |
| Dowsure-Swiss 亮 | `dowsure-swiss` | Swiss International | 亮（白底） | 数据密集、对比表、流程、榜单、产品参数、强秩序信息卡 |
| Dowsure-Swiss 暗 | `dowsure-swiss-dark` | Swiss International | 暗（黑底） | 黑底玫红撞色封面、强冲击数据 hero、夜色科技感 |

颜色规则（4 套共用）：

- **accent 永远是 `#F40064`（Dowsure 品牌玫红），四套不变。** logo 盾牌实际 `#E31860`，正文玫红 `#F40064`，两者都对、不要混。
- 亮色纸面保持**冷调中性白**（fintech 感），不要暖米色。
- accent 克制使用：大标题 / 章节标记 / 页码 / 引语竖条 / 一个高亮短语 / 大数字。不要整片铺玫红。
- 暗色版（dowsure-dark / dowsure-swiss-dark）：黑底 + 玫红，专用于封面与强冲击 hero，**不是通用开关**；常规多图文卡仍用亮色主题。

### Dowsure-Editorial 亮（`dowsure`）

Editorial 默认主力主题。白底、冷灰墨字、大标题玫红。

```css
[data-theme="dowsure"] {
  --paper:       #ffffff;   /* ★ 白底，最干净（别用灰） */
  --paper-2:     #f1f4f6;   /* 极浅冷灰，仅图片面板 / inset 用 */
  --ink:         #15171c;   /* 中性近黑（贴 logo 黑字标，不要海军蓝） */
  --muted:       #5f6571;   /* 冷灰，meta / label / 正文标注 */
  --line:        rgba(21,23,28,.20);
  --accent:      #F40064;   /* ★ Dowsure 品牌玫红 */
  --accent-soft: #f7c9da;
  --ink-rgb:     21,23,28;
  --paper-rgb:   255,255,255;
  --accent-rgb:  244,0,100;
}
/* 大标题全玫红 + TJ 字号偏好 */
[data-theme="dowsure"] .h-display,
[data-theme="dowsure"] .h-xl,
[data-theme="dowsure"] .pullquote { color: var(--accent); }
[data-theme="dowsure"] .h-display { font-size: 106px; }            /* TJ 偏好：106 不是 124 */
[data-theme="dowsure"] .pullquote { font-size: 120px; line-height: 1.22; }  /* 单句宣言上移撑满 */
/* 背景：右上玫红柔光 + 淡颗粒（无 WebGL，禁「细胞分裂」） */
[data-theme="dowsure"] .grain {
  opacity: .12; mix-blend-mode: multiply;
  background-image: radial-gradient(rgba(0,0,0,.03) 1px, transparent 1px);
  background-size: 4px 4px;
}
```

### Dowsure-Editorial 暗（`dowsure-dark`）

黑 × 玫红。借 Midnight Ink 暗纸骨架，但金色 accent 全部换成品牌玫红。**用于封面 key art、强冲击 hero、暗调配图**，不是日常多图文的通用底。颗粒翻成 `screen` 暖白点。

```css
[data-theme="dowsure-dark"] {
  --paper:       #0e0d0c;   /* 暖黑（Editorial 暗纸） */
  --paper-2:     #1a1714;
  --ink:         #ece2cf;   /* 暖白字 */
  --muted:       #9a8c75;
  --line:        rgba(236,226,207,.20);
  --accent:      #F40064;   /* ★ 玫红（替掉 Midnight Ink 的金 #d4a04a） */
  --accent-soft: #3a1020;
  --ink-rgb:     236,226,207;
  --paper-rgb:   14,13,12;
  --accent-rgb:  244,0,100;
}
[data-theme="dowsure-dark"] .h-display,
[data-theme="dowsure-dark"] .h-xl,
[data-theme="dowsure-dark"] .pullquote { color: var(--accent); }
[data-theme="dowsure-dark"] .h-display { font-size: 106px; }
[data-theme="dowsure-dark"] .pullquote { font-size: 120px; line-height: 1.22; }
/* 暗色颗粒：翻成 screen 暖白点（亮色那套 math 不适用） */
[data-theme="dowsure-dark"] .grain {
  opacity: .12; mix-blend-mode: screen;
  background-image: radial-gradient(rgba(255,244,214,.08) 1px, transparent 1px);
  background-size: 4px 4px;
}
```

暗色 Editorial 排版纪律（同 Midnight Ink）：不要堆不透明卡片 / 色块；暗底靠图片出血 + 玫红 accent 做层级，不靠背景方块。

### Dowsure-Swiss 亮（`dowsure-swiss`）

Swiss 国际风的 Dowsure 化：唯一 accent 玫红，其余是中性灰阶 + 纯块 + 发丝线 + 网格节奏。用于数据密集、对比、流程、榜单。

```css
[data-theme="dowsure-swiss"] {
  --paper:     #ffffff;   /* 白底（fintech 干净，不用 guizang 的 #fafaf8 暖白） */
  --ink:       #0a0a0a;
  --grey-1:    #f0f0ee;   /* 面板 / 分区底 */
  --grey-2:    #d4d4d2;   /* 发丝线 / 边框 */
  --grey-3:    #737373;   /* 次要文字 */
  --accent:    #F40064;   /* ★ 唯一 accent 玫红 */
  --accent-on: #ffffff;   /* 玫红块上的字 → 白（玫红够深，反白清晰） */
  --line:      #d4d4d2;
  --accent-rgb:244,0,100;
}
```

### Dowsure-Swiss 暗（`dowsure-swiss-dark`）

纯黑底 × 玫红撞色，最强冲击。用于黑底巨字封面、数据 hero、夜色科技感。灰阶整体压暗。

```css
[data-theme="dowsure-swiss-dark"] {
  --paper:     #0a0a0a;   /* 纯黑底 */
  --ink:       #fafafa;
  --grey-1:    #1a1a1a;   /* 面板 / 分区底 */
  --grey-2:    #2a2a2a;   /* 发丝线 / 边框 */
  --grey-3:    #8a8a8a;   /* 次要文字 */
  --accent:    #F40064;   /* ★ 唯一 accent 玫红 */
  --accent-on: #ffffff;   /* 玫红块上的字 → 白 */
  --line:      #2a2a2a;
  --accent-rgb:244,0,100;
}
```

Dowsure-Swiss 规则（亮/暗共用，沿用 guizang Swiss 铁律 + Dowsure 化）：

- **唯一 accent 玫红**，不要第二个彩色；不要渐变 / 阴影 / 玻璃 / 混色。
- 「the larger the lighter」保留：超大号字（h-hero 240 / h-statement 180 / num-mega 200）走更细字重，越大越细。
- 玫红块上的字统一用 `--accent-on:#fff`（玫红够深，不用黑字）。
- 纯块 + 发丝线 + 网格节奏；信息靠对齐和留白，不靠装饰。

### 黑 × 粉撞色（封面 / hero 方向，非固定主题）

不是第 5 个主题，是封面 / 强冲击 hero 的**设计方向**，落在 `dowsure-dark` 或 `dowsure-swiss-dark` 上实现。需要时并行出 3–4 个变体让 TJ 挑，胜出者沉淀成命名样例：

- 黑底玫红巨字（serif Editorial 暗 / Swiss 暗均可）。
- 黑 / 白 / 玫红三色构成（Swiss 暗，块面切割）。
- 玫红整块反白字（`--accent` 铺块 + `--accent-on` 白字）。
