import { NavLink, Link } from "react-router-dom"
import { useTheme } from "../hooks/useTheme"

/**
 * Navigation bar — sticky, minimal.
 *
 * Design decisions:
 * - "AA" monogram: initials in Cormorant, slightly oversized to contrast with mono nav links
 * - Nav links use IBM Plex Mono, small uppercase, tracked out — feels annotative
 * - Hover state: thin rust underline grows from 0 → full width (CSS only, .nav-link class)
 * - CV button: border-only by default, fills on hover — same treatment as a stamp pressing down
 * - No hamburger menu — keeps the design intentional on mobile; links wrap naturally
 */

const navLinks = [
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/notes", label: "Notes" },
]

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Nav() {
  const { isDark, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-paper border-b border-line">
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Monogram — Cormorant Garamond, slightly larger than nav links */}
        <Link
          to="/"
          className="font-serif text-xl font-semibold tracking-tight text-ink hover:text-rust transition-colors duration-200"
          aria-label="Home"
        >
          Aa
        </Link>

        {/* Primary navigation */}
        <div className="flex items-center gap-5 sm:gap-7">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link font-mono text-[11px] uppercase tracking-widest transition-colors duration-200 ${
                  isActive ? "text-ink active" : "text-warm hover:text-ink"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Theme toggle — sun to go light, moon to go dark */}
          <button
            onClick={toggle}
            className="text-warm hover:text-ink transition-colors duration-200 flex items-center justify-center w-7 h-7"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* CV — distinct from nav links; border-box that fills on hover */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-widest text-rust border border-rust px-3 py-1 hover:bg-rust hover:text-paper transition-colors duration-200 shrink-0"
            aria-label="Download Resume PDF"
          >
            Resume ↗
          </a>
        </div>
      </nav>
    </header>
  )
}
