import { Link } from 'react-router-dom'
import { featured } from '../data/entries'

// Every link from the Connect section that this rail replaced, URLs verbatim from git
// (9c577c8~1:src/components/Connect.tsx). Two of these had been retyped from memory and were
// wrong — the LinkedIn vanity slug and the Scholar user id are not guessable, and ORCID had
// been dropped entirely. Don't retype them; copy them.
const ELSEWHERE = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rajnish-dashora-89470242' },
  { label: 'GitHub', href: 'https://github.com/rajnishdashora' },
  { label: 'X', href: 'https://twitter.com/rajnishdashora' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?hl=en&user=zWiIg4AAAAAJ' },
  { label: 'ORCID', href: 'https://orcid.org/0000-0001-6650-762X' },
]

/**
 * Now — what he's actually doing, from Rajnish's own four (2026-10-04), reworked rather than pasted.
 *
 * His list read as a service menu: four noun phrases that would sit happily in a LinkedIn headline.
 * A "Now" should sound like someone mid-task. Changes made, and why:
 *   - "AI-native technology consulting" stacked three abstractions; "a consulting practice that is
 *     AI-native end to end" says what is actually being built.
 *   - His first two items both described the realfast work. Split so one is the practice being built
 *     and the other is the delivery inside client organisations.
 *   - "Advising startups" kept verbatim — short, plain, and already in the right register.
 *   - The harness line gained the clause that says what the series is about.
 * No facts added: every claim here is one of his four.
 */
const NOW = [
  'Building a consulting practice that is AI-native end to end',
  'Leading AI transformation and software delivery inside regulated enterprises',
  'Advising startups',
  'Writing a series on harness engineering — making AI coding agents reliable enough to trust',
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
