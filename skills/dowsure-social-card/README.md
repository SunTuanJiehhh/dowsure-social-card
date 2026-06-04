# dowsure-social-card

> 把 **Dowsure(豆沙包)** 的文章 / 飞书文档，做成 **DowInsights 风格小红书图文卡片组（3:4）**，并**精准导出成可编辑的 Figma 画板**。
> 两套视觉系统 + Dowsure 品牌玫红 `#F40064`。

这是 **Guizang 老师 [`guizang-social-card-skill`](https://github.com/) (AGPL-3.0) 的全量 fork**：整套排版大脑原样保留，叠加 Dowsure 品牌皮肤。

---

## 两套视觉系统

| 系统 | 气质 | 选它当… | 配方 |
|------|------|---------|------|
| **Editorial 杂志 × 水墨** | 叙事 / 洞察 / 杂志感 | 行业洞察、商业评论、来历随笔、引语换气 | M01–M16（16）+ Dowsure R1–R10 |
| **Swiss International** | 数据 / 产品 / 方法论 | FastPay / 跨商贷数据卡、KPI、对比、流程 | S01–S12（12） |

- **Dowsure 4 主题**：`dowsure`（Editorial 亮，默认）/ `dowsure-dark`（Editorial 暗）/ `dowsure-swiss`（Swiss 亮）/ `dowsure-swiss-dark`（Swiss 暗）。玫红锁定，暗色用于封面黑×玫红强冲击。
- **全量 fork 能力**（按需下钻）：11 类小红书品类路由、截图处理、图上叠字、肖像填充、地图组件、标题压缩、WeChat 封面对、QA 验证器——都在 `references/`。

## 用法（触发词）

仅在**明确点名 Dowsure 卡片任务**时触发（裸"生成小红书卡片"不触发，那会路由给 `guizang-social-card-skill`）。例如：

> 用 dowsure-social-card 把这篇飞书稿做成小红书卡片：<飞书链接>

> DowInsights 卡片：<文章 / 链接>

> 把这篇做成 Dowsure 图文 / FastPay 数据卡 / 导出 Dowsure Figma 画板

## 它做什么

| 输入 | 输出 |
|------|------|
| 飞书文档 / 文章 / DowInsights 洞察（+ 可选本地配图） | 8–14 张 3:4 小红书卡片（PNG，retina 2160×2880）+ 一套可编辑 Figma 画板 |

- **视觉**：品牌玫红 `#F40064`、白底干净背景（禁 WebGL）、每卡 logo、两套排版系统共 28 基础配方。
- **Figma**：每张卡 = 烤好的氛围底图 + **原生可编辑文字图层** + 矢量 logo，逐字可调；所有卡进固定文件，按主题分 page 归档。
- **工作流**：飞书取稿 → 选系统 + 拆页（先确认）→ 品牌 HTML → 渲染 + validate → 精准导出 Figma。

## 目录

```
dowsure-social-card/
  SKILL.md                          主入口：两套系统 + 配方 + 铁律 + 工作流
  references/
    brand-system.md                 ⭐ Dowsure 品牌铁律 + 排版偏好（精确值）
    card-recipes.md                 ⭐ Dowsure 10 配方 R1–R10 速查
    figma-pipeline.md               ⭐ HTML→Figma 全管线 + 踩坑点（两套通用）
    layout-recipes.md               M01–M16 + S01–S12 + R1–R10 全量配方
    style-system / theme-presets / components / background-systems …  guizang fork（15）
    category-cookbook / screenshot-treatment / image-overlay / portrait-fill / map-component / title-shortener …  下钻库
  assets/
    template-dowsure-editorial.html  Editorial 默认模板
    template-dowsure-swiss.html      Swiss 默认模板
    template-editorial-card.html / template-swiss-card.html  guizang 原模板（克隆存档）
    dowsure-logo.svg                 矢量 logo
    scripts/                         render / figma-export / gen-figma-text / check-orphans
    example/                         完整工作样例（FDE 13 卡）+ layout.json
  validate-social-deck.mjs           QA 验证器（R1–R7）
```

## 依赖

- Playwright（渲染 PNG / 抽取几何）
- Figma MCP（官方 `use_figma`，导出可编辑画板时；前置加载 `figma:figma-use`）
- `lark-cli`（读飞书文档，可选）

---

## 致谢 & 协议 / Credit & License

本作品是 **Guizang 老师 `guizang-social-card-skill` 的全量 fork 衍生作品**，原作以 **AGPL-3.0** 发布。
按 AGPL-3.0 要求，本衍生作品同样采用 **AGPL-3.0**，并保留对 Guizang 老师的署名与致谢。
两套视觉系统、28 配方、QA 验证器、11 品类路由、截图 / 肖像 / 地图等组件均衍生自上游；Dowsure 新增品牌系统、Figma 管线、飞书工作流、深色变体。详见 [`LICENSE`](./LICENSE) 与 [`NOTICE`](./NOTICE)。

感谢 Guizang 老师的开源工作。🙏
