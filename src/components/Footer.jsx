/**
 * Footer — minimal, informational.
 * All type in IBM Plex Mono, small uppercase.
 * Left: copyright. Right: external links.
 */
const sameTab = (href) => href.startsWith("mailto") || href.startsWith("/")

export default function Footer() {
  const links = [
    { href: "https://github.com/anuarafiq", label: "GitHub", ariaLabel: "GitHub profile (opens in new tab)" },
    { href: "https://linkedin.com/in/anuar-afiq-arfahairy-234964314", label: "LinkedIn", ariaLabel: "LinkedIn profile (opens in new tab)" },
    { href: "mailto:anuarafiq2407@gmail.com", label: "Email", ariaLabel: "Send email to Anuar Afiq" },
    { href: "/feed.xml", label: "RSS", ariaLabel: "RSS feed of notes" },
  ]

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
