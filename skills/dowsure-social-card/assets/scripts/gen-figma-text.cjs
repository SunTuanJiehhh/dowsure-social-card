/* Generate use_figma builder code chunks from layout.json.
   Frames are matched by name prefix "NN " so we don't need node IDs.
   Writes figma/text-chunk-1.js .. text-chunk-4.js */
const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const layout = JSON.parse(fs.readFileSync(path.join(DIR, "figma", "layout.json"), "utf8"));

const ORDER = [
  "xhs-01-cover", "xhs-02-surge", "xhs-03-whatis", "xhs-04-identity", "xhs-05-gap",
  "xhs-06-quote", "xhs-07-palantir", "xhs-08-gravel", "xhs-09-china",
  "xhs-10-crossborder", "xhs-11-fastpay", "xhs-12-paradigm", "xhs-13-closing",
];

// compact a node to short keys
function pack(nd) {
  const o = { t: nd.text, x: nd.x, y: nd.y, w: nd.w, h: nd.h, ff: nd.fontFamily,
    fs: nd.fontSize, fw: nd.fontWeight, it: nd.italic ? 1 : 0, c: nd.color,
    ls: nd.letterSpacing, lh: nd.lineHeight, al: nd.align };
  if (nd.parts) o.p = nd.parts.map(p => p.br ? { br: 1 } : { t: p.text, s: p.size, c: p.color });
  return o;
}

const HELPERS = `
function hexRgb(h){const n=parseInt(h.slice(1),16);return{r:((n>>16)&255)/255,g:((n>>8)&255)/255,b:(n&255)/255};}
function styleFor(ff,w,it){if(ff==="Playfair Display")return it?"Italic":(w>=500?"Medium":"Regular");return w>=500?"Medium":"Regular";}
async function build(FRAMES){
  const fset=new Set();
  for(const F of FRAMES)for(const nd of F.nodes)fset.add(nd.ff+"|"+styleFor(nd.ff,nd.fw,nd.it));
  for(const k of fset){const a=k.split("|");await figma.loadFontAsync({family:a[0],style:a[1]});}
  let total=0;
  for(const F of FRAMES){
    const frame=figma.currentPage.children.find(f=>f.name&&f.name.slice(0,2)===F.num);
    if(!frame){continue;}
    for(const nd of F.nodes){
      const t=figma.createText();frame.appendChild(t);
      t.fontName={family:nd.ff,style:styleFor(nd.ff,nd.fw,nd.it)};
      let ranges=null;
      if(nd.p){let chars="";ranges=[];for(const p of nd.p){if(p.br){chars+="\\n";continue;}const s=chars.length;chars+=p.t;ranges.push({s:s,e:chars.length,size:p.s,color:p.c});}t.characters=chars;}
      else t.characters=nd.t;
      t.fontSize=nd.fs;
      t.textAlignHorizontal=nd.al==="center"?"CENTER":(nd.al==="end"||nd.al==="right")?"RIGHT":"LEFT";
      t.lineHeight={unit:"PIXELS",value:nd.lh};
      t.letterSpacing={unit:"PIXELS",value:nd.ls};
      t.fills=[{type:"SOLID",color:hexRgb(nd.c)}];
      t.textAutoResize="NONE";t.resize(nd.w,nd.h);t.textAutoResize="HEIGHT";
      t.x=nd.x;t.y=nd.y;
      if(ranges)for(const r of ranges){if(r.size)t.setRangeFontSize(r.s,r.e,r.size);if(r.color)t.setRangeFills(r.s,r.e,[{type:"SOLID",color:hexRgb(r.color)}]);}
      total++;
    }
  }
  return total;
}`;

const CHUNKS = [[0, 3], [3, 6], [6, 9], [9, 13]]; // frame index ranges
CHUNKS.forEach((rng, ci) => {
  const frames = [];
  for (let i = rng[0]; i < rng[1]; i++) {
    const id = ORDER[i];
    const num = String(i + 1).padStart(2, "0");
    const nodes = (layout[id].nodes || []).map(pack);
    frames.push({ num, nodes });
  }
  const code = `const FRAMES=${JSON.stringify(frames)};\n${HELPERS}\nconst total=await build(FRAMES);\nreturn {chunk:${ci + 1},total};`;
  fs.writeFileSync(path.join(DIR, "figma", `text-chunk-${ci + 1}.js`), code);
  console.log(`chunk ${ci + 1}: frames ${rng[0] + 1}-${rng[1]} · ${frames.reduce((a, f) => a + f.nodes.length, 0)} nodes · ${code.length} chars`);
});
