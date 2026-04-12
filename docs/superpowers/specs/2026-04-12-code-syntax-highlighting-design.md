# Code Syntax Highlighting — Design Spec

**Date:** 2026-04-12
**Status:** Approved

---

## Goal

Add syntax highlighting to MDX code blocks in the portfolio's blog/notes system, with a language label and copy-to-clipboard button. The styling must match the ink-on-paper design aesthetic.

## Approach

**Tool:** `rehype-pretty-code` (powered by Shiki / VS Code TextMate grammars). Runs at build time via the existing `@mdx-js/rollup` pipeline — zero runtime JS for highlighting.

## Files Changed

| File | Change |
|---|---|
| `package.json` | Add `rehype-pretty-code` and `shiki` as dev dependencies |
| `vite.config.js` | Add `rehypePrettyCode` as a rehype plugin with `github-light` theme, `keepBackground: false` |
| `src/index.css` | Code block container styles, token color overrides, inline code styles |
| `src/pages/BlogPost.jsx` | Add custom `pre` component to `mdxComponents` with language label and copy button |

No new files created. No changes to MDX content, routing, or data layer.

## Build Pipeline Config

In `vite.config.js`, add `rehype-pretty-code` to the MDX plugin config:

```js
mdx({
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  rehypePlugins: [[rehypePrettyCode, { theme: 'github-light', keepBackground: false }]],
})
```

- `keepBackground: false` — we control background with our own design tokens
- `github-light` — clean base theme; token colors are overridden in CSS

## Styling

### Code block container (`pre`)

- Background: `var(--color-paper-dim)` (`#ede6d8`)
- Border-left: 3px solid `var(--color-rust)`
- Border-top: 1px solid `var(--color-line)`
- Font: IBM Plex Mono, ~0.82rem, line-height 1.7
- `position: relative` for absolute-positioned language label and copy button
- `overflow-x: auto` for horizontal scroll on long lines
- Rounded: 2px

### Inline code

- Background: `var(--color-paper-dim)`
- Border: 1px solid `var(--color-line)`
- Font: IBM Plex Mono, slightly smaller than surrounding text
- Small horizontal padding

### Token color overrides

Override Shiki's inlined styles via CSS specificity on `[data-rehype-pretty-code-figure]` selectors:

| Token type | Color | Notes |
|---|---|---|
| Keywords | `#7a3e1d` | Deep rust, font-weight 500 |
| Functions | `#5c5033` | Warm brown |
| Strings | `#3d6b4a` | Muted green |
| Comments | `var(--color-warm)` | Italic |
| Numbers | `#6b4c2a` | Warm amber |
| Punctuation | `var(--color-warm)` | Subdued |

## Language Label + Copy Button

Implemented as a custom `pre` component in `mdxComponents` (BlogPost.jsx).

### Language label
- Position: absolute, top-right of the `pre` block
- Font: IBM Plex Mono, ~10px, uppercase, `tracking-wider`
- Color: `var(--color-warm)`

### Copy button
- Position: next to the language label
- Default text: "Copy"
- On click: copies code content via `navigator.clipboard.writeText`, text changes to "Copied" for 2 seconds
- Styling: `font-mono`, same size as language label, `text-warm`, hover `text-rust`
- Transitions: CSS only (no Framer Motion)

### Layout

```
┌──────────────────────────────── pre ─┐
│                          js  [Copy]  │
│                                      │
│  const x = 1                         │
│  const y = fn(x)                     │
│                                      │
└──────────────────────────────────────┘
```

### Implementation

- ~20 line React component with `useState` for copied state
- Reads `data-language` attribute from the `<code>` child (set by rehype-pretty-code)
- Extracts text content from `children` for clipboard copy

## Future: Dark Mode

When dark mode is added later, two paths available:

1. **Dual theme config:** `rehype-pretty-code` supports `theme: { light: 'github-light', dark: '...' }` which generates both sets of styles with CSS variable toggling
2. **CSS overrides:** Use `prefers-color-scheme` or a class toggle to swap token colors

Dark palette (already designed in preview):
- Background: `#1e1b16` (warm black)
- Text: `#e8dfc8` (cream)
- Keywords: `#e88a6c` (rust-orange)
- Functions: `#b8cfe8` (muted blue)
- Strings: `#a8d4a0` (soft green)
- Comments: `#6e6558`

## Out of Scope

- Line numbers
- Line highlighting / focus
- Diff highlighting
- Code block titles/filenames
- Dark mode implementation (future task)
