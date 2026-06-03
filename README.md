# dowsure-social-card

> 把 **Dowsure(豆沙包)** 的文章 / 飞书文档，转成 **DowInsights 风格小红书图文卡片组**，并**精准导出成可编辑的 Figma 画板**。
> Editorial 杂志 × 水墨风 + Dowsure 品牌玫红 `#F40064`。

这是一个 Claude Code 插件（含一个同名 Skill）。基于 **Guizang 老师的 [`guizang-social-card-skill`](https://github.com/) (AGPL-3.0)** 衍生开发。

---

## 安装（在任意 Claude Code 上）

```bash
# 1. 添加这个 marketplace
/plugin marketplace add SunTuanJiehhh/dowsure-social-card

# 2. 安装插件
/plugin install dowsure-social-card@dowsure-social-card
```

安装后，跟 Claude 说一句就会触发，例如：

> 用 dowsure-social-card 把这篇飞书稿做成小红书卡片：<飞书链接>

或：

> DowInsights 卡片：<文章/链接>

---

## 它做什么

| 输入 | 输出 |
|------|------|
| 飞书文档 / 文章 / DowInsights 洞察（+ 可选本地配图） | 8–14 张 3:4 小红书卡片（PNG）+ 一套可编辑 Figma 画板 |

- **视觉**：Editorial 杂志风 + 品牌玫红 `#F40064`、白底干净背景、每卡 logo、数据/账本/大引语等 10 种配方。
- **Figma**：每张卡 = 烤好的氛围底图 + **原生可编辑文字图层** + 矢量 logo，逐字可调。
- **工作流**：飞书取稿 → 拆页 → 品牌 HTML → 渲染 → 精准导出 Figma。

## 目录

```
skills/dowsure-social-card/
  SKILL.md                  主入口：工作流 + 铁律
  references/
    brand-system.md         Dowsure 品牌系统 + 排版偏好（精确值）
    card-recipes.md         10 种卡片配方
    figma-pipeline.md       HTML→Figma 全管线 + 踩坑点
  assets/
    dowsure-logo.svg        矢量 logo
    scripts/                render / figma-export / gen-figma-text（可复用引擎）
    example/                完整工作样例（FDE 13 卡）+ layout.json
```

## 依赖

- Playwright（渲染 PNG / 抽取几何）
- Figma MCP（官方 `use_figma`，导出可编辑画板时）
- `lark-cli`（读飞书文档，可选）

---

## 致谢 & 协议 / Credit & License

本作品**基于 Guizang 老师的 `guizang-social-card-skill`** 衍生开发，原作以 **AGPL-3.0** 发布。
按 AGPL-3.0 要求，本衍生作品同样采用 **AGPL-3.0**，并保留对 Guizang 老师的署名与致谢。
详见 [`LICENSE`](./LICENSE) 与 [`NOTICE`](./NOTICE)。

感谢 Guizang 老师的开源工作。🙏
