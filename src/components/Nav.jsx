import { NavLink, Link } from "react-router-dom"

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

export default function Nav() {
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

          {/* CV — distinct from nav links; border-box that fills on hover */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-widest text-rust border border-rust px-3 py-1 hover:bg-rust hover:text-paper transition-colors duration-200 shrink-0"
            aria-label="Download Resume PDF"
          >
            CV ↗
          </a>
        </div>
      </nav>
    </header>
  )
}
