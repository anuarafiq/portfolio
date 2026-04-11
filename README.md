# Portfolio — Anuar

Personal web portfolio to showcase past projects and document learning progress.

## Project Goal

First real project outside of curriculum. Built to learn frontend development through practice, not just tutorials.

## Stack

| Tool | Purpose |
|---|---|
| React + Vite | Component framework + dev server/bundler |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Utility-first styling |
| React Router v6 | Client-side routing between pages |
| Framer Motion | Page/card animations |
| Formspree | Contact form (no backend needed) |
| ESLint | Linting (`eslint-plugin-react` + `react-hooks` + `react-refresh`) |
| Vercel | Deployment (auto-deploys `main` on push) |

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/Home.jsx` | Hero section, CTA to projects |
| `/projects` | `src/pages/Projects.jsx` | Grid of ProjectCard components |
| `/about` | `src/pages/About.jsx` | Bio and skills |
| `/contact` | `src/pages/Contact.jsx` | Working contact form via Formspree |

## Key Files

```
src/
  components/
    Navbar.jsx          # NavLink-based nav with active state + ThemeToggle
    Footer.jsx          # Static links: GitHub, LinkedIn, Email
    ProjectCard.jsx     # Card with comingSoon badge, tech chips, hover animation
    SectionWrapper.jsx  # Reusable max-width layout wrapper (children prop)
    ThemeToggle.jsx     # Sun/moon button, reads from ThemeContext
  context/
    ThemeContext.jsx    # ThemeProvider component (dark mode state + localStorage)
    useTheme.js         # ThemeContext + useTheme hook (separated for fast-refresh)
  hooks/
    useContactForm.js   # Custom hook: form state, fetch to Formspree, status FSM
  pages/               # One file per route
  data/
    projects.js        # Plain array of project objects — edit here to add/update projects
```

## Project Data

Projects live in `src/data/projects.js` as a plain array. Each entry:

```js
{
  id: 1,
  title: "Project Name",
  description: "Short description.",
  tech: ["Python", "CLI"],       // shown as chips on the card
  githubUrl: null,               // set to a URL string to show GitHub link
  image: null,                   // set to an imported image to show a thumbnail
  comingSoon: true,              // shows "Coming Soon" badge when true
}
```

All 4 projects currently have `comingSoon: true`. Update entries here when ready to showcase.

## Environment Variables

```bash
# .env (not committed — see .env.example)
VITE_FORMSPREE_ID=your_formspree_id_here
```

For Vercel deployment: add `VITE_FORMSPREE_ID` in the Vercel dashboard under Project → Settings → Environment Variables.

## Git Workflow

```
main   ← production branch, auto-deploys to Vercel
dev    ← working branch
feat/* ← one branch per feature, PR into dev, then dev → main to deploy
```

Run `npm run lint` before merging any PR.

## Dev Commands

```bash
npm run dev      # start dev server at localhost:5173
npm run build    # production build
npm run lint     # run ESLint
npm run preview  # preview production build locally
```

## Current Status

- Scaffold complete, all pages functional, dark mode working
- All 4 projects are placeholders (`comingSoon: true`)
- Contact form wired up — needs a real `VITE_FORMSPREE_ID` to send messages
- Not yet pushed to GitHub or connected to Vercel

## Projects to Showcase (placeholders for now)

1. **Smart Parking System** — Python CLI
2. **ProjectOOP** — C# / MonoGame game
3. **Airbnb Database System** — MySQL
4. **Paradise Shoes** — HTML/CSS/JS web app

## Learning Goals

This project is intentionally scoped to teach:
- React component architecture, props, state, conditional rendering
- Context API (dark mode), custom hooks (`useContactForm`), `useEffect` (SEO meta)
- React Router v6, Tailwind CSS, Framer Motion
- Vite tooling, ESLint, environment variables
- Git branching workflow, Vercel deployment
