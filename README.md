# dowsure-social-card

> 把 **Dowsure(豆沙包)** 的文章 / 飞书文档，转成 **DowInsights 风格小红书图文卡片组**，并**精准导出成可编辑的 Figma 画板**。
> 两套视觉系统 · 亮/暗 4 主题 · Dowsure 品牌玫红 `#F40064`。

这是一个 Claude Code 插件（含一个同名 Skill）。**100% fork 自 [Guizang 老师的 `guizang-social-card-skill`](https://github.com/op7418/guizang-social-card-skill) (AGPL-3.0)**，在其完整设计系统之上叠加 Dowsure 品牌系统 + HTML→Figma 精准导出管线。

---

## 安装

```bash
/plugin marketplace add SunTuanJiehhh/dowsure-social-card
/plugin install dowsure-social-card@dowsure-social-card
```

触发（仅在明确点名 Dowsure 时）：

> 用 dowsure-social-card 把这篇飞书稿做成小红书卡片：<飞书链接>
>
> DowInsights 卡片：<文章/链接>

---

## 它做什么

| 输入 | 输出 |
|------|------|
| 飞书文档 / 文章 / DowInsights 洞察（+ 可选本地配图） | 8–14 张 3:4 小红书卡片（PNG）+ 一套可编辑 Figma 画板 |

### 两套视觉系统（28 基础配方 + Dowsure 10 快捷配方 = 38）

- **Editorial 杂志风**（M01–M16，16 配方）—— 叙事 / 行业洞察 / 杂志感。
- **Swiss 国际主义**（S01–S12，12 配方）—— 数据 / 产品 / 方法论（FastPay / 跨商贷数据卡）。
- **Dowsure R1–R10** —— 封面 / 证据墙 / 大数字 / 大引语 / 账本 / 边注 / 对子 / 双栏对比 / 标签行 / 收尾。

### 亮/暗 4 主题（品牌玫红锁定）

`dowsure`（白底） · `dowsure-dark`（黑×玫红） · `dowsure-swiss`（白底） · `dowsure-swiss-dark`（黑×玫红 · 金融终端感）。

### Dowsure 品牌

品牌玫红 `#F40064`、白底干净背景（无 WebGL）、右上柔光、每卡 logo、收尾金句 3px 玫红竖条、页码全卡一致、禁孤行。

### Figma 精准导出

每张卡 = 烤好的氛围底图 + **原生可编辑文字图层** + 矢量 logo，逐字可调。Editorial / Swiss 两套通用，固定写进同一个 Figma 文件。

---

## 目录

```
skills/dowsure-social-card/
  SKILL.md                  主入口：两套系统 + 工作流 + 铁律
  references/               18 个（guizang 15 全量 + Dowsure 3）
    brand-system.md         Dowsure 品牌系统（两套 + 深色，精确值）
    figma-pipeline.md       HTML→Figma 全管线 + 踩坑
    card-recipes.md         Dowsure 配方速查
    layout-recipes.md       28 guizang + 10 Dowsure = 38 配方
    style-system / components / theme-presets / category-cookbook / ...（guizang 完整能力）
  assets/
    template-dowsure-editorial.html   Dowsure-Editorial 模板（默认）
    template-dowsure-swiss.html       Dowsure-Swiss 模板（默认）
    template-editorial-card.html      guizang 原模板（100% 克隆存档）
    template-swiss-card.html          guizang 原模板（100% 克隆存档）
    dowsure-logo.svg / scripts/ / example/（FDE 13 卡工作样例）
  docs/                     设计 spec + guizang 上游归档
```

## 依赖

- Playwright（渲染 PNG / 抽取几何）
- Figma MCP（官方 `use_figma`，导出可编辑画板时）
- `lark-cli`（读飞书文档，可选）

---

## 致谢 & 协议 / Credit & License

本作品 **100% fork 自 Guizang 老师的 [`guizang-social-card-skill`](https://github.com/op7418/guizang-social-card-skill)**，原作以 **AGPL-3.0** 发布。完整保留其 28 配方 / 两套视觉系统 / 组件系统 / QA 验证器 / 11 类小红书品类等全部能力，在其之上叠加 Dowsure 品牌系统、深色变体与 Figma 精准导出管线。

按 AGPL-3.0 要求，本衍生作品同样采用 **AGPL-3.0**，并保留对 Guizang 老师的署名与致谢。详见 [`LICENSE`](./LICENSE) 与 [`NOTICE`](./NOTICE)。

感谢 Guizang 老师的开源工作。🙏
