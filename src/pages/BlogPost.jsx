import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { posts } from "../data/posts"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

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
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  useEffect(() => {
    document.title = post ? `${post.title} — Portfolio` : "Not Found — Portfolio"
  }, [post])

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24">
        <p className="font-mono text-sm text-warm mb-4">Post not found.</p>
        <Link
          to="/notes"
          className="font-mono text-[11px] uppercase tracking-widest text-rust hover:underline"
        >
          ← Back to Notes
        </Link>
      </div>
    )
  }

  const PostContent = post.Component

  return (
    <motion.main variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto px-6">
      {/* ─── ARTICLE HEADER ─────────────────────────────────────────────── */}
      <header className="pt-16 pb-10">
        <motion.div variants={item} className="flex items-center gap-4 mb-8">
          <Link
            to="/notes"
            className="font-mono text-[11px] uppercase tracking-widest text-warm hover:text-rust transition-colors duration-200"
          >
            ← Notes
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-wider text-warm border border-line px-2 py-0.5">
            {post.category}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-serif font-semibold text-ink leading-tight mb-4"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {post.title}
        </motion.h1>

        <motion.div variants={item} className="flex items-center gap-5 font-mono text-[11px] text-warm">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} read</span>
        </motion.div>

        <motion.div variants={item} className="border-t border-line mt-8" />
      </header>

      {/* ─── ARTICLE BODY ───────────────────────────────────────────────── */}
      <motion.article variants={item} className="pb-16">
        <div className="space-y-5 text-justify">
          <PostContent components={mdxComponents} />
        </div>

        <div className="mt-12 pt-8 border-t border-line">
          <Link
            to="/notes"
            className="font-mono text-[11px] uppercase tracking-widest text-warm hover:text-rust transition-colors duration-200"
          >
            ← All Notes
          </Link>
        </div>
      </motion.article>
    </motion.main>
  )
}
