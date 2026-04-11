import { NavLink } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <span className="font-bold text-lg text-gray-900 dark:text-white">anuar.dev</span>
      <div className="flex items-center gap-6">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 dark:text-indigo-400 font-medium"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            }
          >
            {label}
          </NavLink>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  )
}
