# Portfolio — Anuar Afiq

Personal portfolio to showcase projects and document learning progress.

## Stack

| Tool | Purpose |
|---|---|
| React + Vite | Component framework + dev server/bundler |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Utility-first styling, tokens via `@theme {}` |
| React Router v7 | Client-side routing |
| Framer Motion | Page load animations |
| Google Fonts | Cormorant Garamond + IBM Plex Mono |

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/Home.jsx` | Editorial hero, status board, featured work |
| `/projects` | `src/pages/Projects.jsx` | Tag-filtered editorial project list |
| `/about` | `src/pages/About.jsx` | Personal note, skill descriptions, timeline |
| `/notes` | `src/pages/Blog.jsx` | Archive list of writing |
| `/notes/:slug` | `src/pages/BlogPost.jsx` | Single post reading view |

## File Structure

```
src/
  components/
    Nav.jsx           # Sticky nav: "AA" monogram + mono links + CV button
    Footer.jsx        # Copyright + external links (GitHub, LinkedIn, Email)
    ProjectCard.jsx   # Editorial project row (not a card) with hover border
  pages/              # One file per route
  data/
    projects.js       # Array of project objects — edit here to add projects
    posts.js          # Array of blog post objects — edit here to add notes
  index.css           # Design system: @theme tokens + global base + utilities
```

## Data Shapes

### Project (`src/data/projects.js`)
```js
{
  id: 1,
  slug: "project-slug",
  title: "Project Name",
  description: "One or two sentences. What it is and what was interesting about it.",
  tags: ["Python", "OOP"],      // shown as filter chips and tag labels
  status: "complete",           // "complete" | "wip" — "wip" shows a stamp badge
  year: "2024",
  githubUrl: null,              // string URL or null
  featured: true,               // true = appears on Home page
}
```

### Post (`src/data/posts.js`)
```js
{
  id: 1,
  slug: "post-slug",
  title: "Post Title",
  date: "2025-03-15",
  category: "ML",               // shown as a tag
  readingTime: "4 min",
  excerpt: "One sentence summary shown in the archive list.",
  content: [
    { type: "p", text: "Paragraph text." },
    { type: "h3", text: "Section heading" },
  ],
}
```

## Dev Commands

```bash
npm run dev      # start dev server at localhost:5173
npm run build    # production build (verify before pushing)
npm run lint     # run ESLint
npm run preview  # preview production build locally
```

---

## Design System

The portfolio commits fully to one aesthetic: **Ink-on-Paper Editorial**.
Think literary journal meets technical paper. These rules define the design —
follow them when adding new pages or components.

### Palette (3 colors, no more)

| Token | Value | Purpose |
|---|---|---|
| `ink` | `#1a1208` | Primary text, borders, buttons — near-black, warmer than `#000` |
| `paper` | `#f4efe8` | Page background — warm cream, aged paper feel |
| `rust` | `#c8391a` | Accent only — section markers, WIP badges, hover states, CV button |
| `warm` | `#9c9080` | Secondary text, dates, annotations |
| `line` | `#d4cdb8` | Borders and dividers — subtle warm separator |
| `paper-dim` | `#ede6d8` | Hover surface background |

These are defined in `src/index.css` under `@theme {}` and become Tailwind utilities:
`text-ink`, `bg-paper`, `border-rust`, etc.

### Typography (2 typefaces, no others)

| Typeface | Weight | Use |
|---|---|---|
| **Cormorant Garamond** | 300 (display), 400 (body), 600–700 (headings) | All prose, headings, display text |
| **IBM Plex Mono** | 400, 500 | Tags, dates, labels, section markers, nav links, metadata |

**Never use:** Inter, Roboto, Space Grotesk, system fonts, or any third typeface.

#### Type scale
| Class | Size | Use |
|---|---|---|
| `.text-display` | `clamp(4.5rem, 12vw, 9.5rem)` / weight 300 | Hero name only (Home page) |
| `.text-display-sm` | `clamp(2.5rem, 6vw, 5rem)` / weight 300 | Page titles (Projects, About, Notes) |
| `text-xl font-semibold` | ~1.25rem | Project titles, post titles in lists |
| `text-base` / `text-lg` | 1–1.125rem | Body prose |
| `text-[11px]` / `text-xs` | 10–12px | Mono labels, tags, dates, nav links |

### Layout Rules

- **Left-aligned always.** Never perfectly center hero sections.
- **Max-width container:** `max-w-5xl mx-auto px-6` on all pages.
- **Break the grid at least once per page.** The display type in the hero pushes
  against the container boundary by design — that tension is intentional.
- **Asymmetric two-column layouts** on About (`3fr / 2fr`) — wider for content, narrower for metadata.
- **No 3-column card grids.** Projects use a vertical editorial list.
- **Section markers:** `01. Label` in `font-mono text-[11px] text-rust uppercase tracking-widest`
  — functions like a magazine section number.
- **Horizontal rules** (`border-t border-line`) are structural separators, not decoration.

### Component Patterns

**Project rows (not cards):**
- Use `.project-row` class — border-left in rust appears + content indents on hover
- Decorative sequence number in `text-warm font-mono` (purely visual, `aria-hidden`)
- WIP badge: border-only `text-rust border border-rust` with no border-radius, no fill
- Tags: `border border-line text-warm font-mono text-[10px] uppercase px-2` — no fill, sharp corners

**Nav links:**
- `.nav-link` class — thin rust underline grows left→right on hover (CSS `::after`, no JS)
- All links in `font-mono text-[11px] uppercase tracking-widest`
- CV button: `border border-rust text-rust` — fills `bg-rust text-paper` on hover

**Buttons:**
- No border-radius (sharp corners)
- Two states only: border-only default, filled on hover
- Always `font-mono uppercase tracking-widest`

### Motion

- **Page load:** Framer Motion `staggerChildren: 0.09` on a container variant —
  children fade up (`opacity 0→1`, `y 18→0`) with easing `[0.22, 1, 0.36, 1]`
- **Hover states:** CSS transitions only (no Framer for hover) — use `duration-200` or `duration-300`
- **No scroll animations on individual elements** — stagger on mount only
- Animation duration: 0.5–0.55s for page items; 0.2–0.3s for hover transitions

### Things to Explicitly Avoid

| Don't | Why |
|---|---|
| Glassmorphism (`backdrop-blur` decorative) | Conflicts with ink-on-paper grounding |
| Rounded corners everywhere (`rounded-xl`, `rounded-full`) | Sharp edges are part of the aesthetic |
| Centered hero sections | This site is editorial, not a landing page |
| Skill bar percentages | Misleading and visually cheap |
| Purple-to-blue gradients | Generic "tech portfolio" look |
| `#111111` + white dark mode | Boring, not intentional |
| Scale-on-hover as the only hover state | Lazy; use border/color transitions instead |
| Testimonials section | N/A for a student portfolio |
| Adding a fourth color | The constraint is the design |
| Glassmorphism cards | See above |
| Three-column card grids | Editorial list is the pattern here |
