# Dowsure Social Card · 全量 Fork 改造设计 (Spec)

- **日期**：2026-06-04
- **作者**：TJ（设计）/ Claude（撰写）
- **状态**：待 TJ 审核
- **上游**：`guizang-social-card-skill` (op7418, AGPL-3.0)，本地参考副本 `FastPay/_upstream-guizang/`
- **改造工作台**：`~/.claude/skills/dowsure-social-card/`（live skill 就地升级）
- **回滚点**：发布仓 `~/dowsure-social-card`@d39abe5（干净的残血版）

---

## 0. 背景与目标

当前 dowsure-social-card 只 fork 了 guizang 的一个角（Editorial 单主题 + 10 个简化配方）。原版是一套 **28 配方 × 2 视觉系统 × 多主题** 的完整设计系统（3102 行 references + 2 模板 + QA 验证器）。

**目标**：把 guizang 全部内容 fork 进 dowsure 并**就地品牌化**，让 dowsure 成为自包含的、拥有原版全部排版复杂度、但严格遵守 Dowsure 品牌铁律的完整 skill。新增深色变体与黑×粉撞色探索。触发严格化。

**非目标**：不修改 guizang 上游；不追求与上游持续同步（接受脱钩，换取确定性）。

---

## 1. 设计原则：全量 fork +「换脑保皮」

- **保留「排版大脑」**：28 配方 / 组件系统 / 字号体系（"the larger the lighter"）/ 中文标题分级 / QA 验证器 / 工作流方法论 / 11 类小红书品类路由 / 截图处理 / 图上叠字 / 肖像填充 / 地图组件 / 标题压缩。
- **替换「品牌皮肤」**：把 `brand-system.md` 的全部铁律，从"只覆盖 Editorial 单主题"扩展到覆盖**两套模板 + 亮/暗主题**。
- **确定性优先**：AI 读到的就是最终态（品牌化已烤进文件），不靠运行时"读 A 应用 B"。这是 TJ 选「全量 fork」而非「分层覆盖」的核心理由。

---

## 2. 目录结构

```
dowsure-social-card/
├── SKILL.md                          【重写】入口：两套风格 + 28 配方 + 铁律 + Figma + 工作流
├── docs/
│   └── 2026-06-04-full-fork-design.md  本 spec
├── references/                       (fork 15 + Dowsure 升级)
│   ├── style-system.md               🔧 删 WebGL、暖纸→白底、玫红标题铁律
│   ├── theme-presets.md              🔧 新增 Dowsure 4 主题 + 保留 guizang 10 主题（备用）
│   ├── components.md                 🔧 字号按 TJ 调 + logo + 金句竖条规格
│   ├── layout-recipes.md             🟡 28 配方 + 并入 Dowsure 独有 + 注入偏好
│   ├── background-systems.md         🔧 大砍：只留 Dowsure 干净背景
│   ├── category-cookbook.md          ✅ 保留原版 11 品类（不换）
│   ├── qa-checklist.md               🟡 + Dowsure 检查
│   ├── production-workflow.md        🟡 接入 Dowsure render + Figma
│   ├── content-planning.md           🟡 + DowInsights 栏目 + 飞书取稿
│   ├── platform-specs.md             ✅ 保留（微调默认 3:4）
│   ├── portrait-fill.md              ✅ 保留
│   ├── image-overlay.md              ✅ 保留
│   ├── screenshot-treatment.md       ✅ 保留
│   ├── map-component.md              ✅ 保留
│   ├── title-shortener.md            ✅ 保留
│   ├── brand-system.md               ⭐ Dowsure 升级：品牌铁律总纲（覆盖两套）
│   └── figma-pipeline.md             ⭐ Dowsure 升级：HTML→Figma（覆盖两套）
├── assets/
│   ├── template-editorial-card.html  🔧 fork guizang → Dowsure 品牌化
│   ├── template-swiss-card.html      🔧 fork guizang → Dowsure 品牌化
│   ├── dowsure-logo.svg              ✅ Dowsure
│   ├── scripts/                      ✅ render / figma-export / gen-figma-text / check-orphans（升级支持两套）
│   └── example/                      ✅ FDE 13 卡（Editorial 工作样例）
├── validate-social-deck.mjs          🟡 fork + 加 Dowsure 检查
└── LICENSE / NOTICE / README.md      AGPL 合规

删除：assets/magazine-bg-webgl.js（TJ 禁 WebGL）、assets/screenshot-backgrounds/*（guizang 主题背景图，Dowsure 不用）
```

图例：🔧改造 · 🟡保留+加 · ✅基本保留 · ⭐Dowsure 升级 · ❌删

---

## 3. Dowsure 品牌规格

### 3.1 颜色 Token

**亮色（默认）— Dowsure 品牌色，两套共用：**

```css
--paper:#ffffff; --paper-2:#f1f4f6; --ink:#15171c; --muted:#5f6571;
--line:rgba(21,23,28,.20); --accent:#F40064; --accent-soft:#f7c9da;
/* Swiss 额外 */ --grey-1:#f0f0ee; --grey-2:#d4d4d2; --grey-3:#737373; --accent-on:#ffffff;
```

**深色变体（新增）：**

| 主题 | paper | ink | accent | 备注 |
|---|---|---|---|---|
| Dowsure-Editorial-Dark | #0e0d0c / paper-2 #1a1714 | #ece2cf | **#F40064** | 借 Midnight Ink 骨架；金色→玫红；grain `screen` 混合 |
| Dowsure-Swiss-Dark | #0a0a0a | #fafafa | **#F40064** (on #fff) | grey-1 #1a1a1a / grey-2 #2a2a2a / grey-3 #8a8a8a |

> logo 盾牌实际 #E31860，正文玫红 #F40064，两者都对不要混。

### 3.2 字号体系（Dowsure 调整后）

**Editorial**（guizang 值 → Dowsure）：

| 角色 | class | Dowsure | guizang | 说明 |
|---|---|---|---|---|
| Display | `.h-display` | **106px**/500 | 124px | TJ 偏好；保留中文长度分级逻辑 |
| Pull quote | `.pullquote` | **120px**/500 it | 64px | 单句宣言，上移撑满 |
| 收尾金句 | `.closing-line` | **42px**/500 it | 无 | + border-left 3px accent，padding-left 30px |
| Section / Mid / Sub / Lead / Body / Kicker / Meta | `.h-xl 88` `.h-md 56` `.h-sub 36` `.lead 28` `.body 24` `.kicker 21` `.meta 18` | 沿用 guizang | | 大标题色改玫红 |

**Swiss**：沿用 guizang scale（h-hero 240/200、h-statement 180/200、h-xl 120/300、num-mega 200/200、num-xl 144/200、lead 30、body 26、t-cat 22、t-meta 20）；**accent 换玫红**；"the larger the lighter" 铁律保留。

**最小可读**：body≥28 / lead≥30 / kicker·meta≥18（mono 可 20）。**切文案，不缩字。**

### 3.3 主题清单（4 默认锁定 + 10 备用）

- **默认 Dowsure 主题**：`dowsure`（Editorial 亮）/ `dowsure-dark`（Editorial 暗）/ `dowsure-swiss`（Swiss 亮）/ `dowsure-swiss-dark`（Swiss 暗）。
- **备用**：guizang 原 10 主题 fork 保留（不删，备 TJ 某天要非品牌色）。**默认绝不主动用**。
- **黑×粉撞色探索**：非固定主题，是封面/hero 的设计方向。实施 P1/P2 时并行出 3–4 变体（黑底玫红巨字 / 黑白玫红三色构成 / 玫红块反白字）让 TJ 挑，胜出者沉淀成命名样例。

### 3.4 Dowsure 独有元素（注入两套模板）

| 元素 | 规格 |
|---|---|
| 每卡 logo | 右上角，234×34，x758 y98，右缘对齐 992；HTML `img.card-logo`，Figma `createNodeFromSvg` rescale(34/h) |
| 收尾金句竖条 | 3px 玫红，`.closing-line` 的 border-left；**Figma 用独立 `createRectangle`（x88 同 y 高=文字高），不烤底图**；跨卡同 x/y/长度/字号 |
| 页脚页码 | `.deck-foot` margin-top:auto（非 absolute），`NN / 总数` **全卡一致**（封面到尾页），右侧一句 meta |
| 页眉 | 左 `DOWINSIGHTS` 栏目名 + kicker（mono），右 logo |
| 数字格式 | 千位符 + 单位前空格 `$1,000 万`；**软指标（测算/估算）能砍就砍**，留硬事实 |
| 禁孤行 | 任何段落末行 ≥4–5 字；跑 `check-orphans.cjs` 清零；Figma 节点 `loadFontAsync`→`setCharacters` 同步 |

### 3.5 背景系统（禁 WebGL）

- **禁**：WebGL 水墨 / 等高线 / 网格 / 点阵 / blob（TJ 嫌"细胞分裂"）。
- **用**：3 层平滑 —— `--paper` 底 + `.grain`（淡颗粒 opacity .12，4px dot，multiply；暗色版 screen）+ `.atmo`（**右上**玫红径向柔光 + 左下墨晕，hero 更强）。
- 改 guizang style-system 的 "No flat background / 必须 atmosphere" 措辞：Dowsure 的 atmosphere = 颗粒 + 右上柔光（满足"非纯平底"，但不用 WebGL）。

---

## 4. Figma 精准导出管线（Dowsure 独有，覆盖两套）

固定文件 `fileKey = 6XD1W72t7OegPTiyEClwGT`，**绝不 create_new_file**；新一组卡 `figma.createPage()` 建新 page。

流程：`render.cjs`(PNG DSF2) → `figma-export.cjs`(干净底图：文字透明 / logo 隐藏 / 竖条 border-left:0 / layout.json 抽坐标) → `gen-figma-text.cjs`(分块 <50k) → 先加载 `figma:figma-use` → `use_figma` 建命名帧 → `upload_assets` 拿 submitUrl(10min) curl POST 底图 → 分块注入文字（`NONE→resize→HEIGHT`；字体映射 500→Medium / 400→Regular / Noto Serif SC 无斜体→Medium / Playfair italic→Italic）→ `createNodeFromSvg` 贴 logo。

- 脚本**风格无关**（从渲染 DOM 抽坐标），两套模板通用。
- **Editorial 已用 FDE 13 卡验证**；**Swiss 是新接，第一组 Swiss 卡重点验证文字定位**。

---

## 5. 触发收紧

description 改为**只在明确点名时触发**：
- 触发：`用 dowsure-social-card 做…` / `DowInsights 卡片` / `把这篇做成 Dowsure 图文` / `导出 Dowsure Figma 画板`。
- **去掉**会误触发的宽泛词（如裸"生成小红书卡片"、"做成图文"）。

---

## 6. 合规（AGPL-3.0）

- 保留 guizang `LICENSE`（AGPL-3.0 全文）。
- 升级 `NOTICE`：补全量 fork 说明（28 配方 / 两套风格 / 深色变体 / QA 验证器均衍生自 guizang），保留署名致谢。
- 重写 `README.md`：Dowsure 版说明 + 衍生声明。

---

## 7. 分阶段实施路线 + 验收

| 阶段 | 内容 | 验收 |
|---|---|---|
| **P0** | fork guizang 全量进 dowsure；删 WebGL.js + 背景图；合规文件（LICENSE/NOTICE/README） | 文件齐、`node validate-social-deck.mjs` 可跑 |
| **P1** | Editorial 品牌化：style-system / theme-presets(亮+暗) / components / template-editorial / background-systems；注入 logo·竖条·页码·禁孤行 | **FDE 13 卡回归**：重渲染 0 FAIL、目检不退步 |
| **P2** | Swiss 品牌化：S01–S12 玫红化（亮+暗）/ template-swiss；黑×粉撞色 3–4 变体 | 出一组 Swiss 样张目检 + validate 0 FAIL |
| **P3** | Figma 管线扩两套；升级 brand-system / figma-pipeline；layout-recipes 并入 Dowsure 配方 | Editorial + 1 组 Swiss 跑通 Figma，文字定位准 |
| **P4** | 重写 SKILL.md（串两套 + 28 配方 + 铁律 + 工作流）；触发收紧 | 自检 + darwin-skill 评分（可选） |
| **P5** | cp 进 `~/dowsure-social-card` 发布仓 + git push | 发布仓与 live 一致、push 成功 |

---

## 8. 风险与回滚

- **回滚点**：发布仓 d39abe5（残血版干净态）。改坏了从发布仓 cp 回来。
- **P1 风险**：改 Editorial 破坏现有 FDE 效果 → 用 FDE 13 卡做回归基准，逐卡比对。
- **Swiss Figma 风险**：文字定位未验证 → P3 首组 Swiss 重点抽检每帧。
- **工程量**：28 配方 × 两套 × 亮暗 = 大。P1/P2 用并行 subagent 分配方批量改造，主线只保关键回归。
