import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import IndexPage from './pages/IndexPage'
import AboutPage from './pages/AboutPage'
import Footer from './components/Footer'
import BlogPost from './components/BlogPost'
import ThemeToggle from './components/ThemeToggle'
import { trackPageView } from './utils/analytics'

function AppContent() {
  const location = useLocation()

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  // Post pages manage their own scroll; everything else starts at the top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<IndexPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts/:slug" element={<BlogPost />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
