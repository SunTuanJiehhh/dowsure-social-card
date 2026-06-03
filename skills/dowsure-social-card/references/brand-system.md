# Dowsure 品牌视觉系统

固化 Dowsure(豆沙包) 的小红书卡片视觉语言。建立在 guizang 的 **Editorial Magazine × E-ink** 模式上，但换成 Dowsure 品牌色、干净背景，并固化 TJ 的排版偏好。

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

## 6. 页眉 / 页脚 / 页码

- 页眉：左 kicker（`NN · 小标题` mono）+ 右 logo。封面左上是 `DOWINSIGHTS` 栏目名（只留这个，不要堆 "AI 跨境 02 / 2026" 一串）。
- 页脚 `.deck-foot`：in-flow（`margin-top:auto`，**不要** `position:absolute`），hairline 上边线 + mono。左 `NN / 总数` 页码，右 一句 meta（玫红 highlight 可用 `.lead-seg`）。
- **★【TJ 偏好 7】页码全卡一致**：封面到尾页每张都要 `NN / 总数`，别漏尾页。
- 尾页页脚放品牌事实：`5 万卖家 · 100 亿发展资金 · SOC1 / ISO27001`。

## 7. Dowsure 业务事实（可直接引用，勿编）

- 出口跨境电商一站式智能科技服务商；与 Amazon / Walmart / eBay / Shopee 长期或独家合作。
- 深圳 / 上海 / 香港 / 新加坡 / 胡志明 设点。
- 累计助力 **5 万卖家** 获得 **100 亿** 发展资金；加速回款已达数亿元。
- **SOC1 TYPE1 + ISO27001** 认证；未经卖家同意绝不收集/回传/泄露数据。
- **FastPay 极速回款**：亚马逊标准结算等 14 天 → 压到 **T+0 当天到账**；独家覆盖「标准订单 + 延迟交易」双通道；单笔最高 **$1,000 万**；基于平台真实交易授信、不依赖征信；获批通过率 100%；应收账款可出表。

> 这些是固定事实。新数据/新产品先核查，别凭记忆。
