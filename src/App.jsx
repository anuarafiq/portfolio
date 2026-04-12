import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Analytics } from "@vercel/analytics/react"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import About from "./pages/About"
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
  return (
    <BrowserRouter>
      {/* min-h-dvh: uses the dynamic viewport height on mobile (avoids iOS Safari chrome issues) */}
      <div className="min-h-dvh flex flex-col bg-paper text-ink">
        <ScrollToTop />
        <Nav />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/notes" element={<Blog />} />
            <Route path="/notes/:slug" element={<BlogPost />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <Analytics />
      </div>
    </BrowserRouter>
  )
}
