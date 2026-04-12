const modules = import.meta.glob('../content/blog/*.mdx', { eager: true })

export const posts = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/').pop().replace('.mdx', '')
    return {
      slug,
      ...mod.frontmatter,
      Component: mod.default,
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))
