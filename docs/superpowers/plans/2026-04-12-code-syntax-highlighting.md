# Code Syntax Highlighting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add build-time syntax highlighting to MDX code blocks with a language label and copy button, styled to match the ink-on-paper design aesthetic.

**Architecture:** `rehype-pretty-code` (Shiki) runs as a rehype plugin in the existing `@mdx-js/rollup` pipeline — all highlighting happens at build time with zero runtime JS. A custom `pre` component in `mdxComponents` adds the language label and copy button as a thin React wrapper.

**Tech Stack:** rehype-pretty-code, shiki, React (useState for copy feedback), Tailwind CSS + custom CSS for token overrides.

**Spec:** `docs/superpowers/specs/2026-04-12-code-syntax-highlighting-design.md`

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install rehype-pretty-code**

```bash
npm install rehype-pretty-code shiki
```

`shiki` is a peer dependency of `rehype-pretty-code` — both are needed.

- [ ] **Step 2: Verify installation**

```bash
node -e "import('rehype-pretty-code').then(m => console.log('OK:', Object.keys(m)))"
```

Expected: `OK: [ 'default', ... ]`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add rehype-pretty-code and shiki for syntax highlighting"
```

---

### Task 2: Wire up rehype plugin in Vite config

**Files:**
- Modify: `vite.config.js`

- [ ] **Step 1: Add the rehype plugin**

Update `vite.config.js` to:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypePrettyCode from 'rehype-pretty-code'

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        [rehypePrettyCode, {
          theme: 'github-light',
          keepBackground: false,
        }],
      ],
    }),
    react(),
    tailwindcss(),
  ],
})
```

Key config:
- `theme: 'github-light'` — clean base, token colors overridden in CSS
- `keepBackground: false` — we control background via design tokens

- [ ] **Step 2: Add a test code block to an MDX post**

Add a fenced code block to `src/content/blog/on-learning-ml.mdx` at the end of the "What Actually Worked" section (after "Those are the ones you remember."):

````mdx
```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

# embed a question about lecture slides
query = model.encode("What is gradient descent?")
docs  = model.encode(["Slide 1 content", "Slide 2 content"])
```
````

This gives us a real code block to verify highlighting works.

- [ ] **Step 3: Run dev server and verify highlighting works**

```bash
npm run dev
```

Open `http://localhost:5173/notes/on-learning-ml` in a browser. The code block should show colored syntax tokens (using `github-light` default colors for now — we'll override in the next task). Tokens will have inline `style` attributes set by Shiki.

- [ ] **Step 4: Commit**

```bash
git add vite.config.js src/content/blog/on-learning-ml.mdx
git commit -m "feat: wire up rehype-pretty-code for build-time syntax highlighting"
```

---

### Task 3: Style code blocks and override token colors

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add code block styles to index.css**

Add the following after the existing `@layer utilities` block (at the end of the file):

```css
/* ─── Code Block Styles (rehype-pretty-code) ────────────────────────────── */
@layer base {
  /* Code block container */
  figure[data-rehype-pretty-code-figure] pre {
    background-color: var(--color-paper-dim);
    border-top: 1px solid var(--color-line);
    border-left: 3px solid var(--color-rust);
    border-radius: 2px;
    padding: 1.1rem 1.25rem;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    line-height: 1.7;
    position: relative;
  }

  /* Code inside pre — reset */
  figure[data-rehype-pretty-code-figure] pre code {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    background: none;
    border: none;
    padding: 0;
  }

  /* Inline code (not inside a figure from rehype-pretty-code) */
  :not(figure[data-rehype-pretty-code-figure]) > code,
  :not(pre) > code {
    font-family: var(--font-mono);
    font-size: 0.85em;
    background-color: var(--color-paper-dim);
    border: 1px solid var(--color-line);
    border-radius: 2px;
    padding: 0.15em 0.35em;
  }

  /* ── Token color overrides ──
   * Shiki inlines style attributes; we override with !important
   * scoped under the figure to avoid leaking elsewhere. */
  figure[data-rehype-pretty-code-figure] .line span {
    /* Override Shiki's inlined colors */
  }

  /* Keywords: const, return, function, import, from, def, class, if, else */
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#cf222e"],
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#d73a49"],
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#a626a4"] {
    color: #7a3e1d !important;
    font-weight: 500;
  }

  /* Functions and method calls */
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#8250df"],
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#6639ba"],
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#6f42c1"] {
    color: #5c5033 !important;
  }

  /* Strings */
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#0a3069"],
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#032f62"],
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#50a14f"] {
    color: #3d6b4a !important;
  }

  /* Comments */
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#6e7781"],
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#57606a"],
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#a0a1a7"] {
    color: var(--color-warm) !important;
    font-style: italic;
  }

  /* Numbers and constants */
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#0550ae"],
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#005cc5"] {
    color: #6b4c2a !important;
  }

  /* Punctuation and operators */
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#24292f"],
  figure[data-rehype-pretty-code-figure] pre code span[style*="color:#24292e"] {
    color: var(--color-ink) !important;
  }
}
```

**Important note on token color overrides:** The `style*=` selectors target the exact hex colors that `github-light` theme outputs. After wiring this up, inspect the rendered HTML in the browser to verify the actual colors Shiki emits. If any selectors don't match (Shiki theme versions can vary), update the hex values in the selectors to match.

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:5173/notes/on-learning-ml`. The code block should now show:
- `paper-dim` background with rust left border
- Warm-toned token colors (not the default github-light blues/purples)
- IBM Plex Mono font

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: add ink-on-paper code block styles and token color overrides"
```

---

### Task 4: Add language label and copy button

**Files:**
- Modify: `src/pages/BlogPost.jsx`

- [ ] **Step 1: Add the custom `pre` component**

In `BlogPost.jsx`, add a `CodeBlock` component before the `mdxComponents` object, and add it to `mdxComponents`:

```jsx
import { useEffect, useState, useRef } from "react"
```

Then add this component before `mdxComponents`:

```jsx
function CodeBlock({ children, ...props }) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef(null)

  // Extract language from the code element's data attribute
  const codeEl = children?.props || {}
  const language = codeEl["data-language"] || ""

  function handleCopy() {
    const text = preRef.current?.textContent || ""
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative group">
      {(language || true) && (
        <div className="absolute top-2 right-3 flex items-center gap-3 font-mono text-warm select-none"
             style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {language && <span>{language}</span>}
          <button
            onClick={handleCopy}
            className="text-warm hover:text-rust transition-colors duration-200 cursor-pointer"
            style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  )
}
```

Then update the `mdxComponents` object to include it:

```jsx
const mdxComponents = {
  pre: (props) => <CodeBlock {...props} />,
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
```

**How it works:**
- `rehype-pretty-code` wraps code in `<figure data-rehype-pretty-code-figure>` → `<pre>` → `<code data-language="python">`
- Our `pre` override wraps the `<pre>` in a `<div className="relative group">` to position the label and button
- `data-language` is read from the `<code>` child's props
- Copy extracts text content from the `<pre>` element via ref
- `useState` toggles "Copy" → "Copied" for 2 seconds

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:5173/notes/on-learning-ml`. Verify:
1. Language label ("python") appears in the top-right of the code block
2. "Copy" button appears next to it
3. Clicking "Copy" copies the code to clipboard and button text changes to "Copied"
4. After 2 seconds, button text reverts to "Copy"
5. Hover on "Copy" changes color to rust

- [ ] **Step 3: Run production build to verify no issues**

```bash
npm run build
```

Expected: Build succeeds with no errors. Shiki processes the code block at build time.

- [ ] **Step 4: Commit**

```bash
git add src/pages/BlogPost.jsx
git commit -m "feat: add language label and copy button to code blocks"
```

---

### Task 5: Final verification and cleanup

- [ ] **Step 1: Run production build and preview**

```bash
npm run build && npm run preview
```

Open `http://localhost:4173/notes/on-learning-ml`. Verify the code block renders correctly in production mode — highlighting, language label, and copy button all work.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No new lint errors.

- [ ] **Step 3: Clean up the preview file**

Delete the theme comparison file created during brainstorming:

```bash
rm docs/preview-code-themes.html
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: clean up brainstorming preview file"
```
