# MDX Blog Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate blog content from JS object arrays in `posts.js` to individual `.mdx` files with YAML frontmatter.

**Architecture:** Add `@mdx-js/rollup` to Vite, write each post as an `.mdx` file in `src/content/blog/`, then use `import.meta.glob` to load all posts and their frontmatter at build time. `BlogPost.jsx` renders the MDX default export (a React component) using a `components` map that applies existing design tokens.

**Tech Stack:** `@mdx-js/rollup`, `remark-frontmatter`, `remark-mdx-frontmatter`, Vite `import.meta.glob`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `vite.config.js` | Add MDX Rollup plugin with remark plugins |
| Create | `src/content/blog/on-learning-ml.mdx` | Post 1 content + frontmatter |
| Create | `src/content/blog/monospace-thinking.mdx` | Post 2 content + frontmatter |
| Rewrite | `src/data/posts.js` | Glob-import MDX modules, export sorted posts array |
| Modify | `src/pages/BlogPost.jsx` | Render MDX component via `components` prop instead of block array |
| Modify | `src/pages/Blog.jsx` | Use `post.slug` as React key instead of `post.id` |

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install the three packages**

```bash
npm install @mdx-js/rollup remark-frontmatter remark-mdx-frontmatter
```

Expected: three packages added to `dependencies` in `package.json`, no errors.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install mdx rollup and remark frontmatter packages"
```

---

### Task 2: Wire Up MDX Plugin in Vite

**Files:**
- Modify: `vite.config.js`

- [ ] **Step 1: Update vite.config.js**

Replace the entire file with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    react(),
    tailwindcss(),
  ],
})
```

Note: `mdx()` must come before `react()` — the React plugin processes JSX produced by MDX.

- [ ] **Step 2: Verify dev server starts without errors**

```bash
npm run dev
```

Expected: server starts, no plugin errors in terminal. (No MDX files exist yet — that's fine.)

- [ ] **Step 3: Commit**

```bash
git add vite.config.js
git commit -m "chore: add mdx rollup plugin to vite config"
```

---

### Task 3: Create MDX Content Files

**Files:**
- Create: `src/content/blog/on-learning-ml.mdx`
- Create: `src/content/blog/monospace-thinking.mdx`

- [ ] **Step 1: Create `src/content/blog/on-learning-ml.mdx`**

```mdx
---
title: "On Learning Machine Learning Without a Roadmap"
date: "2025-03-15"
category: "ML"
readingTime: "4 min"
excerpt: "Everyone has a roadmap. I tried three different ones before giving up and just starting to build things. Here's what actually stuck."
---

The machine learning landscape is full of roadmaps. YouTube playlists that promise to take you from zero to job-ready in 90 days. Notion templates with colour-coded progress bars. Reddit threads arguing about whether you need to do Andrew Ng's course before fast.ai or the other way around.

I tried three different roadmaps before I stopped following them entirely. Not because they were bad — they weren't — but because I kept stalling at the same place: the transition from understanding a concept to actually building with it.

### What Actually Worked

The thing that finally broke the cycle was picking a project I actually cared about and working backwards from it. I wanted to build a study assistant that could answer questions about my lecture slides. That forced me to learn embeddings, vector databases, and retrieval-augmented generation — not because a roadmap told me to, but because I needed them.

The messy projects are the good projects. The ones where you hit a wall and have to read three papers before you can continue. Those are the ones you remember.

### The Uncomfortable Part

The uncomfortable part is that this approach means accepting that your knowledge will be uneven for a long time. I know a lot about attention mechanisms and almost nothing about SVMs. That used to bother me. It doesn't anymore. The goal was never encyclopaedic coverage — it was to be useful.
```

- [ ] **Step 2: Create `src/content/blog/monospace-thinking.mdx`**

```mdx
---
title: "Monospaced Fonts Make Me Think Differently"
date: "2025-02-18"
category: "Design"
readingTime: "2 min"
excerpt: "Something about equal-width characters forces a kind of precision. It changes how I write — not just code, but notes, plans, everything."
---

I started writing all my rough notes in a monospaced font about six months ago. IBM Plex Mono, specifically. I don't have a rigorous explanation for why it changed how I think, but it did.

My best guess: the fixed character width creates a kind of pressure towards brevity. Each character costs the same space, so vague language that takes twenty characters is visibly expensive compared to a precise word that takes eight. You start editing as you type.

There's also something about the association with code. When I write in mono, I'm in a slightly more precise, technical headspace. Less stream-of-consciousness, more structured. Whether that's useful depends on what I'm working on — but for planning and technical notes, it consistently helps.
```

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/
git commit -m "content: add mdx files for existing blog posts"
```

---

### Task 4: Rewrite posts.js to Use Glob Imports

**Files:**
- Rewrite: `src/data/posts.js`

- [ ] **Step 1: Rewrite `src/data/posts.js`**

Replace the entire file with:

```js
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
```

Each entry in `posts` has: `slug` (string), `title`, `date`, `category`, `readingTime`, `excerpt` (all from frontmatter), and `Component` (the MDX React component).

- [ ] **Step 2: Verify the dev server still loads without errors**

```bash
npm run dev
```

Open `http://localhost:5173/notes` — the post list should still render with the same two posts (titles, dates, categories). If you see a blank page, check the browser console.

- [ ] **Step 3: Commit**

```bash
git add src/data/posts.js
git commit -m "feat: replace static posts array with glob-imported mdx modules"
```

---

### Task 5: Update BlogPost.jsx to Render MDX Component

**Files:**
- Modify: `src/pages/BlogPost.jsx`

- [ ] **Step 1: Replace the content rendering block in `BlogPost.jsx`**

Find the `<motion.article>` section (lines 86–121). Replace only the article's inner content div (currently `post.content.map(...)`) with a styled component map approach. Here is the full updated file:

```jsx
import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { posts } from "../data/posts"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const mdxComponents = {
  p: ({ children }) => (
    <p className="font-serif text-ink text-lg leading-relaxed">{children}</p>
  ),
  h3: ({ children }) => (
    <h3
      className="font-serif font-semibold text-ink text-2xl mt-8 mb-1"
      style={{ letterSpacing: "-0.02em" }}
    >
      {children}
    </h3>
  ),
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  useEffect(() => {
    document.title = post ? `${post.title} — Anuar Afiq` : "Not Found — Anuar Afiq"
  }, [post])

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24">
        <p className="font-mono text-sm text-warm mb-4">Post not found.</p>
        <Link
          to="/notes"
          className="font-mono text-[11px] uppercase tracking-widest text-rust hover:underline"
        >
          ← Back to Notes
        </Link>
      </div>
    )
  }

  const PostContent = post.Component

  return (
    <motion.main variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto px-6">
      {/* ─── ARTICLE HEADER ─────────────────────────────────────────────── */}
      <header className="pt-16 pb-10">
        <motion.div variants={item} className="flex items-center gap-4 mb-8">
          <Link
            to="/notes"
            className="font-mono text-[11px] uppercase tracking-widest text-warm hover:text-rust transition-colors duration-200"
          >
            ← Notes
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-wider text-warm border border-line px-2 py-0.5">
            {post.category}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-serif font-semibold text-ink leading-tight mb-4"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {post.title}
        </motion.h1>

        <motion.div variants={item} className="flex items-center gap-5 font-mono text-[11px] text-warm">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} read</span>
        </motion.div>

        <motion.div variants={item} className="border-t border-line mt-8" />
      </header>

      {/* ─── ARTICLE BODY ───────────────────────────────────────────────── */}
      <motion.article variants={item} className="pb-16">
        <div className="space-y-5">
          <PostContent components={mdxComponents} />
        </div>

        <div className="mt-12 pt-8 border-t border-line">
          <Link
            to="/notes"
            className="font-mono text-[11px] uppercase tracking-widest text-warm hover:text-rust transition-colors duration-200"
          >
            ← All Notes
          </Link>
        </div>
      </motion.article>
    </motion.main>
  )
}
```

- [ ] **Step 2: Open a post in the browser and verify it renders correctly**

Navigate to `http://localhost:5173/notes/on-learning-ml`. Verify:
- Title, date, category, reading time display in the header
- Body paragraphs render in serif font
- `### What Actually Worked` and `### The Uncomfortable Part` headings render as styled h3s
- Back link at bottom works

- [ ] **Step 3: Commit**

```bash
git add src/pages/BlogPost.jsx
git commit -m "feat: render mdx component in BlogPost with typed component map"
```

---

### Task 6: Fix Blog.jsx React Key

**Files:**
- Modify: `src/pages/Blog.jsx`

- [ ] **Step 1: Change the `key` prop from `post.id` to `post.slug`**

In `Blog.jsx` line 52, find:

```jsx
{posts.map((post) => (
  <Link
    key={post.id}
```

Change to:

```jsx
{posts.map((post) => (
  <Link
    key={post.slug}
```

- [ ] **Step 2: Verify the Notes list page still renders correctly**

Navigate to `http://localhost:5173/notes`. Both posts should appear, sorted by date (newest first). Click each link to confirm routing works.

- [ ] **Step 3: Delete `src/data/posts.js` old content is gone — confirm no `id` references remain**

```bash
grep -r "post\.id" src/
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Blog.jsx
git commit -m "fix: use post.slug as react key now that posts come from mdx glob"
```

---

## Done

At this point:
- All blog content lives in `src/content/blog/*.mdx`
- New posts require only a new `.mdx` file — no JS changes needed
- MDX supports full Markdown: headings, lists, bold, code blocks, inline components
- The design system (fonts, colors, spacing) is applied via the `mdxComponents` map in `BlogPost.jsx`
