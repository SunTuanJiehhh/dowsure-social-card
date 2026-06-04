# Dowsure 品牌视觉系统

固化 Dowsure(豆沙包) 的小红书卡片视觉语言。建立在 guizang 的 **Editorial Magazine × E-ink** 与 **Swiss International** 两套模式上，换成 Dowsure 品牌色、干净背景，固化 TJ 的排版偏好。

## 0. 覆盖范围：两套视觉系统 × 亮/暗

Dowsure 锁定 **4 个默认主题**（token 全文见 `references/theme-presets.md`「Dowsure 品牌主题」、模板见 `assets/template-dowsure-editorial.html`）：

| 主题 | data-theme | 系统 | 明暗 | 典型用途 |
|---|---|---|---|---|
| Dowsure-Editorial 亮 | `dowsure` | Editorial × 水墨 | 亮白底 | **默认主力** · 行业洞察 / 商业评论 / 产品解读 |
| Dowsure-Editorial 暗 | `dowsure-dark` | Editorial × 水墨 | 暗黑底 | 封面 key art / 强冲击 hero / 暗调配图 |
| Dowsure-Swiss 亮 | `dowsure-swiss` | Swiss | 亮白底 | 数据密集 / 对比 / 流程 / 榜单 |
| Dowsure-Swiss 暗 | `dowsure-swiss-dark` | Swiss | 暗黑底 | 黑×粉撞色封面 / 数据 hero |

- **accent 永远 `#F40064`，四套不变。** Dowsure 默认锁玫红，guizang 原 10 主题仅作备用、不主动用。
- **本文档第 1–7 节的全部 TJ 铁律（玫红 / 白底 / 右上柔光 / 每卡 logo / 章节标题 y178 / pullquote 120 / 收尾金句竖条 / 页码全卡一致 / 禁孤行 / 禁 WebGL）默认写的是 Editorial 亮色，但同样适用于其余 3 套；各套差异在第 8 节（Swiss 化）与第 9 节（深色用法）单列。**

下面第 1 节起，先讲 Editorial 亮色（默认主力），再在第 8–9 节叠加 Swiss 与深色。

## 1. 品牌 Token（覆盖 indigo-porcelain 基底）

`<html data-theme="indigo-porcelain">`，再用下面这段覆盖：

```css
[data-theme="indigo-porcelain"]{
  --paper:       #ffffff;   /* ★ 白底,最干净（TJ 偏好,别用灰） */
  --paper-2:     #f1f4f6;   /* 极浅灰,仅图片面板/inset 用 */
  --ink:         #15171c;   /* 中性近黑（贴合 logo 黑字标，不要海军蓝） */
  --muted:       #5f6571;   /* 冷灰，meta/label/正文标注 */
  --line:        rgba(21,23,28,.20);
  --accent:      #F40064;   /* ★ Dowsure 品牌玫红 */
  --accent-soft: #f7c9da;
  --ink-rgb:     21,23,28;
  --accent-rgb:  244,0,100;
}
```

- logo 盾牌实际是 `#E31860`，正文玫红用 `#F40064`（更亮、更品牌）。两者都对，不要混。
- 纸面保持**冷调中性**（fintech 感），不要暖米色。

> 上面这套是 Editorial 亮色（`data-theme="dowsure"`，默认主力）。**现在模板已直接定义 `dowsure` 主题块**（不再靠覆盖 indigo-porcelain），token 与 `assets/template-dowsure-editorial.html` 逐字一致，照模板用即可。

**深色变体（黑 × 玫红，用于封面 / hero，见第 9 节）：**

| 主题 | data-theme | paper | paper-2 | ink | accent | 备注 |
|---|---|---|---|---|---|---|
| Dowsure-Editorial 暗 | `dowsure-dark` | `#0e0d0c` | `#1a1714` | `#ece2cf` | **`#F40064`** | 借 Midnight Ink 暗纸骨架；金 → 玫红；颗粒翻 `screen` 暖白点 |
| Dowsure-Swiss 暗 | `dowsure-swiss-dark` | `#0a0a0a` | grey-1 `#1a1a1a` | `#fafafa` | **`#F40064`** (块上字 `--accent-on:#fff`) | 纯黑底；grey-2 `#2a2a2a` / grey-3 `#8a8a8a` |

完整 CSS token 见 `references/theme-presets.md`「Dowsure 品牌主题」。

## 2. 背景系统 —— 干净，无细胞纹

**TJ 明确反馈：WebGL 水墨等高线配玫红像「细胞分裂」，太脏。禁用。**

每张卡背景 = 3 层，都是平滑的，没有线条/等高线/网格：

1. `--paper` **白色**底（`#fff`，最干净）。
2. `.grain` 极淡颗粒（纸纹），opacity ≈ .12，4px dot，multiply。
3. `.atmo`（**每张卡都加**，hero 页更强）：柔和径向玫红 + 墨晕。**★ 玫红光晕在右上角**（TJ 偏好，不是左上）：
   ```css
   .atmo{position:absolute;inset:0;z-index:1;pointer-events:none;
     background:
       radial-gradient(115% 75% at 88% 6%, rgba(var(--accent-rgb),.07), transparent 56%),   /* 玫红·右上 */
       radial-gradient(95% 70% at 6% 102%, rgba(var(--ink-rgb),.04), transparent 62%);}      /* 墨·左下 */
   .hero .atmo{background:
       radial-gradient(100% 62% at 86% 8%, rgba(var(--accent-rgb),.13), transparent 58%),
       radial-gradient(92% 72% at 8% 98%, rgba(var(--ink-rgb),.06), transparent 64%);}
   ```

**不要**：`<canvas class="mag-bg">` WebGL、等高线、网格、点阵、blob。白纸 + 颗粒 + 右上柔光，干净最重要。

**深色 Editorial（`dowsure-dark`）的背景**：同样禁 WebGL，但颗粒翻成 `screen` 暖白点（亮色的 multiply 黑点在黑底上不可见）。`.atmo` 右上玫红柔光保留（暗底上玫红更亮、更冲）。

```css
[data-theme="dowsure-dark"] .grain{ opacity:.12; mix-blend-mode:screen;
  background-image: radial-gradient(rgba(255,244,214,.08) 1px, transparent 1px); background-size:4px 4px; }
```

**Swiss（`dowsure-swiss` / `dowsure-swiss-dark`）的背景**：Swiss 本就是纯色块语言，**不用 `.atmo` 柔光、不用颗粒**——白底或黑底直接铺，靠玫红块 / 发丝线 / 网格做层级。柔光是 Editorial 专属，别带进 Swiss。

## 3. 排版规则（含 TJ 偏好）

字体栈同 Editorial：`--serif-zh` Noto Serif SC（标题/正文）、`--serif-en` Playfair Display italic（英文副标/引语）、`--mono` IBM Plex Mono（kicker/meta/页码）、`--sans-zh` Noto Sans SC（数据标注）。

### ★ 大标题全部玫红

```css
.h-display, .h-xl, .pullquote { color: var(--accent); }
```

- 封面 `.h-display` ≈ 106px / weight 500；章节 `.h-xl` 88px / 500。
- 正文墨色 `#15171c`，**只有标题/大引语是玫红**，形成「黑字 + 玫红标题」的强品牌对比。

### ★【TJ 偏好 1】章节标题位置偏低 ≈ y178

kicker 在 y96，章节标题压到 **y≈178**（kicker→标题留 ~56px 气口，比默认更松）。HTML 里给 `.h-xl` 加 `margin-top: ~40-44px`，或标题组用更大 gap。**密集卡（账本/多元素）要复核不溢出**，必要时该卡收窄气口。

### ★【TJ 偏好 2】单句宣言 / 大引语 ≈ 120px

纯引语卡（如「模型是金子，FDE 是矿工」）：`.pullquote` **font-size ≈ 120px**，line-height ≈ 1.22，斜体玫红，**上移**到上半屏（y≈266），撑满、最大冲击。比常规标题更狠。

### ★【TJ 偏好 4】收尾金句加强

页尾的斜体总结句（「FDE 不是新发明…」类）：
- font-size **42px 统一**（不是 36），line-height ≈ 1.42。
- 左侧一条 **3px 细玫红竖条**（★ TJ 明确要细的，16px 太粗丑；就用 3px weight）：
  ```css
  .closing-line{font-family:var(--serif-zh);font-style:italic;font-weight:500;
    font-size:42px;line-height:1.42;color:var(--ink);
    border-left:3px solid var(--accent);padding-left:30px;}
  ```
- **★【TJ 偏好 · 一致性】所有收尾金句的竖线 + 文字必须完全一致（同 x、同 y、同长度、同字号 42），跨卡水平对齐。**
  - **HTML / PNG**：用同一个 `.closing-line` 类（border-left 3px），别给单卡内联 `font-size`。bar = 文字的 border，天然对齐。
  - **Figma：竖条不要烤进底图！** 文字一旦在 Figma 里被挪动，烤死在底图的竖条就跟文字错位了（这是 TJ 反复指出的「定位不准」根因）。正确做法：
    1. `figma-export.cjs` 给 bg 注入 `.poster .closing-line{ border-left:0 !important }`，让底图**不含**竖条。
    2. 在 Figma 里把所有金句文字**统一到同一 `(x=121, y)`、统一字号 42 / 行高 59.6**（2 行）。
    3. 每张金句单独建一条 **3px 矢量竖条**（`createRectangle`，同 `x=88`、同 `y`、`height = 文字节点高度`），玫红填充。4 条坐标尺寸完全一致 → 跨卡对齐。
  - 单句太长（首行折行成 3 行）→ 竖条会变长、不齐。**金句压到 2 行**，每行 ≤ ~15 字。

> 思源宋体在 Figma 无斜体 → Figma 里这些「斜体」会变正体（可接受）；HTML/PNG 里是斜体。

### 字号下限（手机安全）

正文 ≥ 26px、lead ≥ 30px、kicker/meta/页码 ≥ 18px。配图说明 18px mono。**切文案，不要缩字。**

## 4. Logo 规则（★ TJ 偏好 3）

- **每一张卡都放 logo**，不只封面/尾页。
- 位置：**右上角，x≈758 y≈98**，尺寸 **≈ 234×34**（右缘 758+234=992 = 1080−88 边距，与页眉 kicker 同一基线）。
- 文件：`assets/dowsure-logo.svg`（黑字标 + 玫红盾，702×101）。
- HTML 里用 `<img class="card-logo">` 绝对定位右上；Figma 里用 `figma.createNodeFromSvg` 贴矢量（可无损缩放），`rescale(34 / node.height)`。
- 产品卡（如 FastPay）可在页眉**额外**加一个子品牌徽标（如 "FastPay × …"），放 logo 左侧。

## 5. 数字与文案（★ TJ 偏好 5/6）

- **千位符 + 单位前空格**：`$1,000 万`、`$1B`、`+729%`、`+47%`。
- **硬事实优先**：一组数据里，**带「测算/估算/约」的软指标能砍就砍**。TJ 把 FastPay 4 个指标砍成 3 个（删了「+47% 年度周转率提升（测算）」），只留 T+0 / $1,000 万 / 100%。宁少而硬。
- 数据卡的大数字用玫红 serif；标注用冷灰 mono/sans。
- **★ 中文标点用全角（TJ 铁律）**：引号一律用全角弯引号 `“…”` / `‘…’`，**绝不用英文直引号 `"` / `'`**；省略号 `……`、破折号 `——`、连接号 `—`。只有 HTML 属性（`class="…"` / `alt="…"` / `src="…"`）与代码里才保留直引号。改完文案后，Figma 对应文字节点的 `characters` 也要同步把直引号换成弯引号（遍历 TEXT 节点，节点内**交替配对**：第 1 个 `"`→`“`、第 2 个→`”`、依次切换；`loadFontAsync` 后再 `setCharacters`）。

## 5b. ★ 禁止孤行寡字（hard rule，TJ 反复强调）

**任何段落都不能让一个字（或 1–3 个字）单独成最后一行。** 孤行寡字 = 不专业，social 卡片一律不允许。

- **怎么查**：跑 `assets/scripts/check-orphans.cjs`（Chromium 贪婪换行，≈ Figma 断行）。扫 body / lead / ledger-note / kv·v 等多行文本，末行 ≤ ~3 字就报警。
- **怎么修**：**改文案**——加/减几个字让末行饱满（≥ 4–5 字）。**别只靠 `text-wrap:pretty`**（只对 PNG 有效、Figma 不认，会让两边断行不一致）。改完**重跑 check-orphans 直到清零**。
- **Figma 同步**：HTML 改了文案，Figma 对应文字节点的 `characters` 也要同步更新（`loadFontAsync` → set characters），否则 Figma 里仍是旧孤行。
- **例外**：marginalia 边注栏（`.mg-col`）那种**有意的短行堆叠**（如「没有需求文档,/因为客户/不会写」）不算孤行。

## 6. 页眉 / 页脚 / 页码

- 页眉：左 kicker（`NN · 小标题` mono）+ 右 logo。封面左上是 `DOWINSIGHTS` 栏目名（只留这个，不要堆 "AI 跨境 02 / 2026" 一串）。
- 页脚 `.deck-foot`：in-flow（`margin-top:auto`，**不要** `position:absolute`），hairline 上边线 + mono。左 `NN / 总数` 页码，右 一句 meta（玫红 highlight 可用 `.lead-seg`）。
- **★【TJ 偏好 7】页码全卡一致**：封面到尾页每张都要 `NN / 总数`，别漏尾页。
- 尾页页脚放品牌事实：`5 万卖家 · 100 亿发展资金 · SOC1 / ISO27001`。

## 8. Swiss 的 Dowsure 化（`dowsure-swiss` / `dowsure-swiss-dark`）

Swiss International 是 Dowsure 的**第二套**视觉系统，用于数据密集 / 对比 / 流程 / 榜单 / 强秩序信息卡。它**不替换** Editorial，是并行的另一种语气：Editorial 是「杂志感、有温度」，Swiss 是「秩序感、信息硬」。token 见 `theme-presets.md`「Dowsure-Swiss 亮 / 暗」。

把 guizang Swiss 铁律 + Dowsure 品牌叠加，得到下面这套：

### ★ 玫红是唯一 accent

- guizang Swiss 有 IKB 蓝 / 柠黄 / 柠绿 / 安全橙 4 套 accent —— **Dowsure 全部弃用，锁死 `#F40064` 一个玫红**。
- 一张卡里**只有一个彩色** = 玫红。其余全是中性灰阶（grey-1/2/3）+ 黑 / 白。**不要第二个彩色、不要渐变 / 阴影 / 玻璃 / 混色**（Swiss 铁律）。
- 玫红块上的字统一 `--accent-on:#ffffff`（玫红够深，反白清晰；不用黑字）。

### ★ the larger the lighter（越大越细，保留）

guizang Swiss 的核心字号铁律，Dowsure 原样保留：

- 超大号走更细字重：`h-hero` 240 / `h-statement` 180 / `h-xl` 120 / `num-mega` 200 / `num-xl` 144 —— 字号越大，font-weight 越轻（300 甚至更细），靠字号本身做冲击，不靠加粗。
- 正文 / 标注才用常规字重；最小可读 body ≥ 26、lead ≥ 30、t-cat / t-meta ≥ 18（mono 可 20）。**切文案，不缩字。**

### ★ 纯块 + 发丝线 + 网格节奏

- 信息靠**对齐、留白、网格**组织，不靠装饰。块面用 `--grey-1` 铺底，边界用 `--grey-2` 发丝线（1px），次要文字 `--grey-3`。
- 玫红只点在：一个巨数 / 一个 KPI / 一条强调横条 / 一个分类标签。**克制**，一卡一两处。

### Swiss 上的 Dowsure 品牌元素（与 Editorial 一致的铁律）

下面这些第 4–6 节的铁律，**Swiss 同样执行**，只是底色语言换成 Swiss：

- **每卡 logo**：右上角 234×34 / x758 y98 / 右缘对齐 992（黑底版 `dowsure-swiss-dark` 上 logo 仍是同一个 SVG，玫红盾在黑底上更跳）。
- **页码全卡一致**：`NN / 总数` 封面到尾页每张都有；Swiss 里页脚走发丝线分隔 + mono，不用 Editorial 的 `.deck-foot` 暖调，但页码格式 / 一致性规则相同。
- **数字格式**：千位符 + 单位前空格 `$1,000 万`；软指标（测算 / 估算）能砍就砍，留硬事实。
- **禁孤行**：同样跑 `check-orphans.cjs` 清零；Swiss 文字块更短，更要盯末行 ≥ 4–5 字。
- **收尾金句竖条**：Swiss 若用收尾金句，竖条仍是 3px 玫红、跨卡同 x/y/长度/字号；Figma 里同样用独立矢量条、不烤底图（见第 4 节 + `figma-pipeline.md`）。

## 9. 深色主题用法（黑 × 玫红：`dowsure-dark` / `dowsure-swiss-dark`）

深色是**封面 / 强冲击 hero 的专用语气**，不是日常多图文卡的通用底。判断标准：这张图是不是要「一眼炸住」（封面、keyart、单一巨字宣言、强冲击数据 hero、源配图本身就是暗调）——是，才上深色；常规承载信息的内页仍用亮色（`dowsure` / `dowsure-swiss`）。

### 什么时候用深色

- **封面 / key art**：一组卡的首图，黑底玫红巨字，最大化点击欲。
- **强冲击 hero**：单句宣言（pullquote 120px 玫红）、单个巨数（`$1,000 万` / `100%`）。
- **暗调源配图**：照片 / 截图本身偏暗，亮纸会削弱它 → 用 `dowsure-dark` 让图出血。
- **黑 × 粉撞色探索**：见下。

### 两套深色的取舍

- **`dowsure-dark`（Editorial 暗）**：暖黑底 `#0e0d0c` + 暖白字 `#ece2cf` + 玫红，有杂志 / 电影感。适合有温度的封面、叙事 hero、暗调摄影。颗粒翻 `screen`（见第 2 节）。排版纪律同 Midnight Ink：**不堆不透明卡片 / 色块**，靠图片出血 + 玫红 accent 做层级。
- **`dowsure-swiss-dark`（Swiss 暗）**：纯黑底 `#0a0a0a` + 纯白字 + 玫红，最硬、最撞。适合数据 hero、榜单封面、科技夜色。块面切割、发丝线 `#2a2a2a`、玫红块反白字。

### 黑 × 粉撞色（设计方向，非固定主题）

不是第 5 个主题，是封面 / hero 的**设计方向**，落在上面两套深色上实现。需要时**并行出 3–4 个变体让 TJ 挑**，胜出者沉淀成命名样例：

1. 黑底玫红巨字（Editorial 暗 serif / Swiss 暗 sans 均可）。
2. 黑 / 白 / 玫红三色构成（Swiss 暗，块面切割、强秩序）。
3. 玫红整块反白字（`--accent` 铺整块 + `--accent-on` 白字，最跳）。

> 深色封面 + 亮色内页可以混用在**同一组卡**里（封面 hero 用 `dowsure-dark`，内页用 `dowsure`），这是允许的"封面/内页"分工，不算"跨页混主题"。但同一张内页不要中途换明暗。

## 10. Dowsure 业务事实（可直接引用，勿编）

- 出口跨境电商一站式智能科技服务商；与 Amazon / Walmart / eBay / Shopee 长期或独家合作。
- 深圳 / 上海 / 香港 / 新加坡 / 胡志明 设点。
- 累计助力 **5 万卖家** 获得 **100 亿** 发展资金；加速回款已达数亿元。
- **SOC1 TYPE1 + ISO27001** 认证；未经卖家同意绝不收集/回传/泄露数据。
- **FastPay 极速回款**：亚马逊标准结算等 14 天 → 压到 **T+0 当天到账**；独家覆盖「标准订单 + 延迟交易」双通道；单笔最高 **$1,000 万**；基于平台真实交易授信、不依赖征信；获批通过率 100%；应收账款可出表。

> 这些是固定事实。新数据/新产品先核查，别凭记忆。
