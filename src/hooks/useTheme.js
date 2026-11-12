import { useEffect, useState, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

// Subscribes to OS theme changes; React removes the listener on unmount.
function subscribeSystemDark(callback) {
  const mq = window.matchMedia(DARK_QUERY)
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}
const getSystemDark = () => window.matchMedia(DARK_QUERY).matches
const getServerSystemDark = () => false

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
  // typeof guard: this also renders at build time (entry-server.jsx), where there is no window
  const [theme, setTheme] = useState(
    () => (typeof window === 'undefined' ? null : localStorage.getItem(STORAGE_KEY)) || 'system'
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

  const systemDark = useSyncExternalStore(subscribeSystemDark, getSystemDark, getServerSystemDark)
  const isDark = theme === 'dark' || (theme === 'system' && systemDark)

  function toggle() {
    setTheme(isDark ? 'light' : 'dark')
  }

  return { isDark, toggle }
}
