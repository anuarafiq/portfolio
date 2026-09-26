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
assert.match(htmlFor("/"), /<link rel="canonical" href="https:\/\/anuarafiq\.me\/"/, "root canonical")

// 1a. Descriptions fit a search snippet
for (const path of paths) {
  const desc = htmlFor(path).match(/<meta name="description" content="([^"]*)"/)[1]
  assert.ok(desc.length <= 160, `description ${desc.length} chars ${path}`)
}

// 1b. 404 page: indexed nowhere, no canonical, renders NotFound
const notFound = read(dist, "404.html")
assert.match(notFound, /<meta name="robots" content="noindex"/, "404 noindex")
assert.doesNotMatch(notFound, /rel="canonical"|og:url/, "404 must not claim a URL")
assert.match(notFound, /Page not found/, "404 body")

// 1c. Every page ships real body content with exactly one h1
for (const path of paths) {
  const body = htmlFor(path).match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/)?.[1] ?? ""
  assert.equal(body.match(/<h1[\s>]/g)?.length, 1, `one <h1> in prerendered body ${path}`)
  assert.doesNotMatch(body, /opacity:0/, `prerendered body starts hidden ${path}`)
}

// 2. Sitemap lists exactly the routes
const locs = [...read(dist, "sitemap.xml").matchAll(/<loc>https:\/\/anuarafiq\.me([^<]*)<\/loc>/g)].map((m) => m[1])
assert.deepEqual(locs.sort(), [...paths].sort(), "sitemap routes")
assert.ok(!existsSync(join(root, "public/sitemap.xml")), "public/sitemap.xml would shadow the generated one")

// 2b. llms.txt links every route except the root
const llms = read(dist, "llms.txt")
for (const path of paths.filter((p) => p !== "/")) assert.ok(llms.includes(`(https://anuarafiq.me${path})`), `llms.txt ${path}`)

// 2c. Structured data parses and has the right types per route
const ldTypes = (html) => {
  const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
  return (ld["@graph"] ?? [ld]).map((n) => n["@type"])
}
for (const path of paths) {
  const expected =
    path === "/" || path === "/about" ? ["ProfilePage"]
    : path.startsWith("/projects/") ? ["Person", "BreadcrumbList"]
    : path.startsWith("/notes/") ? ["Person", "BreadcrumbList", "BlogPosting"]
    : ["Person"]
  assert.deepEqual(ldTypes(htmlFor(path)), expected, `JSON-LD ${path}`)
}
for (const s of postSlugs) assert.match(htmlFor(`/notes/${s}`), /"datePublished":"\d{4}-\d{2}-\d{2}"/, `datePublished ${s}`)
assert.doesNotMatch(notFound, /application\/ld\+json/, "404 has no JSON-LD")

// 3. Inline theme script in every emitted page matches the CSP hash in vercel.json
const csp = JSON.parse(read(root, "vercel.json")).headers[0].headers.find((h) => h.key === "Content-Security-Policy").value
const allowed = csp.match(/'sha256-([^']+)'/)[1]
for (const [label, html] of [...paths.map((p) => [p, htmlFor(p)]), ["404.html", notFound]]) {
  const inlines = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  assert.equal(inlines.length, 1, `exactly one inline script ${label}`)
  assert.equal(createHash("sha256").update(inlines[0][1]).digest("base64"), allowed, `CSP hash ${label}`)
}

// 3b. Assets referenced by prerendered markup exist (SSR and client builds agree on hashes)
for (const [, asset] of htmlFor("/about").matchAll(/src="(\/assets\/[^"]+)"/g)) {
  assert.ok(existsSync(join(dist, asset)), `missing ${asset}`)
}

// 4. Injected values are escaped
const hostile = renderRoute(htmlFor("/"), { path: "/notes/x", title: `A "quote" & <b>`, description: `$& '"<>` })
assert.match(hostile, /<title>A &quot;quote&quot; &amp; &lt;b&gt;<\/title>/)
assert.match(hostile, /<meta name="description" content="\$&amp; '&quot;&lt;&gt;"/)
assert.ok(!hostile.includes("<b>"), "raw < in JSON-LD could close its script tag")

console.log(`check-prerender: ${paths.length} routes ok`)
