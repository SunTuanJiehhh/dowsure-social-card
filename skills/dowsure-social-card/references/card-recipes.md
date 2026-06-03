# 卡片配方

DowInsights 风格 3:4 卡的 10 种结构。交错使用，别张张同款。每张都遵守 `brand-system.md`（玫红标题、干净背景、每卡 logo、页脚页码）。底层 class 来自 guizang Editorial 模板（`.kicker / .h-display / .h-xl / .lead / .body / .pullquote / .ledger / .marginalia / .deck-foot / .frame-shot` 等）。

每卡骨架：
```html
<section class="poster xhs[ hero]" id="xhs-NN-slug">
  <div class="grain"></div>            <!-- hero 页再加 <div class="hero-wash"></div> -->
  <img class="card-logo" src="assets/dowsure-logo.svg">   <!-- 每卡右上角 -->
  <div class="content stack ...">
    …内容…
    <div class="deck-foot" style="margin-top:auto"><span>NN / 总数</span><span class="lead-seg">…</span></div>
  </div>
</section>
```

---

## R1 · 封面 Cover（hero）
栏目名 `DOWINSIGHTS`（左上）+ logo（右上）→ kicker → **大标题 h-display 玫红**（2 行）→ Playfair 斜体英文副标 → lead（一句钩子）→ 3 个 serif 玫红数字 + mono 标注 → 页脚。`justify-content:space-between` 分布。

## R2 · 证据墙 Evidence Wall（有截图时）
title → lead → **3 张截图并排**（`.frame-shot` r-4x3 / `.fit-cover`，下方 mono 小标）→ 一句 Playfair 斜体大引语 + 出处 → 页脚。截图来自 TJ 提供的本地图，烤进底图。

## R3 · 单大图 Feature（有 1 张图表/示意图）
title → lead → **1 张大图**（`.frame-shot` r-4x3 或 r-16x9，`bg-paper-2`/`bg-ink` + `inset-sub/bal`，FIT contain）→ 图注（`图：…` mono）→ 可选一段 body → 页脚。

## R4 · 大数字 Big Numbers
title → 过渡 lead（「一组数字，让很多 CFO 失眠：」）→ **3 个超大 serif 玫红数字**（≈134px，`%` 用 parts 缩小到 .42em）+ Noto Sans 标注 → 一句论点 lead → 页脚（SOURCE 出处）。

## R5 · 大引语 Pull Quote（hero · 单句宣言）
kicker → **≈120px 玫红斜体大标语**（上移、撑满上半屏，TJ 偏好）→ 出处 meta → 页脚。这是「换气页」，靠超大字给冲击，留白是设计。

## R6 · 边注随笔 Marginalia Essay
kicker+title → lead → `.marginalia`（左 2–3 段 `.body` serif 正文 / 右 `.mg-col` mono 边注栏，关键词用玫红 `.tag`）→ **收尾金句**（`.closing-line` 42px + 17px 玫红竖条）→ 页脚。适合讲来历/对比/原理。

## R7 · 对子 + 指标 Duo + Stats
title → lead → **两个并列标注块**（如 DEV / DELTA，mono 玫红小标 + serif 释义）→ 一段 body → **3 个 serif 玫红数字** + 标注 → 页脚。讲「一个概念两面 + 数据佐证」。

## R8 · 账本 Ledger
kicker+title → **3–4 行**（`.ledger-row`：mono 玫红序号 `01` + serif 标题 42px + serif 注释 22px，行间 hairline）→ 页脚。讲「N 条特征/判断」。4 行吃满，再多就压标题到 1 行。

## R9 · 双栏对比 Compare
title → lead → **左右两栏**（mono 小标「过去三年 / 接下来三年」「美国客户买 / 中国客户买」，右栏小标玫红）+ serif 释义 → 收尾金句 → 页脚。讲「A vs B 的转变」。可叠一行标签（5 个 mono 标签平铺）。

## R10 · 收尾判断 Closing（hero）
kicker+title → lead → **3 条判断**（ledger 式）→ **收尾金句**（`.closing-line` 强调条）→ 页脚放**品牌事实**（`5 万卖家 · 100 亿 · SOC1 / ISO27001`）。全卡收口。

---

## 排页节奏（13 卡参考）
封面 → 怪事/证据墙 → 是什么(图) → 数据 → 大引语 → 来历(边注) → 复利(对子) → 转折/对比 → 试验场(账本) → 产品样本(数据) → 范式(对比) → 判断(收尾) → 品牌收口。

## 密度
每张 3:4 内容覆盖 ≥75% 画布高度；纯引语/封面可留呼吸。渲染后跑 guizang `validate-social-deck.mjs`（0 FAIL），目检 4 横带不空。
