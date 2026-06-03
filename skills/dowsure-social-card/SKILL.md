---
name: dowsure-social-card
description: 把 Dowsure(豆沙包)的文章/飞书文档转成「DowInsights 风格」小红书图文卡片组,并精准导出成可编辑的 Figma 画板。Editorial 杂志 × 水墨风 + Dowsure 品牌玫红 #F40064。Use when TJ wants 小红书卡片 / 推文卡片 / DowInsights 图文 / 行业洞察卡片 / Rednote carousel for Dowsure, or wants to turn a 飞书 doc into branded social cards + Figma. Triggers: "生成小红书卡片"、"DowInsights 卡片"、"把这篇做成图文"、"导出 Figma 画板".
---

# Dowsure Social Card

把一篇 Dowsure 对外稿件（飞书文档 / 文章 / DowInsights 洞察）转成**小红书图文卡片组**，再**精准导出成可编辑的 Figma 画板**。

这是 TJ 的专属封装，建立在 `guizang-social-card-skill`（Editorial × 水墨引擎）之上，但**固化了 Dowsure 品牌视觉系统 + TJ 的排版偏好**。它**不修改** guizang 原 skill；只读其 references 作参考。

## 产出什么

- **小红书卡片组**：3:4（1080×1440，导出 2160×2880 retina），8–14 张，Editorial 杂志风 + Dowsure 玫红。
- **可编辑 Figma 画板**：每张卡 = 烤好的氛围底图 + **原生可编辑文字图层** + 矢量 logo。TJ 能在 Figma 里逐字调。

## 何时用 / 不用

**用**：Dowsure / 豆沙包 对外图文、DowInsights 行业洞察、FastPay/跨商贷等产品科普、把飞书稿转小红书卡 + Figma。

**不用**：纯文案写作（用 `dowsure-write-xhs` / `dowsure-writer`）；横版 PPT（用 guizang-ppt-skill）；非 Dowsure 品牌的通用卡片（用 guizang-social-card-skill）。

## 必读 references

- `references/brand-system.md` — **核心**。Dowsure 品牌 token、干净背景系统（无细胞纹）、排版规则、**TJ 的 7 条排版偏好**（标题位置、120px 标语、每卡 logo、金句强调条、硬指标优先等）。
- `references/card-recipes.md` — 10 种卡片配方（封面 / 证据墙 / 边注随笔 / 大数字 / 大引语 / 账本 / Dev-Delta 对子 / 双栏对比 / 标签行 / 收尾判断）。
- `references/figma-pipeline.md` — **从 HTML 到 Figma 的完整管线**（figma-export → gen-figma-text → 建帧 → 传底图 → 注入文字 → 贴 logo），含所有踩坑点。

## 工作流

### 1. 取稿（Intake）

- 给了**飞书文档 URL**（`*.feishu.cn/wiki/` 或 `/docx/`）→ 用 `lark-doc` skill：`lark-cli docs +fetch --api-version v2 --doc "<url>" --doc-format markdown`。
- 文章里的**配图**：飞书图挂在临时鉴权链接上、且常是外部 newsletter 图表。**默认不复用**飞书内嵌图；改用原生数据视觉。**但若 TJ 提供了本地图片素材**（截图/图表），就当「证据」嵌进对应卡（见 figma-pipeline 的「图烤进底图」）。
  - ⚠️ macOS 的 `~/Desktop` 常被 TCC 锁死（"Operation not permitted"）。让 TJ 把图拖进**项目目录**（Documents 下）再处理。
- 涉及现价/政策/最新数据 → 先核查再写。**绝不编数据**。

### 2. 拆故事 → 排页

- 通读全文，列**每页一个想法**的页面计划（8–14 张）。长稿压到 10–13 张。
- **别漏章节**：长稿每个 H2 都该有落点；宁可合并，不要丢。
- 用 `references/card-recipes.md` 选每页配方，**交错节奏**（封面 / 数据 / 边注 / 引语 / 账本 / 对比 / 收尾），别张张都是「标题+卡片」。
- 有本地配图 → 安排 1–3 张「证据墙 / 大图」卡。

> 🔴 CHECKPOINT · 🛑 STOP：把页面计划（共 N 张，每张「配方 + 一句话主旨」）发给 TJ，**等确认或调整后再搭 HTML**。别跳过——白烤十几张卡再返工最贵。

### 3. 搭 HTML

- 从 `assets/example/example-deck.html`（完整 FDE 13 卡工作样例）起步，**复制成项目里的 `index.html`**，替换内容。它是 Dowsure 品牌 CSS 的完整工作基底（品牌玫红 / 干净背景 / logo / 页脚都在）。
- **再叠加 `references/brand-system.md` 的 7 条 TJ 偏好微调**（标题 y178、引语 120px、每卡 logo、金句 42px+竖条、硬指标优先、页码全卡、千位符）。token / 背景 / 排版规则严格照 brand-system.md。

### 4. 渲染 PNG

- 把 `assets/scripts/render.cjs` 拷进项目，改 `TARGETS` 为本次的卡片 id，`node render.cjs` 出图到 `output/`。
- 用 guizang 的 `validate-social-deck.mjs <dir>` 自查（0 FAIL）。逐张目检：背景干净、玫红到位、无溢出、吃满画布。

### 5. 导出 Figma（精准 + 可编辑）

照 `references/figma-pipeline.md` 全流程：`figma-export.cjs`（抽几何 + 渲染干净底图，文章图烤入、logo 隐藏）→ `gen-figma-text.cjs`（生成分块构建代码）→ `create_new_file` → 建命名帧 → `upload_assets` 传底图 → 分块 `use_figma` 注入文字 → `createNodeFromSvg` 贴 logo。

### 6. 交付

- 内联展示 PNG（绝对路径）+ Figma 链接（同一文件可迭代）。
- 一句话说清：N 张、品牌色、配图来源、可编辑范围。

## 出错怎么办（三段式兜底：触发 → 一线修复 → 仍失败兜底）

> 摘自 `references/figma-pipeline.md` 的实战踩坑，常见故障先按这张表救。

| 触发条件 | 一线修复 | 仍失败兜底 |
|---|---|---|
| `use_figma` 报错 | 原子失败＝整段没执行、无副作用；读错误 → 只改出错那处 → 重试 | 别盲目重跑；把出错 chunk 拆更小（每块 <50k 字符）再注入 |
| 文字注入后换行/位置乱 | 走 `textAutoResize` 流程：NONE → `resize(w,h)` → HEIGHT；字体按映射表 `loadFontAsync` 全预加载 | Noto Serif SC 在 Figma 无斜体 → 斜体一律映射 `Medium` 正体 |
| 底图残留旧元素（圆点/旧分隔线） | 改过 HTML 必须重跑 `figma-export.cjs` 再重传该底图（重传＝替换，非叠加） | 整帧删重建：先 `findAllWithCriteria` 收进数组、循环结束再 `remove`，别边遍历边删 |
| `upload_assets` 底图没贴上 | submitUrl 10 分钟过期 → 拿到尽快 `curl -F "file=@bg/<id>.png" "<submitUrl>"`，带 nodeId 自动设填充 | 链接过期就重跑 `upload_assets` 拿新 submitUrl |
| 取本地图报 `Operation not permitted` | macOS TCC 锁了 `~/Desktop` → 让 TJ 把图拖进项目目录（Documents 下）再处理 | 改用原生数据视觉，不强求嵌图 |
| 渲染 0 FAIL 但目检溢出/没吃满画布 | 回 `brand-system.md` 调 y 位/字号；3:4 必须吃满 ≥75% | 砍该卡信息量，或拆成两张 |

## Non-Negotiables（含 TJ 偏好，照做即可）

1. **品牌色 `#F40064`**（玫红）。墨色中性近黑 `#15171c`，纸面冷调 `#f2f4f5`。**大标题（h-display / h-xl / pullquote）全部用玫红。**
2. **背景必须干净**：纸面 + 极淡颗粒 + hero 柔光。**禁用 WebGL 水墨等高线**（TJ 嫌"细胞分裂"太脏）。
3. **logo 每张卡都放**，右上角，约 234×34，右缘对齐 992（=1080−88）。矢量优先。
4. **章节标题位置偏低**（≈ y178），kicker 与标题之间留足气口。
5. **单句宣言/大引语用超大字**（pullquote ≈ 120px），撑满、上移、最大冲击。
6. **收尾金句加强**：缩进 + 42px + 左侧 ~17px 玫红粗竖条。
7. **数字格式**：千位符 + 单位前空格（`$1,000 万`）。**软指标（测算/估算）能砍就砍，只留硬事实。**
8. **页码全卡一致**（NN / 总数，封面到尾页都要）。
9. 3:4 必须吃满画布（≥75%）。不编数据、不裁脸/关键 UI。
10. **绝不改 guizang 原 skill**；只读其 references 参考。

## 绝不做（反例黑名单 · 命中任一即停手重做）

1. ❌ **编数据 / 改硬指标凑数** —— 涉及现价、政策、最新数据先核查；宁缺毋造。
2. ❌ **WebGL 水墨等高线背景** —— TJ 嫌"细胞分裂"脏；背景只用纸 + 淡颗粒 + hero 柔光。
3. ❌ **改 guizang 原 skill** —— 只读它的 references 作参考，绝不动它的文件。
4. ❌ **直接复用飞书内嵌图** —— 临时鉴权链接会失效；改原生数据视觉，或用 TJ 给的本地素材。
5. ❌ **跳过页面计划确认就开烤** —— 必须先过上方 🔴 CHECKPOINT。
6. ❌ **漏章节 / 张张「标题+卡片」** —— 长稿每个 H2 要有落点，节奏交错（封面/数据/边注/引语/账本/对比/收尾）。
7. ❌ **裁脸 / 裁关键 UI；3:4 不吃满画布（<75%）**。
8. ❌ **大标题用墨色** —— h-display / h-xl / pullquote 一律玫红 `#F40064`。
