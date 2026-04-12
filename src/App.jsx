import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import About from "./pages/About"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import ProjectDetail from "./pages/ProjectDetail"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <BrowserRouter>
      {/* min-h-dvh: uses the dynamic viewport height on mobile (avoids iOS Safari chrome issues) */}
      <div className="min-h-dvh flex flex-col bg-paper text-ink">
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
      </div>
    </BrowserRouter>
  )
}
