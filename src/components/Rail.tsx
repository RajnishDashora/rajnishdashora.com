import { Link } from 'react-router-dom'
import { featured } from '../data/entries'

const ELSEWHERE = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajnishdashora/' },
  { label: 'GitHub', href: 'https://github.com/rajnishdashora' },
  { label: 'X', href: 'https://x.com/rajnishdashora' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=rajnishdashora' },
]

/**
 * Now carries only what is verifiably true today. Refining it — and deciding whether a
 * newsletter exists — are their own cards; an unconfirmed line here would be worse than a short one.
 */
const NOW = [
  { what: 'Writing a series on harness engineering', detail: 'how teams make AI coding agents reliable enough for regulated work' },
  { what: 'Rebuilding this site as a content hub', detail: 'writing, talks, papers and the moves between them in one place' },
]

const Box = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-l-2 border-accent pl-5 mb-8">
    <h3 className="text-xs uppercase tracking-[0.08em] text-muted mb-3">{title}</h3>
    {children}
  </div>
)

const Rail = ({ showStartHere = false }: { showStartHere?: boolean }) => (
  <aside className="text-sm">
    {showStartHere && featured.length > 0 && (
      <Box title="Start here">
        <ul className="space-y-3">
          {featured.map((e) => (
            <li key={e.id}>
              <Link to={e.href ?? '/index'} className="text-accent hover:text-accent-hover transition-colors leading-snug">
                {e.title}
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    )}

    <Box title="Now">
      <ul className="space-y-3">
        {NOW.map((n) => (
          <li key={n.what}>
            <span className="block font-semibold text-fg text-[15px]">{n.what}</span>
            <span className="text-muted">{n.detail}</span>
          </li>
        ))}
      </ul>
    </Box>

    <Box title="Elsewhere">
      <ul className="space-y-2">
        {ELSEWHERE.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </Box>
  </aside>
)

export default Rail
