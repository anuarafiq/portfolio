// Minimal YAML frontmatter reader for the flat key: "value" pairs in src/content/blog/*.mdx
export function parseFrontmatter(src) {
  const match = src.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  return Object.fromEntries(
    match[1].split("\n").map((line) => {
      const [key, ...rest] = line.split(":")
      return [key.trim(), rest.join(":").trim().replace(/^"|"$/g, "")]
    })
  )
}
