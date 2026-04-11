import { useEffect } from "react"
import { motion } from "framer-motion"
import SectionWrapper from "../components/SectionWrapper"
import ProjectCard from "../components/ProjectCard"
import { projects } from "../data/projects"

export default function Projects() {
  useEffect(() => {
    document.title = "Anuar | Projects"
  }, [])

  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Projects</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          A collection of things I&apos;ve built. More details coming soon.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
