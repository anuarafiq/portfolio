import { readFileSync, writeFileSync, readdirSync } from "fs"
import { join, dirname, basename } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const BLOG_DIR = join(__dirname, "../src/content/blog")
const OUT = join(__dirname, "../public/feed.xml")
const SITE_URL = "https://anuarafiq.me"

function parseFrontmatter(src) {
  const match = src.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  return Object.fromEntries(
    match[1].split("\n").map((line) => {
      const [key, ...rest] = line.split(":")
      return [key.trim(), rest.join(":").trim().replace(/^"|"$/g, "")]
    })
  )
}

const posts = readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => {
    const src = readFileSync(join(BLOG_DIR, f), "utf-8")
    const slug = basename(f, ".mdx")
    return { slug, ...parseFrontmatter(src) }
  })
  .filter((p) => p.date)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

// "]]>" inside CDATA would terminate the section early and inject markup
const cdata = (v) => `<![CDATA[${String(v ?? "").replaceAll("]]>", "]]]]><![CDATA[>")}]]>`

const items = posts
  .map(
    (p) => `
  <item>
    <title>${cdata(p.title)}</title>
    <link>${SITE_URL}/notes/${p.slug}</link>
    <guid>${SITE_URL}/notes/${p.slug}</guid>
    <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description>${cdata(p.excerpt)}</description>
  </item>`
  )
  .join("")

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Anuar Afiq — Notes</title>
    <link>${SITE_URL}/notes</link>
    <description>Writing on code, design, and things worth thinking about.</description>
    <language>en-gb</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`

writeFileSync(OUT, feed)
console.log(`feed.xml written — ${posts.length} posts`)
