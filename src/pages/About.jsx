import { useEffect } from "react"
import { motion } from "framer-motion"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const timeline = [
  {
    year: "2023",
    event: "First complete web project in high school",
    detail: "Paradise Shoes — HTML, CSS, JavaScript from scratch",
  },
  {
    year: "2024",
    event: "Enrolled in Universiti Teknologi PETRONAS, Malaysia.",
    detail: "Majoring in Computer Science",
  },
  {
    year: "2025",
    event: "Dug into OOP and database design",
    detail: "Completed a MonoGame project and an Airbnb-style DB system",
  },
  {
    year: "2026",
    event: "Focusing on AI and machine learning development.",
    detail: "Exploring the foundations of AI/ML properly with statistical methods",
  },
]

/**
 * Skills described in honest prose — no progress bars, no percentages.
 * Skill bars are misleading (what does 80% Python mean?).
 * Text lets you be precise about what you can and can't do.
 */
const skills = [
  { name: "Python", level: "Comfortable — OOP, scripting, beginning ML experimentation" },
  { name: "C#", level: "Working knowledge — shipped a game with MonoGame, OOP fluent" },
  { name: "JavaScript", level: "Improving fast — vanilla solid, learning React properly" },
  { name: "SQL / MySQL", level: "Solid fundamentals — schema design, normalisation, complex queries" },
  { name: "Machine Learning", level: "Early days — building intuition through projects, not courses" },
  { name: "Git", level: "Daily use — comfortable with branching, still learning the advanced stuff" },
]

export default function About() {
  useEffect(() => {
    document.title = "About — Portfolio"
  }, [])

  return (
    <motion.main variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto px-6">
      {/* ─── PAGE HEADER ───────────────────────────────────────────────────── */}
      <section className="pt-16 pb-10">
        <motion.p variants={item} className="font-mono text-[11px] text-rust uppercase tracking-widest mb-4">
          About
        </motion.p>
        {/* Two-line display title — second line is longer, creates natural asymmetry */}
        <motion.h1 variants={item} className="text-display-sm text-ink font-serif mb-3">
          The person behind the code
        </motion.h1>
        <motion.div variants={item} className="border-t border-line mt-8" />
      </section>

      {/* ─── TWO-COLUMN BODY ────────────────────────────────────────────────
       *
       * Asymmetric split: 3fr personal note / 2fr timeline.
       * The column proportions are intentional — the text has more to say
       * than the timeline, so it gets more space.
       *
       * On mobile this stacks (grid-cols-1).
       */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-16 pb-16">
        {/* ── LEFT: Personal note + skills ──────────────────────────────── */}
        <div>
          <motion.div variants={item} className="mb-10">
            <h2 className="font-serif font-semibold text-lg text-ink mb-4">In my own words</h2>
            <div className="space-y-4 font-serif text-base text-warm leading-relaxed">
              <p>
                I&apos;m a Computer Science student at Universiti Teknologi PETRONAS, Malaysia.
                My focus is software engineering with a growing interest in AI and machine learning,
                specifically the parts that feel like actual engineering rather than magic.
              </p>
              <p>
                I learn by building. Most of what I know came from a project that confused me first.
                I&apos;m comfortable being the person in the room who doesn&apos;t know something yet.
              </p>
              <p>
                Outside of code: I think a lot about design — why some interfaces feel inevitable and
                others feel fought-against. I also read and sleep too much.
              </p>
            </div>
          </motion.div>

          {/* Skills — honest text descriptions */}
          <motion.div variants={item} className="mb-10">
            <h2 className="font-serif font-semibold text-lg text-ink mb-5">Skills, honestly</h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="grid grid-cols-[130px_1fr] gap-4 items-start"
                >
                  <span className="font-mono text-[11px] text-ink uppercase tracking-wider mt-0.5 leading-snug">
                    {skill.name}
                  </span>
                  <span className="font-serif text-sm text-warm leading-snug">{skill.level}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Resume download — prominent on About page */}
          <motion.div variants={item}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-rust border border-rust px-5 py-3 hover:bg-rust hover:text-paper transition-colors duration-200"
            >
              Download CV ↗
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: Education timeline ─────────────────────────────────── */}
        <motion.div variants={item}>
          <h2 className="font-serif font-semibold text-lg text-ink mb-6">Timeline</h2>

          {/* Timeline with vertical rule on left side */}
          <div className="relative space-y-7">
            {/* Vertical line — purely decorative structural element */}
            <div
              className="absolute left-[3.5rem] top-1 bottom-0 w-px bg-line"
              aria-hidden="true"
            />

            {timeline.map((entry) => (
              <div key={entry.year} className="flex gap-5 items-start relative">
                {/* Year — anchored to the left of the vertical rule */}
                <span className="font-mono text-[11px] text-rust w-10 shrink-0 mt-1 text-right leading-snug">
                  {entry.year}
                </span>

                {/* Dot — sits on the vertical rule line */}
                <span
                  className="absolute left-[3.35rem] top-[0.4rem] w-1.5 h-1.5 bg-rust shrink-0"
                  aria-hidden="true"
                />

                <div className="pl-4">
                  <p className="font-serif font-semibold text-ink text-base leading-tight mb-1">
                    {entry.event}
                  </p>
                  <p className="font-mono text-[11px] text-warm leading-snug">{entry.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}
