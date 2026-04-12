/**
 * Footer — minimal, informational.
 * All type in IBM Plex Mono, small uppercase.
 * Left: copyright. Right: external links.
 */
export default function Footer() {
  const links = [
    { href: "https://github.com/anuarafiq", label: "GitHub" },
    { href: "https://linkedin.com/in/anuar-afiq-arfahairy-234964314", label: "LinkedIn" },
    { href: "mailto:anuarafiq2407@gmail.com", label: "Email" },
  ]

  return (
    <footer className="sticky bottom-0 z-50 bg-paper border-t border-line mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-warm uppercase tracking-widest">
          © {new Date().getFullYear()} Anuar Afiq
        </p>

        <div className="flex items-center gap-6">
          {links.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
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
