import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import About from './components/About'
import Writing from './components/Writing'
import Connect from './components/Connect'
import Footer from './components/Footer'
import BlogPost from './components/BlogPost'
import { trackPageView } from './utils/analytics'

function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Writing />
      <Connect />
      <Footer />
    </div>
  )
}

function AppContent() {
  const location = useLocation()

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:slug" element={<BlogPost />} />
    </Routes>
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
