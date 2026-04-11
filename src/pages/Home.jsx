import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import SectionWrapper from "../components/SectionWrapper"

export default function Home() {
  useEffect(() => {
    document.title = "Anuar | Home"
  }, [])

  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center gap-6 py-16"
      >
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Hi, I&apos;m Anuar 👋
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl">
          A software engineering student building real projects, learning by doing.
        </p>
        <Link
          to="/projects"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          View My Projects
        </Link>
      </motion.div>
    </SectionWrapper>
  )
}
