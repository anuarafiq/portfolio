import { useState } from "react"
import { m } from "framer-motion"
import { projects } from "../data/projects"
import ProjectCard from "../components/ProjectCard"
import { useMeta } from "../hooks/useMeta"
import { pageMeta } from "../data/meta"
import { container, item, entrance } from "../lib/motion"
import { isViewTransitioning } from "../lib/viewTransition"

const ALL_TAGS = ["All", ...new Set(projects.flatMap((p) => p.tags))]
const STATUS_FILTERS = ["All", "Complete", "WIP"]

export default function Projects() {
  const [activeTag, setActiveTag] = useState("All")
  const [activeStatus, setActiveStatus] = useState("All")
  // Skip the Framer entrance when arriving via a view-transition morph
  // (back-nav from a detail page) - the API animates the title back into
  // its row, and a stagger would leave the morph target at opacity 0.
  const arrivedViaMorph = isViewTransitioning()

  useMeta(pageMeta["/projects"])

  const filtered = projects.filter((p) => {
    const tagMatch = activeTag === "All" || p.tags.includes(activeTag)
    const statusMatch =
      activeStatus === "All" ||
      (activeStatus === "WIP" ? p.status === "wip" : p.status === "complete")
    return tagMatch && statusMatch
  })

  return (
    <m.main
      variants={container}
      initial={arrivedViaMorph ? false : entrance()}
      animate="show"
      className="max-w-5xl mx-auto px-6"
    >
      {/* ─── PAGE HEADER ───────────────────────────────────────────────────── */}
      {/*
       * "Projects" in display-sm scale — at 1440px this is ~72px tall.
       * The page label ("Work") and the title sit on different axes of the
       * same hierarchy, using size + mono/serif contrast rather than color.
       */}
      <section className="pt-16 pb-10">
        <m.p variants={item} className="font-mono text-[11px] text-rust uppercase tracking-widest mb-4">
          Work
        </m.p>
        <m.h1 variants={item} className="text-display-sm text-ink font-serif mb-3">
          Projects
        </m.h1>
        <m.p variants={item} className="font-serif text-warm text-ink mb-8 max-w-xl">
          Things I&apos;ve built, broken, and shipped. Some finished, some not.
        </m.p>
        <m.div variants={item} className="border-t border-line" />
      </section>

      {/* ─── STATUS FILTER ─────────────────────────────────────────────────── */}
      <m.div variants={item} className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Filter projects by status">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setActiveStatus(s)}
            aria-pressed={activeStatus === s}
            className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors duration-200 cursor-pointer ${
              activeStatus === s
                ? "bg-rust text-paper border-rust"
                : "text-warm border-line hover:border-rust hover:text-rust"
            }`}
          >
            {s}
          </button>
        ))}
      </m.div>

      {/* ─── TAG FILTER ────────────────────────────────────────────────────── */}
      <m.div variants={item} className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by tag">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors duration-200 cursor-pointer ${
              activeTag === tag
                ? "bg-ink text-paper border-ink"
                : "text-warm border-line hover:border-ink hover:text-ink"
            }`}
          >
            {tag}
          </button>
        ))}
      </m.div>

      {/* ─── PROJECT LIST ─────────────────────────────────────────────────── */}
      <div className="space-y-1 mb-16">
        {filtered.map((project, i) => (
          <m.div key={project.id} variants={item}>
            <ProjectCard index={i} {...project} />
          </m.div>
        ))}

        {filtered.length === 0 && (
          <m.p variants={item} className="font-mono text-sm text-warm py-8">
            No projects match that filter.
          </m.p>
        )}
      </div>
    </m.main>
  )
}
