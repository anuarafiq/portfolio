// Checks the output of scripts/prerender.mjs. Run after `npm run build`:
//   node scripts/check-prerender.mjs
import assert from "assert/strict"
import { createHash } from "crypto"
import { readFileSync, readdirSync, existsSync } from "fs"
import { join, dirname, basename } from "path"
import { fileURLToPath } from "url"
import { renderRoute } from "./prerender.mjs"
import { pageMeta } from "../src/data/meta.js"
import { projects } from "../src/data/projects.js"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const dist = join(root, "dist")
const read = (...p) => readFileSync(join(...p), "utf-8")
const htmlFor = (path) => read(dist, path === "/" ? "" : path, "index.html")
const titleOf = (html) => html.match(/<title>([^<]*)<\/title>/)[1]

const postSlugs = readdirSync(join(root, "src/content/blog")).filter((f) => f.endsWith(".mdx")).map((f) => basename(f, ".mdx"))
const paths = [
  ...Object.keys(pageMeta),
  ...projects.map((p) => `/projects/${p.slug}`),
  ...postSlugs.map((s) => `/notes/${s}`),
]

// 1. Every route has its own HTML with the right title; canonical only off the root
for (const [path, meta] of Object.entries(pageMeta)) assert.equal(titleOf(htmlFor(path)), meta.title, path)
for (const p of projects) assert.equal(titleOf(htmlFor(`/projects/${p.slug}`)), `${p.title} - Anuar Afiq`, p.slug)
for (const s of postSlugs) {
  const html = htmlFor(`/notes/${s}`)
  assert.match(html, /<meta property="og:type" content="article"/, s)
  assert.match(html, new RegExp(`<link rel="canonical" href="https://anuarafiq.me/notes/${s}"`), s)
}
assert.doesNotMatch(htmlFor("/"), /rel="canonical"/, "root must stay canonical-free (it is the SPA fallback)")

// 2. Sitemap lists exactly the routes
const locs = [...read(dist, "sitemap.xml").matchAll(/<loc>https:\/\/anuarafiq\.me([^<]*)<\/loc>/g)].map((m) => m[1])
assert.deepEqual(locs.sort(), [...paths].sort(), "sitemap routes")
assert.ok(!existsSync(join(root, "public/sitemap.xml")), "public/sitemap.xml would shadow the generated one")

// 3. Inline theme script in every emitted page matches the CSP hash in vercel.json
const csp = JSON.parse(read(root, "vercel.json")).headers[0].headers.find((h) => h.key === "Content-Security-Policy").value
const allowed = csp.match(/'sha256-([^']+)'/)[1]
for (const path of paths) {
  const inline = htmlFor(path).match(/<script>([\s\S]*?)<\/script>/)[1]
  assert.equal(createHash("sha256").update(inline).digest("base64"), allowed, `CSP hash ${path}`)
}

// 4. Injected values are escaped
const hostile = renderRoute(htmlFor("/"), { path: "/x", title: `A "quote" & <b>`, description: `$& '"<>` })
assert.match(hostile, /<title>A &quot;quote&quot; &amp; &lt;b&gt;<\/title>/)
assert.match(hostile, /<meta name="description" content="\$&amp; '&quot;&lt;&gt;"/)

console.log(`check-prerender: ${paths.length} routes ok`)
