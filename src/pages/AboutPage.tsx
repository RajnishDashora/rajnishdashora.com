import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Rail from '../components/Rail'
import about from '../data/about.json'

/**
 * Copy lives in src/data/about.json so this page and scripts/prerender.mjs render the same words.
 * Roles carry the numbers, next to the work that produced them — they are deliberately not
 * repeated as a strip of metric tiles anywhere else on the site.
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

        <H>Roles</H>
        <div>
          {about.roles.map((r) => (
            <div key={r.dates} className="grid sm:grid-cols-[150px_1fr] gap-x-4 gap-y-1 py-4 border-b border-dotted border-line/20">
              <div className="text-sm text-muted">{r.dates}</div>
              <div>
                <div className="text-fg">
                  <span className="font-semibold">{r.title}</span>, {r.org}
                </div>
                <div className="text-sm text-muted mt-1">{r.scope}</div>
                <div className="text-sm text-muted mt-1">{r.outcomes.join(' · ')}</div>
              </div>
            </div>
          ))}
        </div>

        <H>Writing &amp; speaking</H>
        <p className="text-muted max-w-[68ch]">
          {about.writing}{' '}
          <Link to="/all" className="text-accent hover:text-accent-hover transition-colors">
            It's all in one list →
          </Link>
        </p>

        <H>Short bio</H>
        <p className="text-[15px] text-muted max-w-[68ch]">{about.bio}</p>
      </main>
      <Rail showStartHere />
    </div>
  </div>
)

export default AboutPage
