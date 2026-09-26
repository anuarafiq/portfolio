import { Link } from "react-router-dom"
import { m } from "framer-motion"
import { posts } from "../data/posts"
import { useMeta } from "../hooks/useMeta"
import { pageMeta } from "../data/meta"
import { container, item, entrance } from "../lib/motion"
import { formatDateShort as formatDate } from "../lib/utils"

export default function Blog() {
  useMeta(pageMeta["/notes"])

  return (
    <m.main variants={container} initial={entrance()} animate="show" className="max-w-5xl mx-auto px-6">
      {/* ─── PAGE HEADER ───────────────────────────────────────────────────── */}
      <section className="pt-16 pb-10">
        <m.p variants={item} className="font-mono text-[11px] text-rust uppercase tracking-widest mb-4">
          Notes
        </m.p>
        <m.h1 variants={item} className="text-display-sm text-ink font-serif mb-3">
          Thinking out loud
        </m.h1>
        <m.p variants={item} className="font-serif text-warm text-lg max-w-xl mb-8">
          Notes on machine learning, engineering, and whatever I&apos;m chewing on. Not polished, just honest.
        </m.p>
        <m.div variants={item} className="border-t border-line" />
      </section>

      {/* ─── POST ARCHIVE ─────────────────────────────────────────────────── */}
      {/*
       * Archive list layout: date anchored left in fixed-width mono column,
       * title and excerpt fill the remaining space.
       * The .project-row hover applies here too — consistent system.
       */}
      <m.div variants={item} className="pb-16">
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
                <p className="font-serif text-ink text-base leading-relaxed mb-3">
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
      </m.div>
    </m.main>
  )
}
