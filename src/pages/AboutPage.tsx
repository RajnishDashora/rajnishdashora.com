import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Rail from '../components/Rail'
import about from '../data/about.json'

/**
 * Copy lives in src/data/about.json so this page and scripts/prerender.mjs render the same words.
 *
 * The Roles table was removed on 2026-10-04 — it repeated what the career moves will say in the
 * Index (ADMIN-22) and what LinkedIn and the resume already carry. Note the side effect: the
 * scale numbers (0 → 50+, SOC 2 + ISO 27001, 2wk → <5min, 1,000+ microservices) now appear
 * nowhere on the site. See ADMIN-22 for where they should land.
 */
const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs uppercase tracking-[0.08em] text-muted mt-12 mb-4">{children}</h2>
)

const AboutPage = () => (
  <div className="min-h-screen bg-page">
    <Nav />
    <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[1fr_260px] gap-14 py-12">
      <main className="min-w-0">
        <h1 className="text-4xl font-bold tracking-tight text-fg mb-6">About</h1>

        <p className="text-[21px] leading-snug text-fg max-w-[62ch] mb-6">{about.lead}</p>

        <div className="space-y-4 text-[17px] leading-relaxed text-muted max-w-[68ch]">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        <H>Writing &amp; speaking</H>
        <p className="text-muted max-w-[68ch]">
          {about.writing}{' '}
          <Link to="/all" className="text-accent hover:text-accent-hover transition-colors">
            It's all in one list →
          </Link>
        </p>

      </main>
      <Rail showStartHere />
    </div>
  </div>
)

export default AboutPage
