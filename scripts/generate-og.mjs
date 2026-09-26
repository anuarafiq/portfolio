// Renders public/og-image.png (1200x630), the link-preview image for every page.
// Run with `npm run gen-og` after changing the name, tagline, or palette.
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
const warm = "#9c9080"
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

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${paper}"/>
  <text x="72" y="96" ${mono} fill="${rust}">00. HELLO</text>
  <text x="72" y="250" font-family="Cormorant Garamond" font-weight="300" font-size="148" letter-spacing="-4" fill="${ink}">Anuar Afiq</text>
  <text x="76" y="328" ${mono} fill="${warm}">CS MAJOR · AI / ML FOCUS · UNIVERSITI TEKNOLOGI PETRONAS</text>
  <line x1="72" y1="362" x2="1128" y2="362" stroke="${line}" stroke-width="1"/>
  <g transform="translate(72 382) scale(0.88)">
    <g fill="none" stroke="${ink}" stroke-width="1.2">
      ${edges.map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`).join("")}
    </g>
    <g fill="${ink}">
      ${nodes.map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}"/>`).join("")}
    </g>
  </g>
  <text x="72" y="574" ${mono} fill="${warm}">FIG. 01 · NETWORK STUDY</text>
  <text x="1128" y="574" ${mono} fill="${rust}" text-anchor="end">ANUARAFIQ.ME</text>
</svg>`

const png = new Resvg(svg, {
  font: {
    fontFiles: [join(FONTS, "CormorantGaramond-Light.ttf"), join(FONTS, "IBMPlexMono-Regular.ttf")],
    loadSystemFonts: false,
    defaultFontFamily: "IBM Plex Mono",
  },
}).render().asPng()

writeFileSync(OUT, png)
console.log(`og-image.png written (${png.length} bytes)`)
