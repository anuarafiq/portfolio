import { m } from "framer-motion"
import { useMeta } from "../hooks/useMeta"
import { pageMeta } from "../data/meta"
import { container, item, entrance } from "../lib/motion"
import portrait from "../assets/portrait.webp"

const timeline = [
  {
    year: "2023",
    event: "First complete web project in high school",
    detail: "Paradise Shoes: HTML, CSS, JavaScript from scratch",
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
    year: "2025",
    event: "Gold at the Malaysia Invention & Innovation Expo",
    detail: "May 2025",
  },
  {
    year: "2025",
    event: "Gold at the Virtual Innovation Competition Exhibition",
    detail: "Nov 2025",
  },
  {
    year: "2026",
    event: "Silver at the Malaysia-Japan International Conference",
    detail: "Jan 2026",
  },
  {
    year: "2026",
    event: "Led the Waves of Change AI literacy programme",
    detail: "Project manager, Jun to Sep. Four AI modules for 40 Form 3 students, while I studied the statistics behind ML myself",
  },
  {
    year: "2026",
    event: "Taught GitHub to first-time users",
    detail: "Trainer, GDSC UTP Intro to GitHub workshop, Jul 2026",
  },
  {
    year: "2026",
    event: "2nd place at the International PBL Expo with Path OS",
    detail: "Web and Mobile Application category, Sept 2026",
  },
]

/**
 * Skills described in honest prose — no progress bars, no percentages.
 * Skill bars are misleading (what does 80% Python mean?).
 * Text lets you be precise about what you can and can't do.
 */
const skills = [
  { name: "Python", level: "Comfortable. OOP, scripting, and my first ML experiments." },
  { name: "C++", level: "Working knowledge. Structs, classes and the STL. Built a console parking system with it." },
  { name: "C#", level: "Working knowledge. Shipped a MonoGame game, fluent in OOP." },
  { name: "JavaScript", level: "Improving fast. Solid in vanilla JS, now mostly writing it inside React." },
  { name: "TypeScript", level: "Early days. Used it across Path OS and still lean on the compiler a lot." },
  { name: "React / Next.js", level: "Early days. This site is React, Path OS runs on the Next.js App Router." },
  { name: "Supabase", level: "Working knowledge. Set up auth, tables and row-level security for Path OS." },
  { name: "SQL / MySQL", level: "Solid fundamentals. Schema design, normalisation, complex queries." },
  { name: "Machine Learning", level: "Early days. Finished the Finlatics Data Science and ML program, building intuition through projects now." },
  { name: "Git", level: "Daily use. Branches and pull requests, and I taught an intro GitHub workshop for first-timers." },
]

export default function About() {
  useMeta(pageMeta["/about"])

  return (
    <m.main variants={container} initial={entrance()} animate="show" className="max-w-5xl mx-auto px-6">
      {/* ─── PAGE HEADER ───────────────────────────────────────────────────── */}
      <section className="pt-16 pb-10">
        <m.p variants={item} className="font-mono text-[11px] text-rust uppercase tracking-widest mb-4">
          About
        </m.p>
        {/* Two-line display title — second line is longer, creates natural asymmetry */}
        <m.h1 variants={item} className="text-display-sm text-ink font-serif mb-3">
          The person behind the code
        </m.h1>
        <m.div variants={item} className="border-t border-line mt-8" />
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
          <m.div variants={item} className="mb-10">
            <h2 className="font-serif font-bold text-lg text-ink mb-4">In my own words</h2>
            <div className="space-y-4 font-serif text-ink leading-relaxed">
              <p className="dropcap">
                I&apos;m a Computer Science student at Universiti Teknologi PETRONAS, Malaysia.
                My focus is software engineering with a growing interest in AI and machine learning,
                specifically the parts that feel like actual engineering rather than magic.
              </p>
              <p>
                I learn by building. Most of what I know came from a project that confused me first.
                I&apos;m comfortable being the person in the room who doesn&apos;t know something yet.
              </p>
              <p className="pull-quote">
                &ldquo;I&apos;m comfortable being the person in the room who doesn&apos;t know
                something yet.&rdquo;
              </p>
              <p>
                Outside of code: I think a lot about design: why some interfaces feel inevitable and
                others feel fought-against. I also read and sleep too much.
              </p>
            </div>
          </m.div>

          {/* Skills — honest text descriptions */}
          <m.div variants={item} className="mb-10">
            <h2 className="font-serif font-bold text-lg text-ink mb-5">Skills, honestly</h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="grid grid-cols-[130px_1fr] gap-4 items-start"
                >
                  <span className="font-mono text-[12px] text-ink uppercase tracking-wider mt-0.5 leading-snug">
                    {skill.name}
                  </span>
                  <span className="font-mono text-[12px] text-warm leading-snug">{skill.level}</span>
                </div>
              ))}
            </div>
          </m.div>

          {/* Resume download — prominent on About page */}
          <m.div variants={item}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-rust border border-rust px-5 py-3 hover:bg-rust hover:text-paper transition-colors duration-200"
            >
              Download Resume ↗
            </a>
          </m.div>
        </div>

        {/* ── RIGHT: Portrait + education timeline ─────────────────────── */}
        <m.div variants={item}>
          <div className="editorial-frame aspect-[3/4] mb-10">
            <img
              src={portrait}
              alt="Anuar Afiq"
              className="w-full h-full object-cover grayscale-[15%] contrast-[1.05]"
            />
          </div>

          <h2 className="font-serif font-bold text-lg text-ink mb-6">Timeline</h2>

          {/* Timeline with vertical rule on left side */}
          <div className="relative space-y-7">
            {/* Vertical line — purely decorative structural element */}
            <div
              className="absolute left-[3.5rem] top-1 bottom-0 w-px bg-line"
              aria-hidden="true"
            />

            {timeline.map((entry, i) => (
              <div key={entry.event} className="flex gap-5 items-start relative">
                {/* Year — anchored to the left of the vertical rule, shown once per year */}
                <span className="font-mono text-[11px] text-rust w-10 shrink-0 mt-1 text-right leading-snug">
                  {entry.year !== timeline[i - 1]?.year && entry.year}
                </span>

                {/* Dot — sits on the vertical rule line */}
                <span
                  className="absolute left-[3.35rem] top-[0.4rem] w-1.5 h-1.5 bg-rust shrink-0"
                  aria-hidden="true"
                />

                <div className="pl-4">
                  <p className="font-serif font-semibold text-ink text-lg leading-tight mb-1">
                    {entry.event}
                  </p>
                  <p className="font-mono text-[11px] text-warm leading-snug">{entry.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </m.main>
  )
}
