import { useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { m } from "framer-motion"
import { posts } from "../data/posts"
import { useScrollProgress } from "../hooks/useScrollProgress"
import { useMeta } from "../hooks/useMeta"
import { container, item, entrance } from "../lib/motion"
import { formatDate } from "../lib/utils"
import NotFound from "./NotFound"

function CodeBlock({ children, ...props }) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef(null)

  const codeEl = children?.props || {}
  const language = codeEl["data-language"] || ""

  function handleCopy() {
    const text = preRef.current?.textContent || ""
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative group">
      {language && (
        <span
          className="absolute top-2.5 left-6 font-mono text-warm select-none"
          style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          {language}
        </span>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2.5 right-3 font-mono text-warm border border-line px-2 py-0.5 hover:text-rust hover:border-rust transition-colors duration-200 cursor-pointer select-none"
        style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  )
}

const mdxComponents = {
  pre: (props) => <CodeBlock {...props} />,
  p: ({ children }) => (
    <p className="font-serif text-ink text-lg leading-relaxed">{children}</p>
  ),
  h3: ({ children }) => (
    <h3
      className="font-serif font-semibold text-ink text-2xl mt-8 mb-1"
      style={{ letterSpacing: "-0.02em" }}
    >
      {children}
    </h3>
  ),
  blockquote: ({ children }) => <div className="pull-quote">{children}</div>,
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  // Separate component so NotFound's useMeta is the only one that runs for an unknown slug.
  return post ? <PostView post={post} /> : <NotFound />
}

function PostView({ post }) {
  useMeta({
    title: `${post.title} - Anuar Afiq`,
    description: post.excerpt ?? "A note by Anuar Afiq.",
    type: "article",
    image: `/og/notes-${post.slug}.png`,
  })

  const progress = useScrollProgress()
  // posts is sorted newest first, so the next index is the older note.
  const index = posts.indexOf(post)
  const newer = posts[index - 1]
  const older = posts[index + 1]

  const PostContent = post.Component

  return (
    <m.main variants={container} initial={entrance()} animate="show" className="max-w-3xl mx-auto px-6">
      {/* ─── READING PROGRESS ───────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-rust transition-[width] duration-150 ease-out z-50"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />

      {/* ─── ARTICLE HEADER ─────────────────────────────────────────────── */}
      <header className="pt-16 pb-10">
        <m.div variants={item} className="flex items-center gap-4 mb-8">
          <Link
            to="/notes"
            className="font-mono text-[11px] uppercase tracking-widest text-warm hover:text-rust transition-colors duration-200"
          >
            ← Notes
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-wider text-warm border border-line px-2 py-0.5">
            {post.category}
          </span>
        </m.div>

        <m.h1
          variants={item}
          className="font-serif font-semibold text-ink leading-tight mb-4"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {post.title}
        </m.h1>

        <m.div variants={item} className="flex items-center gap-5 font-mono text-[11px] text-warm">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} read</span>
        </m.div>

        <m.div variants={item} className="border-t border-line mt-8" />
      </header>

      {/* ─── ARTICLE BODY ───────────────────────────────────────────────── */}
      <m.article variants={item} className="pb-16">
        <div className="article-body space-y-5">
          <PostContent components={mdxComponents} />
        </div>

        <div className="mt-12 pt-8 border-t border-line">
          <nav aria-label="More notes" className="grid grid-cols-2 gap-6 mb-8">
            {older && (
              <Link to={`/notes/${older.slug}`} className="group col-start-1 min-w-0">
                <span className="font-mono text-[11px] uppercase tracking-widest text-warm group-hover:text-rust transition-colors duration-200">
                  ← Older
                </span>
                <span className="block font-serif text-ink text-lg leading-snug mt-1 group-hover:text-rust transition-colors duration-200">
                  {older.title}
                </span>
              </Link>
            )}
            {newer && (
              <Link to={`/notes/${newer.slug}`} className="group col-start-2 min-w-0 text-right">
                <span className="font-mono text-[11px] uppercase tracking-widest text-warm group-hover:text-rust transition-colors duration-200">
                  Newer →
                </span>
                <span className="block font-serif text-ink text-lg leading-snug mt-1 group-hover:text-rust transition-colors duration-200">
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>
          <Link
            to="/notes"
            className="font-mono text-[11px] uppercase tracking-widest text-warm hover:text-rust transition-colors duration-200"
          >
            ← All Notes
          </Link>
        </div>
      </m.article>
    </m.main>
  )
}
