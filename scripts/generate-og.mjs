// Renders link-preview images (1200x630). Run directly (`npm run gen-og`) it writes
// public/og-image.png, the default for every page; after changing the name, tagline,
// or palette. prerender.mjs imports renderOg to make one image per project and note.
import { writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { Resvg } from "@resvg/resvg-js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const FONTS = join(__dirname, "fonts")
const OUT = join(__dirname, "../public/og-image.png")

// Light palette from src/index.css
const ink = "#1a1208"
const paper = "#f4efe8"
const rust = "#355f82"
const warm = "#6f665b"
const line = "#d4cdb8"

// Same node-graph motif as the home page hero (src/pages/Home.jsx), 1200x220 space
const edges = [
  [120, 110, 220, 60], [120, 110, 220, 160], [220, 60, 340, 40], [220, 60, 340, 110],
  [220, 160, 340, 110], [220, 160, 340, 180], [340, 40, 460, 70], [340, 110, 460, 70],
  [340, 110, 460, 150], [340, 180, 460, 150], [460, 70, 580, 110], [460, 150, 580, 110],
  [580, 110, 700, 60], [580, 110, 700, 160], [700, 60, 820, 110], [700, 160, 820, 110],
  [820, 110, 940, 40], [820, 110, 940, 180], [940, 40, 1060, 110], [940, 180, 1060, 110],
]
const nodes = [
  [120, 110, 5], [220, 60, 3], [220, 160, 3], [340, 40, 4], [340, 110, 6], [340, 180, 4],
  [460, 70, 3], [460, 150, 3], [580, 110, 5], [700, 60, 3], [700, 160, 3], [820, 110, 6],
  [940, 40, 3], [940, 180, 3], [1060, 110, 5],
]

const mono = `font-family="IBM Plex Mono" font-size="18" letter-spacing="3"`
const fonts = {
  fontFiles: [join(FONTS, "CormorantGaramond-Light.ttf"), join(FONTS, "IBMPlexMono-Regular.ttf")],
  loadSystemFonts: false,
  defaultFontFamily: "IBM Plex Mono",
}

const esc = (v) => String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")
const serif = (size) => `font-family="Cormorant Garamond" font-weight="300" font-size="${size}" letter-spacing="${(-size * 0.027).toFixed(1)}"`

// Real rendered width of a title line, so fitting does not depend on a per-character guess
function measure(text, size) {
  const probe = `<svg xmlns="http://www.w3.org/2000/svg" width="3000" height="400"><text x="0" y="200" ${serif(size)}>${esc(text)}</text></svg>`
  return new Resvg(probe, { font: fonts }).getBBox().width
}

const MAX_W = 1056 // 72px margins inside 1200

// One line at up to 148px; else two lines (best word split) at up to 112px; shrinks until it fits
function layoutTitle(title) {
  for (let size = 148; size >= 96; size -= 4) {
    if (measure(title, size) <= MAX_W) return { size, lines: [title], ys: [250] }
  }
  const words = title.split(" ")
  let best = null
  for (let i = 1; i < words.length; i++) {
    const lines = [words.slice(0, i).join(" "), words.slice(i).join(" ")]
    const widest = Math.max(...lines.map((l) => measure(l, 100)))
    if (!best || widest < best.widest) best = { lines, widest }
  }
  const lines = best?.lines ?? [title]
  for (let size = 112; size >= 56; size -= 4) {
    if (Math.max(...lines.map((l) => measure(l, size))) <= MAX_W) {
      return { size, lines, ys: [205, 205 + Math.round(size * 0.92)] }
    }
  }
  return { size: 56, lines, ys: [205, 257] }
}

// sub: optional mono line under the title (the default image only)
export function renderOg({ label, title, footer, sub }) {
  const { size, lines, ys } = layoutTitle(title)
  const titleSvg = lines
    .map((l, i) => `<text x="72" y="${ys[i]}" ${serif(size)} fill="${ink}">${esc(l)}</text>`)
    .join("\n  ")
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${paper}"/>
  <text x="72" y="96" ${mono} fill="${rust}">${esc(label)}</text>
  ${titleSvg}
  ${sub ? `<text x="76" y="328" ${mono} fill="${warm}">${esc(sub)}</text>` : ""}
  <line x1="72" y1="362" x2="1128" y2="362" stroke="${line}" stroke-width="1"/>
  <g transform="translate(72 382) scale(0.88)">
    <g fill="none" stroke="${ink}" stroke-width="1.2">
      ${edges.map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`).join("")}
    </g>
    <g fill="${ink}">
      ${nodes.map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`).join("")}
    </g>
  </g>
  <text x="72" y="574" ${mono} fill="${warm}">${esc(footer)}</text>
  <text x="1128" y="574" ${mono} fill="${rust}" text-anchor="end">ANUARAFIQ.ME</text>
</svg>`
  return new Resvg(svg, { font: fonts }).render().asPng()
}

// Only write the default image when run directly, so importing renderOg has no side effect
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const png = renderOg({
    label: "00. HELLO",
    title: "Anuar Afiq",
    sub: "CS MAJOR · AI / ML FOCUS · UNIVERSITI TEKNOLOGI PETRONAS",
    footer: "FIG. 01 · NETWORK STUDY",
  })
  writeFileSync(OUT, png)
  console.log(`og-image.png written (${png.length} bytes)`)
}
