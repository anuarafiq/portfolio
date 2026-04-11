import { motion } from "framer-motion"

export default function ProjectCard({ title, description, tech, githubUrl, comingSoon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col gap-3 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{title}</h3>
        {comingSoon && (
          <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full">
            Coming Soon
          </span>
        )}
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-sm">{description}</p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {tech.map((t) => (
          <span
            key={t}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>

      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-1"
        >
          View on GitHub →
        </a>
      )}
    </motion.div>
  )
}
