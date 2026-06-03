# HTML → Figma 精准导出管线

把渲染好的 HTML 卡片组，**精准、可编辑**地搬进 Figma：每张卡 = 烤好的氛围底图（含文章配图、分隔线）+ **原生可编辑文字图层** + 矢量 logo。文字位置由 Playwright 抽取的真实坐标决定，所以「精准」。

需要 Figma MCP（`f82b7486…` 那台，官方 use_figma）。**每次 `use_figma` 前必须先加载 `figma:figma-use` 技能**，并传 `skillNames:"figma-use"`。

## 为什么这么设计

- WebGL/水墨/颗粒/柔光这些**没法做成原生矢量** → 烤进底图（一张图当画板填充）。
- 文章配图（截图/图表）TJ 不会改内部、只可能整张替换 → 也烤进底图。
- 分隔线/账本横线是 CSS border → 也烤进底图。
- **只有文字单独做成原生图层**（TJ 要逐字调的就是文字）。
- logo 用 `createNodeFromSvg` 贴矢量（可无损缩放）。

## 三个脚本（在 `assets/scripts/`）

1. `render.cjs` — 出最终 PNG（DSF 2 → 2160×2880）到 `output/`。改 `TARGETS` 为本次卡片 id。
2. `figma-export.cjs` — 出两样东西到 `figma/`：
   - `layout.json`：每个文字块的精确 `{text,x,y,w,h,fontFamily,fontSize,fontWeight,italic,color,letterSpacing,lineHeight,align,parts}`（`parts` 处理同节点内不同字号/颜色的子段，如 `%` 缩小、玫红 tag）。
   - `bg/<id>.png`：**干净底图** —— 把 `.content` 内文字设成 `color:transparent`（保留 border/背景/配图），并 `visibility:hidden` 掉 `.brandlogo` 和 `.dot`。所以底图 = 纸 + 柔光 + 分隔线 + **文章配图**，无文字、无 logo、无残留圆点。改 `POSTERS` 为本次 id。
3. `gen-figma-text.cjs` — 读 `layout.json`，生成 4 个 `figma/text-chunk-N.js`（紧凑短键 + 通用构建器），**按帧名前缀 `"NN "` 匹配画板**（不依赖 node id）。每块 < 50k 字符（use_figma 上限）。

## 执行顺序

```
1. node render.cjs                 # 最终 PNG
2. node figma-export.cjs           # layout.json + 干净底图
3. node gen-figma-text.cjs         # 4 个 text-chunk
4. create_new_file (design)        # 拿 fileKey（planKey 来自 whoami）
5. use_figma: 建 13 个命名帧        # 名字 "01 · …" … "13 · …"，1080×1440，paper 填充，clipsContent
6. upload_assets ×13 (nodeId 逐帧)  # 拿 submitUrl → curl POST bg/<id>.png（multipart file 字段）
7. use_figma ×4: 注入 text-chunk    # Read 每个 chunk 内容当 code 传入
8. use_figma: createNodeFromSvg     # 贴 logo（见下）
9. use_figma: 截图抽检若干帧         # node.screenshot({scale:0.4}) 内联返回
```

> 迭代同一文件时跳过 4，先删旧帧再建新帧：`for(const f of figma.currentPage.children.slice()){if(f.type==="FRAME")f.remove();}`

## 关键踩坑（都踩过）

- **字体映射**：weight 500→`"Medium"`，400→`"Regular"`；Playfair italic→`"Italic"`。**Noto Serif SC 在 Figma 无斜体** → 斜体标题/引语/金句一律映射成 `Medium`（正体），可接受。每个脚本开头 `loadFontAsync` 预加载用到的全部 (family,style)。
- **mixed 值**：带 `parts` 的节点（`%`、tag）`fontSize`/`fills` 会变 `figma.mixed`(Symbol)。读取时 try/catch 或类型判断；构建时用 `setRangeFontSize` / `setRangeFills` 打子段。
- **文字框**：`textAutoResize="NONE"` → `resize(w,h)` → 再 `textAutoResize="HEIGHT"`（固定宽、自动高，换行和 HTML 一致、不裁切）。
- **删节点别边遍历边删**：先 `findAllWithCriteria` 收集进数组，循环结束后再 `t.remove()`；否则报 "node … does not exist"（脚本原子回滚）。
- **底图重传会替换填充**（不是叠加），`coverFills` 仍为 1。改了 HTML（删元素/换结构）记得重跑 `figma-export.cjs` 再重传对应底图——否则旧元素（如分隔圆点）会留在底图里。
- **upload_assets**：返回 `submitUrl`，用 `curl -F "file=@bg/<id>.png" "<submitUrl>"`，带 `nodeId` 会自动设成该帧填充并返回 `placedOnNodeId`。链接 10 分钟过期，拿齐就尽快 POST。
- **脚本无文件系统访问**：use_figma 的 `code` 只能内联，没法读盘 → chunk 内容要 Read 出来再当 `code` 传。
- **原子失败**：use_figma 报错=整段不执行、无副作用。读错误→改→重试，别盲目重跑。

## Logo 贴法

```js
const SVG = `<svg …dowsure-logo.svg 全文…>`;
const f = await figma.getNodeByIdAsync(FRAME_ID);
const l = figma.createNodeFromSvg(SVG);
f.appendChild(l);
l.name = "Dowsure logo";
l.rescale(34 / l.height);            // 目标高 34（TJ 偏好：每卡右上角小 logo）
l.x = 1080 - 88 - l.width;           // 右缘对齐 992
l.y = 98;
```

**每张卡都贴**（不只封面/尾页）。SVG 是纯路径（玫红盾 `#E31860` + 黑字标），无 `<text>`，不需要字体。

## 帧名 ↔ 底图 ↔ chunk 的对应

帧名 `"NN · 标题"`，构建器用 `f.name.slice(0,2)===("0"+i 补零)` 匹配。底图文件名 `xhs-NN-<slug>.png` 与 `POSTERS` 顺序一致。`gen-figma-text.cjs` 的 `ORDER` 必须和 `render.cjs`/`figma-export.cjs` 的 id 顺序完全一致。

完整可跑样例见 `assets/example/`（FDE 13 卡的 `example-deck.html` + `example-layout.json`）。
