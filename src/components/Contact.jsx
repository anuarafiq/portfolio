import { m } from "framer-motion"
import { item } from "../lib/motion"
import { availability } from "../data/status"
import { emailAddress, email, github, linkedin } from "../data/links"

const external = [
  github,
  linkedin,
  { href: "/resume.pdf", label: "Resume", ariaLabel: "Download Resume PDF (opens in new tab)" },
]

/**
 * Contact — closing section of Home and About. No form: the email is real
 * text in a mailto link, the rest are plain mono links.
 */
export default function Contact({ label = "Contact" }) {
  return (
    <>
      <m.div variants={item} className="border-t border-line" />
      <m.section variants={item} aria-label="Contact" className="pt-10 pb-16">
        <p className="font-mono text-[11px] text-rust uppercase tracking-widest mb-6">{label}</p>
        <p className="font-serif text-lg text-ink mb-3">{availability}</p>
        <a
          href={email.href}
          className="inline-block font-serif font-light text-3xl sm:text-4xl leading-tight text-ink break-words underline decoration-1 decoration-line underline-offset-4 hover:decoration-rust hover:text-rust transition-colors duration-200"
        >
          {emailAddress}
        </a>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6">
          {external.map(({ href, label: text, ariaLabel }) => (
            <a
              key={text}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
              className="font-mono text-xs text-rust hover:underline"
            >
              {text} ↗
            </a>
          ))}
        </div>
      </m.section>
    </>
  )
}
