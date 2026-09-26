import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import About from "./pages/About"
import Record from "./pages/Record"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import ProjectDetail from "./pages/ProjectDetail"
import NotFound from "./pages/NotFound"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
  return null
}

export default function App() {
  // min-h-dvh: uses the dynamic viewport height on mobile (avoids iOS Safari chrome issues)
  return (
    <div className="min-h-dvh flex flex-col bg-paper text-ink">
      <ScrollToTop />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] bg-paper text-ink border border-line focus:px-3 focus:py-2 font-mono text-[11px] uppercase tracking-widest"
      >
        Skip to content
      </a>
      <Nav />
      <div id="content" tabIndex={-1} className="flex-1 outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/record" element={<Record />} />
          <Route path="/notes" element={<Blog />} />
          <Route path="/notes/:slug" element={<BlogPost />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </div>
  )
}
