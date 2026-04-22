import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { projects } from "../data/projects"
import { currentlyBuilding } from "../data/status"
import { useMeta } from "../hooks/useMeta"
import { container, item } from "../lib/motion"

const featured = projects.filter((p) => p.featured)

export default function Home() {
  useMeta({
    title: "Anuar Afiq",
    description: "Anuar Afiq - computer science student building web apps, games, and tools. Based in Malaysia.",
  })

  return (
    <motion.main variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto px-6">
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      {/*
       * Layout: left-aligned display name + right-aligned metadata block.
       * Grid break: the display type uses clamp(4.5rem, 12vw, 9.5rem) which at
       * mid-viewports pushes the name right up to the content boundary — the
       * letters themselves become structural elements, not just text.
       */}
      <section className="pt-16 pb-12">
        <motion.p variants={item} className="font-mono text-[11px] text-rust uppercase tracking-widest mb-6">
          00. Hello
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          {/* Display name — weight 300 (light) so the high-contrast serifs of Cormorant
              Garamond create fine/thick stroke drama at large sizes */}
          <motion.h1 variants={item} className="text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.88] tracking-[-0.03em] font-light text-ink font-serif select-none">
            Anuar Afiq
          </motion.h1>

          {/* Metadata annotation — small mono, right-aligned, reads like a caption */}
          <motion.div variants={item} className="md:text-right md:pb-3 shrink-0">
            <p className="font-mono text-xs text-warm leading-loose">
              CS Major
              <br />
              AI / ML Focus
              <br />
              Universiti Teknologi PETRONAS
            </p>
          </motion.div>
        </div>

        <motion.div variants={item} className="border-t border-line" />
      </section>

      {/* ─── CURRENTLY BUILDING ──────────────────────────────────────────── */}
      {/*
       * Status board aesthetic: monospaced, left-aligned, reads like a terminal
       * or index card. Each row is a live signal of what I'm working on.
       */}
      <section className="py-10">
        <motion.p variants={item} className="font-mono text-[11px] text-rust uppercase tracking-widest mb-6">
          01. Currently Building
        </motion.p>

        <motion.div variants={item} className="space-y-3.5">
          {currentlyBuilding.map((entry) => (
            <div
              key={entry.name}
              className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-sm"
            >
              <span className="text-warm text-xs select-none" aria-hidden="true">
                →
              </span>
              <span className="text-ink font-medium w-50">{entry.name}</span>
              <span className="text-warm text-xs uppercase tracking-wider w-30">
                [{entry.status}]
              </span>
              <span className="text-warm text-xs">{entry.stack}</span>
            </div>
          ))}
        </motion.div>
      </section>

      <motion.div variants={item} className="border-t border-line" />

      {/* ─── FEATURED WORK ───────────────────────────────────────────────── */}
      {/*
       * Editorial project items — not cards. Each has a decorative index number,
       * title at serif scale, muted description, and tag chips.
       * The .project-row class handles the left-border-reveal hover state.
       */}
      <section className="py-10">
        <div className="flex items-center justify-between mb-8">
          <motion.p variants={item} className="font-mono text-[11px] text-rust uppercase tracking-widest">
            02. Selected Work
          </motion.p>
          <motion.div variants={item}>
            <Link
              to="/projects"
              className="font-mono text-[11px] text-warm uppercase tracking-wider hover:text-rust transition-colors duration-200"
            >
              All work →
            </Link>
          </motion.div>
        </div>

        <div className="space-y-1">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              variants={item}
              className="project-row py-5 px-4 -mx-4"
            >
              <div className="flex items-start gap-5">
                <span
                  className="font-mono text-xs text-warm mt-1.5 w-6 shrink-0 select-none tabular-nums"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="font-serif font-semibold text-xl text-ink leading-tight hover:text-rust transition-colors duration-200"
                    >
                      {project.title}
                    </Link>
                    <span className="font-mono text-xs text-warm">{project.year}</span>
                  </div>
                  <p className="font-serif font-bold text-warm text-base leading-relaxed mb-3 text-justify">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider text-warm border border-line px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.main>
  )
}
