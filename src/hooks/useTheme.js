import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Manages light/dark theme with three states:
 *   'system' — follows OS preference (default, no localStorage entry)
 *   'light'  — user manually chose light
 *   'dark'   — user manually chose dark
 *
 * Writes data-theme to <html> so CSS selectors can target it.
 * On 'system', the attribute is removed and the CSS media query takes over.
 */
export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'system'
  )

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      root.removeAttribute('data-theme')
      localStorage.removeItem(STORAGE_KEY)
    } else {
      root.setAttribute('data-theme', theme)
      localStorage.setItem(STORAGE_KEY, theme)
    }
  }, [theme])

  const isDark =
    theme === 'dark' ||
    (theme === 'system' && getSystemTheme() === 'dark')

  function toggle() {
    setTheme(isDark ? 'light' : 'dark')
  }

  return { isDark, toggle }
}
