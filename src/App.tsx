import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import About from './components/About'
import Writing from './components/Writing'
import Connect from './components/Connect'
import Footer from './components/Footer'
import BlogPost from './components/BlogPost'

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:slug" element={<BlogPost />} />
      </Routes>
    </Router>
  )
}

export default App
