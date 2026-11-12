/**
 * Footer — minimal, informational.
 * All type in IBM Plex Mono, small uppercase.
 * Left: copyright. Right: external links.
 */
import { github, linkedin, email } from "../data/links"

const sameTab = (href) => href.startsWith("mailto") || href.startsWith("/")

const links = [
  github,
  linkedin,
  email,
  { href: "/feed.xml", label: "RSS", ariaLabel: "RSS feed of notes" },
]

export default function Footer() {
  return (
    <footer className="border-t border-line mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-warm uppercase tracking-widest">
          © {new Date().getFullYear()} Anuar Afiq
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map(({ href, label, ariaLabel }) => (
            <a
              key={label}
              href={href}
              target={sameTab(href) ? undefined : "_blank"}
              rel={sameTab(href) ? undefined : "noopener noreferrer"}
              aria-label={ariaLabel}
              className="font-mono text-[11px] text-warm uppercase tracking-widest hover:text-rust transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
