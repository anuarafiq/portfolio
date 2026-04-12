import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Not Found"
  }, [])

  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto px-6 pt-16"
    >
      <motion.p
        variants={item}
        className="font-mono text-[11px] text-rust uppercase tracking-widest mb-6"
      >
        404. Not Found
      </motion.p>

      <motion.h1
        variants={item}
        className="text-display-sm font-light font-serif text-ink mb-6"
      >
        Page not found.
      </motion.h1>

      <motion.div variants={item} className="border-t border-line mb-6" />

      <motion.p
        variants={item}
        className="font-serif text-warm text-base leading-relaxed mb-6"
      >
        The page you're looking for doesn't exist or has moved.
      </motion.p>

      <motion.div variants={item}>
        <Link
          to="/"
          className="font-mono text-[11px] text-rust uppercase tracking-wider hover:text-ink transition-colors duration-200"
        >
          ← Return home
        </Link>
      </motion.div>
    </motion.main>
  )
}
