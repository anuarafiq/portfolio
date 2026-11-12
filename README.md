# Portfolio - Anuar Afiq

Personal portfolio site built with an ink-on-paper editorial aesthetic.

## Pages

| Route | Description |
|---|---|
| `/` | Hero, current status, featured work |
| `/projects` | Tag-filtered project list |
| `/projects/:slug` | Project detail: overview, problem, solution |
| `/about` | Background, skills, timeline |
| `/record` | Competitions, campus involvement, certifications |
| `/notes` | Writing archive |
| `/notes/:slug` | Individual post |

## Stack

| Tool | Purpose |
|---|---|
| React 19 + Vite | Framework + bundler |
| Tailwind CSS v4 | Utility-first styling |
| React Router v7 | Client-side routing |
| Framer Motion | Page animations |
| MDX | Blog post authoring |

## Dev

```bash
npm install
npm run dev      # localhost:5173
npm run build    # production build, prerenders each route
npm run preview  # preview production build
npm run check    # assertions on the prerendered output (run after build)
npm run capture  # screenshots of 8 routes, phone and desktop, light and dark (run after build)
```

`npm run capture` needs Python with Playwright (`pip install playwright`, then `playwright install chromium`). It writes to `.captures/` and fails on a CSP violation, a page error, or horizontal scroll at phone width.

## License

[MIT](LICENSE)
