import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { projects } from "../data/projects"
import ProjectCard from "../components/ProjectCard"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// Collect all unique tags from the projects array
const ALL_TAGS = ["All", ...new Set(projects.flatMap((p) => p.tags))]

export default function Projects() {
  const [activeTag, setActiveTag] = useState("All")

  useEffect(() => {
    document.title = "Work — Anuar Afiq"
  }, [])

  const filtered =
    activeTag === "All" ? projects : projects.filter((p) => p.tags.includes(activeTag))

  return (
    <motion.main variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto px-6">
      {/* ─── PAGE HEADER ───────────────────────────────────────────────────── */}
      {/*
       * "Projects" in display-sm scale — at 1440px this is ~72px tall.
       * The page label ("Work") and the title sit on different axes of the
       * same hierarchy, using size + mono/serif contrast rather than color.
       */}
      <section className="pt-16 pb-10">
        <motion.p variants={item} className="font-mono text-[11px] text-rust uppercase tracking-widest mb-4">
          Work
        </motion.p>
        <motion.h1 variants={item} className="text-display-sm text-ink font-serif mb-3">
          Projects
        </motion.h1>
        <motion.p variants={item} className="font-serif text-warm text-lg mb-8 max-w-xl">
          Things I&apos;ve built, broken, and shipped. Some finished, some not.
        </motion.p>
        <motion.div variants={item} className="border-t border-line" />
      </section>

      {/* ─── TAG FILTER ────────────────────────────────────────────────────── */}
      {/*
       * Active state: filled ink/paper. Inactive: border only.
       * No rounded corners — consistent with the sharp editorial aesthetic.
       */}
      <motion.div variants={item} className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by tag">
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
      </motion.div>

      {/* ─── PROJECT LIST ─────────────────────────────────────────────────── */}
      <div className="space-y-1 mb-16">
        {filtered.map((project, i) => (
          <motion.div key={project.id} variants={item}>
            <ProjectCard index={i} {...project} />
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <motion.p variants={item} className="font-mono text-sm text-warm py-8">
            No projects match that filter.
          </motion.p>
        )}
      </div>
    </motion.main>
  )
}
