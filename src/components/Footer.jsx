export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-700 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <div className="flex justify-center gap-6">
        <a
          href="https://github.com/anuar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/anuar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="mailto:anuar@email.com"
          className="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Email
        </a>
      </div>
      <p className="mt-3">© {new Date().getFullYear()} Anuar</p>
    </footer>
  )
}
