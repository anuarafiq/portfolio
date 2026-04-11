import { useEffect } from "react"
import { motion } from "framer-motion"
import SectionWrapper from "../components/SectionWrapper"

export default function About() {
  useEffect(() => {
    document.title = "Anuar | About"
  }, [])

  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
          I&apos;m a software engineering student passionate about building things from scratch.
          This portfolio is my first real project outside of the curriculum — a place to document
          what I&apos;m learning and what I&apos;m building.
        </p>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          Currently learning: React, Tailwind CSS, Vite, and modern deployment workflows.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {["Python", "C#", "MySQL", "HTML", "CSS", "JavaScript", "React", "Git"].map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
