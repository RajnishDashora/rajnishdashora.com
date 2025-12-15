import { Github, Linkedin, Twitter, ExternalLink, GraduationCap } from 'lucide-react'
import orcidIcon from '../assets/icons/orcid.svg'

const Connect = () => {
  return (
    <section id="connect" className="py-24 bg-[#111827] text-[#F9FAFB]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-[#9CA3AF]">
            I'm always eager to connect, collaborate, and share insights from a journey filled with learning, adapting, and innovating.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <a
            href="https://github.com/rajnishdashora"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <Github className="w-12 h-12" />
            <div className="text-center">
              <div className="text-sm text-[#9CA3AF] group-hover:text-white mb-1">Code & Projects</div>
              <div className="font-semibold flex items-center gap-1 flex-wrap justify-center">
                <span>GitHub</span>
                <span className="text-[#22D3EE]">@rajnishdashora</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/rajnish-dashora-89470242"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <Linkedin className="w-12 h-12" />
            <div className="text-center">
              <div className="text-sm text-[#9CA3AF] group-hover:text-white mb-1">Professional Network</div>
              <div className="font-semibold flex items-center gap-1 flex-wrap justify-center">
                <span>LinkedIn</span>
                <span className="text-[#22D3EE]">rajnish-dashora-89470242</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </a>

          <a
            href="https://twitter.com/rajnishdashora"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <Twitter className="w-12 h-12" />
            <div className="text-center">
              <div className="text-sm text-[#9CA3AF] group-hover:text-white mb-1">Thoughts & Updates</div>
              <div className="font-semibold flex items-center gap-1 flex-wrap justify-center">
                <span>Twitter</span>
                <span className="text-[#22D3EE]">@rajnishdashora</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </a>

          <a
            href="https://scholar.google.com/citations?hl=en&user=zWiIg4AAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <GraduationCap className="w-12 h-12" />
            <div className="text-center">
              <div className="text-sm text-[#9CA3AF] group-hover:text-white mb-1">Research & Publications</div>
              <div className="font-semibold flex items-center gap-1 flex-wrap justify-center">
                <span>Google Scholar</span>
                <span className="text-[#22D3EE]">zWiIg4AAAAAJ</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </a>

          <a
            href="https://orcid.org/0000-0001-6650-762X"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <img src={orcidIcon} alt="ORCID" className="w-12 h-12" />
            <div className="text-center">
              <div className="text-sm text-[#9CA3AF] group-hover:text-white mb-1">Academic Identity</div>
              <div className="font-semibold flex items-center gap-1 flex-wrap justify-center">
                <span>ORCID</span>
                <span className="text-[#22D3EE]">0000-0001-6650-762X</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Connect
