import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useMeta } from "../hooks/useMeta"
import { container, item } from "../lib/motion"
import { competitions, campus, certifications } from "../data/record"

/**
 * Proof link, only rendered when an entry has a `url`.
 * Internal paths stay in the router; anything else opens in a new tab.
 */
function ProofLink({ url }) {
  if (!url) return null
  const className =
    "font-mono text-[10px] uppercase tracking-wider text-rust hover:text-ink transition-colors duration-200 whitespace-nowrap"
  return url.startsWith("/") ? (
    <Link to={url} className={className}>
      Read note ↗
    </Link>
  ) : (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      Verify ↗
    </a>
  )
}

/**
 * Section shell: heading + count pinned in a narrow left column (sticky on desktop),
 * entries in the wide right column. Reads like a ledger, not a card grid.
 */
function RecordSection({ title, count, children }) {
  return (
    <motion.section
      variants={item}
      className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-12 py-10 border-t border-line"
    >
      <div className="md:sticky md:top-20 self-start flex md:flex-col items-baseline md:items-start gap-3 md:gap-1">
        <h2 className="font-serif font-bold text-lg text-ink">{title}</h2>
        <span className="font-mono text-[11px] text-warm tabular-nums">
          {String(count).padStart(2, "0")} entries
        </span>
      </div>
      <ol className="divide-y divide-line">{children}</ol>
    </motion.section>
  )
}

/** One-line entry: title, source, optional proof link, date. Used by competitions and certs. */
function LineEntry({ title, source, date, url }) {
  return (
    <li className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-4 first:pt-0">
      <div className="flex flex-col gap-1 min-w-0">
        <p className="font-serif font-semibold text-ink text-lg leading-tight">{title}</p>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-[12px] text-warm leading-snug">{source}</span>
          <ProofLink url={url} />
        </div>
      </div>
      <span className="font-mono text-[11px] text-warm whitespace-nowrap mt-1.5">{date}</span>
    </li>
  )
}

export default function Record() {
  useMeta({
    title: "Record - Anuar Afiq",
    description:
      "Competitions, campus leadership roles, and certifications from Anuar Afiq - CS student at Universiti Teknologi PETRONAS.",
  })

  return (
    <motion.main variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto px-6 pb-16">
      {/* ─── PAGE HEADER ─── same treatment as About ───────────────────────── */}
      <section className="pt-16 pb-10">
        <motion.p variants={item} className="font-mono text-[11px] text-rust uppercase tracking-widest mb-4">
          Record
        </motion.p>
        <motion.h1 variants={item} className="text-display-sm text-ink font-serif">
          The record so far
        </motion.h1>
      </section>

      <RecordSection title="Competitions" count={competitions.length}>
        {competitions.map((c) => (
          <LineEntry key={`${c.event}-${c.date}`} title={c.title} source={c.event} date={c.date} url={c.url} />
        ))}
      </RecordSection>

      <RecordSection title="Campus involvement" count={campus.length}>
        {campus.map((c) => (
          <li key={`${c.role}-${c.org}`} className="flex flex-col gap-3 py-6 first:pt-0">
            <div className="grid grid-cols-[1fr_auto] gap-x-6">
              <div className="flex flex-col gap-1 min-w-0">
                <p className="font-serif font-semibold text-ink text-lg leading-tight">
                  {c.role}, <span className="font-normal">{c.org}</span>
                </p>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  {c.group && <span className="font-mono text-[12px] text-warm leading-snug">{c.group}</span>}
                  <ProofLink url={c.url} />
                </div>
              </div>
              <span className="font-mono text-[11px] text-warm whitespace-nowrap mt-1.5">{c.date}</span>
            </div>
            {/* Square rust markers echo the About timeline dots */}
            <ul className="flex flex-col gap-2 max-w-[65ch]">
              {c.points.map((point) => (
                <li key={point} className="flex gap-3 font-serif text-ink/85 text-base leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-rust shrink-0 mt-[0.6rem]" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </RecordSection>

      <RecordSection title="Certifications" count={certifications.length}>
        {certifications.map((c) => (
          <LineEntry key={c.title} title={c.title} source={c.issuer} date={c.date} url={c.url} />
        ))}
      </RecordSection>
    </motion.main>
  )
}
