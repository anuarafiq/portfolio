import { useState, useEffect } from "react"

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const scrollable = document.body.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      setProgress(Math.min(1, window.scrollY / scrollable))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return progress
}
