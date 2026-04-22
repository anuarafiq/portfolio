import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { posts } from "../data/posts"
import { useMeta } from "../hooks/useMeta"
import { container, item } from "../lib/motion"
import { formatDateShort as formatDate } from "../lib/utils"

export default function Blog() {
  useMeta({
    title: "Notes - Anuar Afiq",
    description: "Writing on software, learning, and building things - notes by Anuar Afiq.",
  })

  return (
    <motion.main variants={container} initial="hidden" animate="show" className="max-w-5xl mx-auto px-6">
      {/* ─── PAGE HEADER ───────────────────────────────────────────────────── */}
      <section className="pt-16 pb-10">
        <motion.p variants={item} className="font-mono text-[11px] text-rust uppercase tracking-widest mb-4">
          Notes
        </motion.p>
        <motion.h1 variants={item} className="text-display-sm text-ink font-serif mb-3">
          Thinking out loud
        </motion.h1>
        <motion.p variants={item} className="font-serif text-warm text-lg max-w-xl mb-8">
          Notes on machine learning, engineering, and whatever I&apos;m chewing on. Not polished, just honest.
        </motion.p>
        <motion.div variants={item} className="border-t border-line" />
      </section>

      {/* ─── POST ARCHIVE ─────────────────────────────────────────────────── */}
      {/*
       * Archive list layout: date anchored left in fixed-width mono column,
       * title and excerpt fill the remaining space.
       * The .project-row hover applies here too — consistent system.
       */}
      <motion.div variants={item} className="pb-16">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/notes/${post.slug}`}
            className="group block py-6 border-b border-line project-row px-4 -mx-4"
          >
            <div className="flex flex-wrap items-start gap-x-6 gap-y-2">
              {/* Date — fixed-width column so all titles align vertically */}
              <time
                dateTime={post.date}
                className="font-mono text-[11px] text-warm shrink-0 w-24 mt-1.5 leading-snug"
              >
                {formatDate(post.date)}
              </time>

              <div className="flex-1 min-w-0">
                <h2 className="font-serif font-semibold text-ink text-xl leading-tight mb-2 group-hover:text-rust transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="font-serif font-bold text-warm text-base leading-relaxed mb-3 text-justify">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-warm border border-line px-2 py-0.5">
                    {post.category}
                  </span>
                  <span className="font-mono text-[11px] text-warm">{post.readingTime} read</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </motion.main>
  )
}
