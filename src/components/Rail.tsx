import { Link } from 'react-router-dom'
import { featured } from '../data/entries'

const ELSEWHERE = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajnishdashora/' },
  { label: 'GitHub', href: 'https://github.com/rajnishdashora' },
  { label: 'X', href: 'https://x.com/rajnishdashora' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=rajnishdashora' },
]

/**
 * Now — what he's actually doing. Rajnish's own words (2026-10-04), lightly sentence-cased.
 *
 * It opened with "Rebuilding this site as a content hub", which was the site talking about itself.
 * A reader doesn't care how the page was made; they care what the person is working on.
 */
const NOW = [
  'Building AI-native technology consulting',
  'Leading AI transformation & software delivery for regulated enterprises',
  'Advising startups',
  'Writing a series on harness engineering',
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
      <ul className="space-y-2.5">
        {NOW.map((n) => (
          <li key={n} className="text-[15px] text-fg leading-snug">
            {n}
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
