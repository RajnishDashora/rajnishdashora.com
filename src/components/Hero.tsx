import { Github, Linkedin, Twitter } from 'lucide-react'
import profileImage from '../assets/images/rajnish.png'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0F172A] text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="mb-8 animate-fade-in-up">
          <img
            src={profileImage}
            alt="Rajnish Dashora"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto border-2 border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.5),0_6px_20px_rgba(34,211,238,0.4),0_-2px_10px_rgba(255,255,255,0.15)] object-cover"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up animation-delay-100 text-[#F9FAFB]">
          Rajnish Dashora
        </h1>
        <p className="text-xl md:text-2xl text-[#9CA3AF] mb-8 animate-fade-in-up animation-delay-200 font-light italic">
          Structure Chaos, Build Teams, Solve Problems, Write Code, Repeat.
        </p>
        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          <p className="text-lg md:text-xl text-[#F9FAFB] animate-fade-in-up animation-delay-300">
            Hi, I'm Rajnish. I focus on building teams and systems that make a real impact—
            from McKinsey & Company to Gojek's hypergrowth to now leading AI
            development at <a href="https://www.realfast.ai" target="_blank" rel="noopener noreferrer" className="text-[#22D3EE] font-semibold hover:text-[#01C16A] transition-colors">realfast</a>.
          </p>
          <p className="text-lg md:text-xl text-[#9CA3AF] animate-fade-in-up animation-delay-400">
            I love the craft: building teams, structuring chaos, coaching people, and
            creating platforms that solve real problems. Always learning, always building.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
          <a
            href="https://github.com/rajnishdashora"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <Github className="w-5 h-5" />
            <span className="font-medium">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/rajnish-dashora-89470242"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <Linkedin className="w-5 h-5" />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a
            href="https://twitter.com/rajnishdashora"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <Twitter className="w-5 h-5" />
            <span className="font-medium">Twitter</span>
          </a>
        </div>

        <div className="mt-16 animate-bounce">
          <a href="#about" className="text-white/60 hover:text-white transition-colors">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
