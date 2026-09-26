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
  // path null = the 404 page: no canonical, kept out of the index
  const url = path == null ? null : escapeHtml(`${SITE_URL}${path}`)
  const extra = url
    ? `<meta property="og:url" content="${url}" />\n    <link rel="canonical" href="${url}" />`
    : `<meta name="robots" content="noindex" />`
  return html.replace("</head>", () => `  ${extra}\n  </head>`)
}

// React-rendered markup goes in as-is (already escaped by React); function replacer so
// `$&` etc. in note code blocks aren't read as replacement patterns
export function injectBody(html, body) {
  const root = '<div id="root"></div>'
  if (!html.includes(root)) throw new Error("prerender: empty #root not found in dist/index.html")
  return html.replace(root, () => `<div id="root">${body}</div>`)
}

// Only build when run directly, so the escaping test can import renderRoute
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const template = readFileSync(join(DIST, "index.html"), "utf-8")
  const { render } = await import("../dist-ssr/entry-server.js")

  for (const route of routes) {
    const out = route.path === "/" ? join(DIST, "index.html") : join(DIST, route.path, "index.html")
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, injectBody(renderRoute(template, route), render(route.path)))
  }

  // Vercel serves dist/404.html with a 404 status for any path not on disk.
  // "/__404" matches no route, so App falls through to NotFound.
  const notFound = { path: null, title: "404 - Not Found", description: "This page does not exist." }
  writeFileSync(join(DIST, "404.html"), injectBody(renderRoute(template, notFound), render("/__404")))

  const urls = routes.map((r) =>
    `  <url>\n    <loc>${escapeHtml(`${SITE_URL}${r.path}`)}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
  writeFileSync(join(DIST, "sitemap.xml"), sitemap)

  // llms.txt (llmstxt.org): same route list, grouped, so it can't drift from the sitemap either
  const link = (r) => `- [${r.title.replace(/ - Anuar Afiq$/, "")}](${SITE_URL}${r.path}): ${r.description}`
  const section = (name, test) => [`## ${name}`, "", ...routes.filter((r) => test(r.path)).map(link), ""]
  const llms = [
    "# Anuar Afiq", "", `> ${pageMeta["/"].description}`, "",
    ...section("Pages", (p) => p !== "/" && p.split("/").length === 2),
    ...section("Projects", (p) => p.startsWith("/projects/")),
    ...section("Notes", (p) => p.startsWith("/notes/")),
    "## Optional", "",
    `- [Resume](${SITE_URL}/resume.pdf)`,
    "- [GitHub](https://github.com/anuarafiq)",
    "- [LinkedIn](https://linkedin.com/in/anuar-afiq-arfahairy-234964314)",
    "",
  ]
  writeFileSync(join(DIST, "llms.txt"), llms.join("\n"))
  console.log(`prerender: ${routes.length} routes + 404.html + sitemap.xml + llms.txt written`)
}
