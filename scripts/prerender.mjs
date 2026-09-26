// Runs after `vite build`. Link-preview crawlers (LinkedIn, WhatsApp, Slack) do not
// run JS, so each route gets its own copy of dist/index.html with that route's
// title/description baked in. Vercel serves these files before the SPA rewrite.
// The same route list produces dist/sitemap.xml, so the two can never disagree.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs"
import { join, dirname, basename } from "path"
import { fileURLToPath } from "url"
import { parseFrontmatter } from "./frontmatter.mjs"
import { pageMeta } from "../src/data/meta.js"
import { projects } from "../src/data/projects.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, "../dist")
const BLOG_DIR = join(__dirname, "../src/content/blog")
const SITE_URL = "https://anuarafiq.me"

const posts = readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => ({ slug: basename(f, ".mdx"), ...parseFrontmatter(readFileSync(join(BLOG_DIR, f), "utf-8")) }))

const routes = [
  ...Object.entries(pageMeta).map(([path, meta]) => ({
    path, ...meta, changefreq: path === "/notes" ? "weekly" : "monthly", priority: path === "/" ? "1.0" : "0.8",
  })),
  ...projects.map((p) => ({
    path: `/projects/${p.slug}`, title: `${p.title} - Anuar Afiq`, description: p.description,
    changefreq: p.status === "wip" ? "monthly" : "yearly", priority: "0.6",
  })),
  ...posts.map((p) => ({
    path: `/notes/${p.slug}`, title: `${p.title} - Anuar Afiq`, description: p.excerpt ?? "A note by Anuar Afiq.",
    type: "article", changefreq: "yearly", priority: "0.5",
  })),
]

export const escapeHtml = (v) =>
  String(v).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")

// Throws if a tag is missing from index.html, so a template edit can't silently break previews
function replaceOnce(html, pattern, value, label) {
  if (!pattern.test(html)) throw new Error(`prerender: ${label} not found in dist/index.html`)
  return html.replace(pattern, (_, before, after) => `${before}${escapeHtml(value)}${after}`)
}

export function renderRoute(template, { path, title, description, type = "website" }) {
  let html = template
  html = replaceOnce(html, /(<title>)[^<]*(<\/title>)/, title, "<title>")
  for (const [attr, key, value] of [
    ["name", "description", description],
    ["property", "og:type", type],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
  ]) {
    html = replaceOnce(html, new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), value, key)
  }
  // Canonical/og:url only on real routes: dist/index.html is also the fallback for unknown paths
  if (path !== "/") {
    const url = escapeHtml(`${SITE_URL}${path}`)
    html = html.replace("</head>", () => `  <meta property="og:url" content="${url}" />\n    <link rel="canonical" href="${url}" />\n  </head>`)
  }
  return html
}

// Only build when run directly, so the escaping test can import renderRoute
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const template = readFileSync(join(DIST, "index.html"), "utf-8")

  for (const route of routes) {
    const out = route.path === "/" ? join(DIST, "index.html") : join(DIST, route.path, "index.html")
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, renderRoute(template, route))
  }

  const urls = routes.map((r) =>
    `  <url>\n    <loc>${escapeHtml(`${SITE_URL}${r.path}`)}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
  writeFileSync(join(DIST, "sitemap.xml"), sitemap)
  console.log(`prerender: ${routes.length} routes + sitemap.xml written`)
}
