import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { projects } from "../data/projects"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProjectDetail() {
  // useParams() reads the :slug segment from the URL.
  // If the user visits /projects/smart-parking, slug === "smart-parking".
  const { slug } = useParams()

  // Find the matching project. .find() returns the first match or undefined.
  const project = projects.find((p) => p.slug === slug)

  // Update the browser tab title whenever the project changes.
  useEffect(() => {
    document.title = project ? `${project.title} — Portfolio` : "Not Found — Portfolio"
  }, [project])

  // Guard clause: if no project matched, show a minimal not-found state.
  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24">
        <p className="font-mono text-sm text-warm mb-4">Project not found.</p>
        <Link
          to="/projects"
          className="font-mono text-[11px] uppercase tracking-widest text-rust hover:underline"
        >
          ← Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <motion.main variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto px-6">

      {/* ─── HEADER ─────────────────────────────────────────────────────── */}
      <header className="pt-16 pb-10">
        {/* Back nav + optional WIP badge */}
        <motion.div variants={item} className="flex items-center gap-4 mb-8">
          <Link
            to="/projects"
            className="font-mono text-[11px] uppercase tracking-widest text-warm hover:text-rust transition-colors duration-200"
          >
            ← Projects
          </Link>
          {project.status === "wip" && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-rust border border-rust px-1.5 py-0.5 leading-none">
              WIP
            </span>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={item}
          className="font-serif font-semibold text-ink leading-tight mb-4"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {project.title}
        </motion.h1>

        {/* Year + tags */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-warm">{project.year}</span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider text-warm border border-line px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div variants={item} className="border-t border-line mt-8" />
      </header>

      {/* ─── BODY ───────────────────────────────────────────────────────── */}
      <motion.article variants={item} className="pb-16 space-y-10">

        {/* Overview — uses longDescription if available, falls back to description */}
        <section>
          <p className="font-mono text-[11px] text-rust uppercase tracking-widest mb-3">Overview</p>
          <p className="font-serif text-ink text-lg leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </section>

        {/* Problem — only rendered if the field exists */}
        {project.problem && (
          <section>
            <p className="font-mono text-[11px] text-rust uppercase tracking-widest mb-3">Problem</p>
            <p className="font-serif text-ink text-lg leading-relaxed">{project.problem}</p>
          </section>
        )}

        {/* Solution — only rendered if the field exists */}
        {project.solution && (
          <section>
            <p className="font-mono text-[11px] text-rust uppercase tracking-widest mb-3">Solution</p>
            <p className="font-serif text-ink text-lg leading-relaxed">{project.solution}</p>
          </section>
        )}

        {/* Footer: GitHub link + back nav */}
        <div className="pt-8 border-t border-line flex items-center justify-between">
          <Link
            to="/projects"
            className="font-mono text-[11px] uppercase tracking-widest text-warm hover:text-rust transition-colors duration-200"
          >
            ← All Projects
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-rust hover:underline"
            >
              View on GitHub ↗
            </a>
          )}
        </div>
      </motion.article>
    </motion.main>
  )
}
