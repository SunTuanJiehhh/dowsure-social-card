# HTML → Figma 精准导出管线

把渲染好的 HTML 卡片组，**精准、可编辑**地搬进 Figma：每张卡 = 烤好的氛围底图（含文章配图、分隔线）+ **原生可编辑文字图层** + 矢量 logo。文字位置由 Playwright 抽取的真实坐标决定，所以「精准」。

需要 Figma MCP（`f82b7486…` 那台，官方 use_figma）。**每次 `use_figma` 前必须先加载 `figma:figma-use` 技能**，并传 `skillNames:"figma-use"`。

> **覆盖两套模板：Editorial 与 Swiss 都走这同一条管线。** 脚本**风格无关**——`figma-export.cjs` 从渲染好的 DOM 抽真实坐标，不关心是杂志风还是 Swiss 风，所以 `template-dowsure-editorial.html`（Editorial 亮 / 暗）和 Swiss 模板（`dowsure-swiss` / `dowsure-swiss-dark`）共用整套流程、脚本不分叉。亮 / 暗也只是 token 不同，底图照样烤、坐标照样抽。
>
> - **Editorial 已用 FDE 13 卡跑通验证**（样例见 `assets/example/`），是成熟接。
> - **Swiss 是新接**：第一组 Swiss 卡要**逐帧重点抽检文字定位**（Swiss 块面密、对齐严，错位更显眼）。首组验证通过后即与 Editorial 同等可靠。

## 为什么这么设计

- WebGL/水墨/颗粒/柔光这些**没法做成原生矢量** → 烤进底图（一张图当画板填充）。
- 文章配图（截图/图表）TJ 不会改内部、只可能整张替换 → 也烤进底图。
- 分隔线/账本横线是 CSS border → 也烤进底图。
- **只有文字单独做成原生图层**（TJ 要逐字调的就是文字）。
- logo 用 `createNodeFromSvg` 贴矢量（可无损缩放）。
- **Swiss 同理**：Swiss 的灰块（`--grey-1` 面板）、发丝线（`--grey-2` border）、玫红横条 / 块都是 CSS 背景或 border → 一并烤进底图；Swiss 卡里需要逐字调的还是只有文字。所以同一条管线、同一套脚本，Editorial / Swiss / 亮 / 暗全适用，无需为 Swiss 改脚本。

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
4. ★ 固定文件 fileKey = 6XD1W72t7OegPTiyEClwGT   # 【铁律】绝不 create_new_file！所有 Dowsure 卡（两套全部主题）都进这一个文件
     新一组卡 → use_figma: `figma.createPage()` 建新 page（按主题命名，如 "Dowsure-Swiss · <文章>"）→ `setCurrentPageAsync` 切过去
     # Editorial 与 Swiss 各自建 page 归档，互不干扰；fileKey 永远是上面这个，不随主题/明暗变。
5. use_figma: 建命名帧              # 名字 "01 · …" … "NN · …"，1080×1440，白底填充，clipsContent
6. upload_assets ×13 (nodeId 逐帧)  # 拿 submitUrl → curl POST bg/<id>.png（multipart file 字段）
7. use_figma ×4: 注入 text-chunk    # Read 每个 chunk 内容当 code 传入
8. use_figma: createNodeFromSvg     # 贴 logo（见下）
9. use_figma: 截图抽检若干帧         # node.screenshot({scale:0.4}) 内联返回
```

> **重做同一组卡**：在该组的 page 上先删旧帧再建新帧：`for(const f of figma.currentPage.children.slice()){if(f.type==="FRAME")f.remove();}`。**换新主题/新文章**：新建一个 page，别动别的 page（一文件多 page，按主题归档）。

## 关键踩坑（都踩过）

- **字体映射**：weight 500→`"Medium"`，400→`"Regular"`；Playfair italic→`"Italic"`。**Noto Serif SC 在 Figma 无斜体** → 斜体标题/引语/金句一律映射成 `Medium`（正体），可接受。每个脚本开头 `loadFontAsync` 预加载用到的全部 (family,style)。
- **mixed 值**：带 `parts` 的节点（`%`、tag）`fontSize`/`fills` 会变 `figma.mixed`(Symbol)。读取时 try/catch 或类型判断；构建时用 `setRangeFontSize` / `setRangeFills` 打子段。
- **文字框**：`textAutoResize="NONE"` → `resize(w,h)` → 再 `textAutoResize="HEIGHT"`（固定宽、自动高，换行和 HTML 一致、不裁切）。
- **删节点别边遍历边删**：先 `findAllWithCriteria` 收集进数组，循环结束后再 `t.remove()`；否则报 "node … does not exist"（脚本原子回滚）。
- **底图重传会替换填充**（不是叠加），`coverFills` 仍为 1。改了 HTML（删元素/换结构）记得重跑 `figma-export.cjs` 再重传对应底图——否则旧元素（如分隔圆点）会留在底图里。
- **改文案（消孤行/换词）→ Figma 文字节点要同步**：`loadFontAsync` → `node.characters = 新文案`（按旧文案前缀在帧内找到那个 TEXT 节点）。底图不用动（文字本就透明）。光改 HTML 不同步 Figma，Figma 里仍是旧孤行。
- **收尾竖条别烤进底图**：`figma-export.cjs` 给 bg 注入 `.poster .closing-line{border-left:0}`，竖条改用 Figma 独立 `createRectangle`（3px、同 x88 / 同 y / 高=文字高），4 张完全一致、跨卡对齐。烤进底图会随文字移动错位（TJ 反复指出的「定位不准」根因）。
- **upload_assets**：返回 `submitUrl`，用 `curl -F "file=@bg/<id>.png" "<submitUrl>"`（multipart `file` 字段）。链接 10 分钟过期，拿齐尽快 POST。
  - ⚠️ **`nodeId` 自动 place 不一定生效（已踩）**：curl 返回 `{success,imageHash}` 看似成功，但帧 `fills` 可能仍是建帧时的白底 SOLID，把底图盖住、配图不显示（截图中部一片白）。**稳妥做法**：curl 时顺手解析 imageHash（`curl … | grep -o '"imageHash":"[^"]*"' | cut -d'"' -f4`），再用 `use_figma` 手动设填充 `frame.fills=[{type:"IMAGE",imageHash,scaleMode:"FILL"}]`；最后 `use_figma` 读一遍各帧 `fills`，确认**都含 IMAGE**（`f.fills.map(p=>p.type)`）再收工。
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

## 两套模板的 Figma 差异（脚本不变，只是字体表 / 验证重点不同）

管线本身两套通用（脚本从 DOM 抽坐标，风格无关）。差异只在两处：用到的字体 (family,style) 集合不同、Swiss 是首接要重点验证。

### 字体映射（在原有「关键踩坑 · 字体映射」基础上补 Swiss 的 sans 系）

> 原则不变：`figma-export.cjs` 抽出的 `fontFamily` + `fontWeight` + `italic` → 映射到 Figma 的 (family, style)；每个脚本开头 `loadFontAsync` 预加载**用到的全部** (family,style)，漏一个就报错原子回滚。

| 角色 | 字体 | weight/italic | Figma style |
|---|---|---|---|
| **Editorial** 标题 / 正文 serif | Noto Serif SC | 500 | `Medium` |
| | Noto Serif SC | 400 | `Regular` |
| | Noto Serif SC | **斜体**（pullquote / 金句 / callout） | **`Medium`**（思源宋在 Figma **无斜体** → 退正体，可接受） |
| | Playfair Display | italic | `Italic` |
| **Swiss** 标题 / 大字 sans | Noto Sans SC | 300（the larger the lighter 的细字重） | `Light` |
| | Noto Sans SC | 400 | `Regular` |
| | Noto Sans SC | 500 | `Medium` |
| | Noto Sans SC | 700 | `Bold` |
| **两套** mono（kicker / meta / 页码 / 数字标注） | IBM Plex Mono | 400 / 500 | `Regular` / `Medium` |
| **Swiss** 英文 / 数字（视模板） | Inter | 300 / 400 / 500 / 700 | `Light` / `Regular` / `Medium` / `Bold` |

- **Swiss 大字常用 300/Light**（越大越细），别漏 `loadFontAsync(("Noto Sans SC","Light"))` 和 `(("Inter","Light"))`。
- Swiss 玫红块上的反白字：颜色在 `layout.json` 里就是白，正常注入即可，无需特殊处理。

### 文字框 / mixed / 删节点 等通用踩坑

这些**两套完全一致**（已在上面「关键踩坑」列全）：`textAutoResize` 走 `NONE → resize(w,h) → HEIGHT`；带 `parts` 的节点 `fontSize`/`fills` 变 `figma.mixed` 要 try/catch + `setRangeFontSize`/`setRangeFills`；删节点先收集进数组再删；底图重传是替换不是叠加；**收尾竖条不烤底图**（`figma-export.cjs` 注入 `.closing-line{border-left:0}`，Figma 里用独立 `createRectangle` 3px 玫红 / 同 x88 / 同 y / 高=文字高，跨卡对齐）；`upload_assets` 的 `submitUrl` **10 分钟过期**，拿齐尽快 `curl -F "file=@bg/<id>.png"` POST。

### ★ Swiss 首接验证清单（第一组 Swiss 卡必跑）

Editorial 已过 FDE 13 卡，可靠；Swiss 是新接，首组逐帧抽检以下点，全过后即同等可靠：

1. **文字定位**：每帧 `node.screenshot({scale:0.4})` 内联返回，肉眼比对 PNG —— Swiss 块面密、对齐严，重点看玫红块 / 发丝线旁的文字有没有错位、有没有压线。
2. **细字重**：300/Light 的大标题有没有正确加载（漏加载会 fallback 成 Regular 变粗，一眼能看出）。
3. **玫红块反白字**：`--accent-on:#fff` 的白字在玫红块上是否注入正确（别变黑字）。
4. **logo**：黑底版 `dowsure-swiss-dark` 上 logo（玫红盾 + 黑字标）的黑字标会"消失"在黑底里 —— 确认 SVG 在暗底卡是否需要换浅色字标版本（首组发现就记下来，沉淀成暗底专用 logo 资产）。
5. **页码 / 收尾竖条**：与 Editorial 同规格，确认 `NN / 总数` 全卡一致、竖条是独立矢量条没烤底图。
