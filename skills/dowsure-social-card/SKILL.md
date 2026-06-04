---
name: dowsure-social-card
description: 把 Dowsure(豆沙包) 的文章 / 飞书文档做成「DowInsights 风格」小红书图文卡片组(3:4)，并精准导出成可编辑的 Figma 画板。两套视觉系统：Editorial 杂志(M01–M16,16 配方) × Swiss 数据(S01–S12,12 配方)，Dowsure 品牌玫红 #F40064 锁定。仅在明确点名 Dowsure 卡片任务时触发——例:「用 dowsure-social-card 做…」「DowInsights 卡片:<稿>」「把这篇做成 Dowsure 图文」「DowInsights 行业洞察卡片」「FastPay / 跨商贷数据卡」「导出 Dowsure Figma 画板」。Use ONLY when the user explicitly names Dowsure / 豆沙包 / DowInsights branded social cards, or asks for a Dowsure-branded Figma board. Do NOT trigger on a bare 生成小红书卡片 / 做成图文 / 导出 Figma 画板 with no Dowsure brand intent — route those to guizang-social-card-skill.
---

# Dowsure Social Card

把一篇 Dowsure 对外稿件（飞书文档 / 文章 / DowInsights 洞察）转成**小红书图文卡片组（3:4）**，再**精准导出成可编辑的 Figma 画板**。

这是 `guizang-social-card-skill`（AGPL-3.0）的**全量 fork**：guizang 的整套排版大脑——**两套视觉系统、28 个基础配方、组件/字号体系、11 类小红书品类路由、截图处理、图上叠字、肖像填充、地图组件、标题压缩、WeChat 封面对、QA 验证器**——都已 fork 进来，原样保留。在此之上叠加 **Dowsure 品牌皮肤**（玫红锁定、白底干净背景、每卡 logo、TJ 排版偏好、深色撞色变体、Figma 精准导出管线、飞书取稿工作流）。

> **铁律：100% 克隆 guizang，绝不删 guizang 内容；Dowsure 全靠叠加。** guizang 原模板 / 原 10 主题 / 15 references / 11 品类都保留作存档与下钻库，需要时直接查；也绝不改上游 guizang skill 本体。

## 产出什么

- **小红书卡片组**：3:4（1080×1440，渲染导出 2160×2880 retina），8–14 张，Editorial 杂志风或 Swiss 数据风 + Dowsure 玫红。
- **可编辑 Figma 画板**：每张卡 = 烤好的氛围底图（含文章配图、分隔线）+ **原生可编辑文字图层** + 矢量 logo。TJ 能在 Figma 里逐字调。

## 何时用 / 不用

**用**：Dowsure / 豆沙包 对外图文、DowInsights 行业洞察、FastPay / 跨商贷等产品科普、把飞书稿转 Dowsure 小红书卡 + Figma。

**不用**：纯文案写作（用 `dowsure-write-xhs` / `dowsure-writer`）；横版 PPT（用 `guizang-ppt-skill`）；**非 Dowsure 品牌的通用卡片 / 裸"生成小红书卡片"（用 `guizang-social-card-skill`）**。

---

## 两套视觉系统（28 基础配方）

一组卡只用**一套**系统，不混搭（除非 TJ 明确要 hybrid）。底层配方来自 guizang `references/layout-recipes.md`，已品牌化。

| 系统 | 气质 | 选它当… | 配方 |
|---|---|---|---|
| **Editorial 杂志 × 水墨** | 叙事 / 洞察 / 慢、手作、有呼吸 | 行业洞察、商业评论、来历随笔、引语换气、DowInsights 常规图文 | **M01–M16（16 种）** + Dowsure 精选 **R1–R10** |
| **Swiss International** | 数据 / 产品 / 方法论、工程化、决断 | FastPay / 跨商贷数据卡、KPI、对比矩阵、流程、参数榜单、强秩序信息 | **S01–S12（12 种）** |

- **选风格的判据是「editorial intent」**：这页是「特稿」还是「发布说明」？是叙事就 Editorial，是数据/系统就 Swiss——**不是按主题查表**（职场随笔也能 Editorial，旅行账本也能 Swiss）。
- **Dowsure R1–R10**（封面 / 证据墙 / 单大图 / 大数字 / 大引语 / 边注随笔 / 对子+指标 / 账本 / 双栏对比 / 收尾判断）是「拿到 Dowsure 选题后优先抓的成品骨架」，已注入玫红/logo/竖条/页码偏好。**Editorial 默认从 R1–R10 起步**，需要更多结构再下钻 M01–M16。详见 `references/card-recipes.md`（速查）与 `references/layout-recipes.md`（全量 + 每条最小密度）。

## Dowsure 4 主题（玫红锁定）

| 主题 | 切换 | 系统 | 明暗 | 用途 |
|---|---|---|---|---|
| **`dowsure`** | `<html data-theme="dowsure">` | Editorial | 亮（白底） | **默认主力**，常规图文 |
| **`dowsure-dark`** | `<html data-theme="dowsure-dark">` | Editorial | 暗（黑底） | 封面 key art、强冲击 hero、暗调配图 |
| **`dowsure-swiss`** | `<html data-accent="dowsure">` | Swiss | 亮（白底） | 数据 / 对比 / 流程 / 榜单 |
| **`dowsure-swiss-dark`** | `<html data-accent="dowsure-dark">` | Swiss | 暗（黑底） | 黑×玫红撞色封面、数据 hero |

- **亮色默认**；**暗色专用于封面 / 强冲击 hero**（黑底 × 玫红 keyart），不是通用开关——常规多图卡仍用亮色。
- 玫红 `#F40064` 是唯一高饱和锚色，4 主题共用。**黑×粉撞色**是封面设计方向（落在两个 dark 主题上），需要时并行出 3–4 变体让 TJ 挑。
- 备用：guizang 原 6 Editorial 主题（ink-classic / indigo-porcelain / forest-ink / kraft-paper / dune / midnight-ink）+ 4 Swiss accent（ikb / lemon-yellow / lemon-green / safety-orange）**保留但默认绝不主动用**。精确 token 见 `references/theme-presets.md`。

## 默认模板（其余 guizang 原件作存档）

- **Editorial** → 复制 `assets/template-dowsure-editorial.html` 成项目 `index.html`（品牌玫红 / 白底 / logo / 页脚 / dowsure 主题都已接好）。
- **Swiss** → 复制 `assets/template-dowsure-swiss.html`。
- guizang 原模板 `assets/template-editorial-card.html` / `template-swiss-card.html` **保留作 100% 克隆存档与参考**，不删不改。

## guizang 完整能力（可下钻库，需要时查）

全量 fork，下面这些原样可用，遇到对应场景直接读对应 reference：

- **11 类小红书品类路由**（旅行 / 职场 / 游戏 / 影视 / 美食 / 彩妆 / 穿搭 / 家居 / 健身 / 情感 / 推荐）→ `category-cookbook.md`（含能力圈，超纲品类要先如实告知 TJ）。
- **截图处理**（app / web / 代码 / dashboard 截图加框）→ `screenshot-treatment.md`。
- **图上叠字**（文字压在照片上：主体避让、局部 tint、object-position）→ `image-overlay.md`。
- **肖像 / 竖版填充**（3:4 别欠填）→ `portrait-fill.md`。
- **地图组件**（路线 / 门店空间关系）→ `map-component.md`。
- **标题压缩 / WeChat 封面对**（21:9 + 1:1，长标题派生短标题）→ `title-shortener.md` + `layout-recipes.md` 的 WeChat 段。
- **网图兜底**（TJ 没图时 Pexels/Unsplash/Flickr，先取后披露）→ `production-workflow.md`。

## 必读 references

**Dowsure 升级（先看这 3 个）：**

- `references/brand-system.md` — **核心铁律总纲**。品牌 token、干净背景系统（无细胞纹）、排版规则、**TJ 排版偏好**（标题 y178、120px 标语、每卡 logo、金句 3px 竖条、硬指标优先、千位符、禁孤行）、Dowsure 业务事实。
- `references/card-recipes.md` — Dowsure 10 种成品配方（R1–R10）速查。
- `references/figma-pipeline.md` — **HTML → Figma 完整管线**（figma-export → gen-figma-text → 建帧 → 传底图 → 注入文字 → 贴 logo），含所有踩坑点，覆盖两套模板。

**guizang fork（15 个，按需下钻）：**

- `platform-specs.md`（比例 / 出图尺寸 / 命名，默认 3:4）· `style-system.md`（Editorial / Swiss 视觉规则）· `theme-presets.md`（主题 token）· `layout-recipes.md`（M01–M16 + S01–S12 + R1–R10 全量配方）· `components.md`（字号体系 / 中文标题分级 / 最小可读 / Swiss card-fill 互斥）· `background-systems.md`（背景层）· `content-planning.md`（封面钩子 / 拆页 / 文案压缩）· `production-workflow.md`（渲染 / 配图）· `portrait-fill.md` · `image-overlay.md` · `screenshot-treatment.md` · `map-component.md` · `title-shortener.md` · `category-cookbook.md` · `qa-checklist.md`（交付前检查）。

---

## 工作流

### 1. 取稿（Intake）

- 给了**飞书文档 URL**（`*.feishu.cn` 或 `doubao.com` 的 `/wiki/`、`/docx/`）→ 用 `lark-doc` skill：`lark-cli docs +fetch --api-version v2 --doc "<url>" --doc-format markdown`。
- 文章里的**配图**：飞书图挂临时鉴权链接、常是外部 newsletter 图表，**默认不复用**，改用原生数据视觉。**但若 TJ 提供本地图片素材**（截图 / 图表），就当「证据」嵌进对应卡（见 figma-pipeline 的「图烤进底图」）。
  - ⚠️ macOS `~/Desktop` 常被 TCC 锁死（"Operation not permitted"）。让 TJ 把图拖进**项目目录**（Documents 下）再处理。
- 涉及现价 / 政策 / 最新数据 → 先核查再写。**绝不编数据。**

### 2. 拆故事 → 选系统 → 排页

- 通读全文，定**这组用 Editorial 还是 Swiss**（editorial intent：特稿 or 发布说明）。
- 列**每页一个想法**的页面计划（8–14 张）。长稿压到 10–13 张。
- **别漏章节**：长稿每个 H2 都该有落点；宁可合并，不要丢。
- 用 `card-recipes.md`（Editorial 优先 R1–R10）/ `layout-recipes.md` 选每页配方，**交错节奏**（封面 / 数据 / 边注 / 引语 / 账本 / 对比 / 收尾），别张张「标题+卡片」。
- 有本地配图 → 安排 1–3 张「证据墙 / 大图」卡。

> 🔴 CHECKPOINT · 🛑 STOP：把页面计划（用哪套系统 + 共 N 张 + 每张「配方 + 一句话主旨」）发给 TJ，**等确认或调整后再搭 HTML**。别跳过——白烤十几张卡再返工最贵。

### 3. 搭 HTML

- Editorial → 复制 `assets/template-dowsure-editorial.html`；Swiss → 复制 `assets/template-dowsure-swiss.html`，成项目里的 `index.html`。模板已接好品牌 CSS（玫红 / 干净背景 / logo / 页脚 / 默认 dowsure 主题）。
- 把 `<!-- POSTERS_HERE -->` 后的占位卡，替换成每页一个 `<section class="poster ...">`，骨架取自选定配方。**别用错系统的 class**（Editorial = serif + ledger/marginalia；Swiss = Inter + card-fill/matrix）。
- 暗色封面：Editorial 给该 section / `<html>` 切 `data-theme="dowsure-dark"`；Swiss 切 `data-accent="dowsure-dark"`。
- 严格照 `brand-system.md` 的 token / 背景 / 排版规则 + 7 条 TJ 偏好（标题 y178、引语 120px、每卡 logo、金句 42px+3px 竖条、硬指标优先、页码全卡、千位符）。

### 4. 渲染 PNG

- 把 `assets/scripts/render.cjs` 拷进项目，改 `TARGETS` 为本次卡片 id，`node render.cjs` 出图到 `output/`。
- 用 `node validate-social-deck.mjs <dir>` 自查（0 FAIL；它查溢出 / 页脚碰撞 / Swiss 粗体 / 最小字号 / 4 横带密度 / `.h-xl` 行数 / figure 默认边距）。逐张目检：背景干净、玫红到位、无溢出、吃满画布。

### 5. 导出 Figma（精准 + 可编辑）

照 `references/figma-pipeline.md` 全流程：`figma-export.cjs`（抽几何 + 渲染干净底图，文章图烤入、logo 隐藏、竖条 border-left:0）→ `gen-figma-text.cjs`（生成分块构建代码 <50k）→ 先加载 `figma:figma-use` → `create_new_file` 不用！进固定文件 → 建命名帧 → `upload_assets` 传底图 → 分块 `use_figma` 注入文字（`NONE→resize→HEIGHT`、字体映射）→ `createNodeFromSvg` 贴 logo。**脚本风格无关，两套模板通用**；Editorial 已用 FDE 13 卡验证，首组 Swiss 重点抽检文字定位。

### 6. 交付

- 内联展示 PNG（绝对路径）+ Figma 链接（同一文件可迭代）。
- 一句话说清：用哪套系统、N 张、品牌色、配图来源、可编辑范围。

## 出错怎么办（三段式兜底：触发 → 一线修复 → 仍失败兜底）

> 摘自 `references/figma-pipeline.md` 的实战踩坑，常见故障先按这张表救。

| 触发条件 | 一线修复 | 仍失败兜底 |
|---|---|---|
| `use_figma` 报错 | 原子失败＝整段没执行、无副作用；读错误 → 只改出错那处 → 重试 | 别盲目重跑；把出错 chunk 拆更小（每块 <50k 字符）再注入 |
| 文字注入后换行 / 位置乱 | 走 `textAutoResize` 流程：NONE → `resize(w,h)` → HEIGHT；字体按映射表 `loadFontAsync` 全预加载 | Noto Serif SC 在 Figma 无斜体 → 斜体一律映射 `Medium` 正体 |
| 底图残留旧元素（圆点 / 旧分隔线 / 竖条） | 改过 HTML 必须重跑 `figma-export.cjs` 再重传该底图（重传＝替换，非叠加） | 整帧删重建：先 `findAllWithCriteria` 收进数组、循环结束再 `remove`，别边遍历边删 |
| `upload_assets` 底图没贴上 | submitUrl 10 分钟过期 → 拿到尽快 `curl -F "file=@bg/<id>.png" "<submitUrl>"`，带 nodeId 自动设填充 | 链接过期就重跑 `upload_assets` 拿新 submitUrl |
| 取本地图报 `Operation not permitted` | macOS TCC 锁了 `~/Desktop` → 让 TJ 把图拖进项目目录（Documents 下）再处理 | 改用原生数据视觉，不强求嵌图 |
| 渲染 0 FAIL 但目检溢出 / 没吃满画布 | 回 `brand-system.md` 调 y 位 / 字号；3:4 必须吃满 ≥75% | 砍该卡信息量，或拆成两张 |

## Non-Negotiables（含 TJ 偏好，照做即可）

1. **品牌色 `#F40064`**（玫红）。墨色中性近黑 `#15171c`，纸面**纯白 `#ffffff`**（TJ 要白底，别用灰）；hero 柔光在**右上角**。**大标题（h-display / h-xl / pullquote）全部用玫红。** Swiss 唯一高饱和锚色也是玫红。
2. **背景必须干净**：纸面 + 极淡颗粒 + hero 柔光。**禁用 WebGL 水墨等高线**（TJ 嫌"细胞分裂"太脏），两套都禁。
3. **logo 每张卡都放**，右上角，约 234×34，右缘对齐 992（=1080−88）。矢量优先。
4. **章节标题位置偏低**（≈ y178），kicker 与标题之间留足气口。
5. **单句宣言 / 大引语用超大字**（pullquote ≈ 120px），撑满、上移、最大冲击。
6. **收尾金句**：缩进 + 42px + 左侧 **3px 细**玫红竖条（**Figma 里用独立矢量条、别烤进底图**，否则随文字移动会错位）。所有金句统一同 x / y / 长度。
7. **数字格式**：千位符 + 单位前空格（`$1,000 万`）。**软指标（测算 / 估算）能砍就砍，只留硬事实。**
8. **页码全卡一致**（NN / 总数，封面到尾页都要）。
9. 3:4 必须吃满画布（≥75%）。不编数据、不裁脸 / 关键 UI；Swiss 不在大标题写 inline `font-size+font-weight`（"the larger the lighter" 是铁律）。
10. **绝不删 / 改 guizang 克隆内容**（template-*-card.html 存档、guizang 15 references、原 10 主题、11 品类）——Dowsure 全靠叠加；也**绝不改上游 guizang skill 本体**。
11. **禁止孤行寡字**：任何段落不能让 1（或 1–3）个字单独成最后一行。改文案让末行 ≥ 4–5 字，跑 `assets/scripts/check-orphans.cjs` 复检至清零；Figma 文字节点也要同步改 `characters`。
12. **Figma 固定一个文件**：所有 Dowsure social card 都进 `6XD1W72t7OegPTiyEClwGT`（"DowInsights · FDE · 小红书卡片组"），**不要每次 `create_new_file`**；新一组卡在该文件里**新建一个 page** 再建帧。

## 绝不做（反例黑名单 · 命中任一即停手重做）

1. ❌ **编数据 / 改硬指标凑数** —— 涉及现价、政策、最新数据先核查；宁缺毋造。
2. ❌ **WebGL 水墨等高线背景** —— TJ 嫌"细胞分裂"脏；两套背景都只用纸 + 淡颗粒 + hero 柔光。
3. ❌ **删 / 改 guizang 克隆内容或上游 skill** —— 全量 fork 的存档（原模板 / 原主题 / 15 references / 11 品类）只读不动，Dowsure 靠叠加。
4. ❌ **直接复用飞书内嵌图** —— 临时鉴权链接会失效；改原生数据视觉，或用 TJ 给的本地素材。
5. ❌ **跳过页面计划确认就开烤** —— 必须先过上方 🔴 CHECKPOINT（含「用哪套系统」）。
6. ❌ **漏章节 / 张张「标题+卡片」** —— 长稿每个 H2 要有落点，节奏交错（封面 / 数据 / 边注 / 引语 / 账本 / 对比 / 收尾）。
7. ❌ **裁脸 / 裁关键 UI；3:4 不吃满画布（<75%）**。
8. ❌ **大标题用墨色** —— h-display / h-xl / pullquote 一律玫红 `#F40064`。
9. ❌ **两套视觉系统混搭** —— 一组卡只用 Editorial 或 Swiss，除非 TJ 明确要 hybrid。
