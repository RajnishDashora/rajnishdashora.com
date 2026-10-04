import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Rail from '../components/Rail'
import { ALL_TYPES, countsByType, entries, shortDate, type EntryType } from '../data/entries'

const Row = ({ e }: { e: (typeof entries)[number] }) => {
  const src = e.type === 'Move' ? '' : e.type !== 'Post' ? e.type : (e.where ?? '')
  const body = (
    <>
      {e.featured && <span className="text-accent mr-1">★</span>}
      {e.title}
      {src && <span className="text-muted text-sm ml-1.5">— {src}</span>}
    </>
  )
  return (
    <div className="flex gap-4 items-baseline py-2.5 border-b border-dotted border-line/20">
      <span className="shrink-0 w-[92px] text-sm text-muted tabular-nums">{shortDate(e.iso)}</span>
      {e.href ? (
        <Link to={e.href} className="text-[17px] leading-snug text-fg hover:text-accent hover:underline underline-offset-4 transition-colors">
          {body}
        </Link>
      ) : (
        <span className="text-[17px] leading-snug text-fg">{body}</span>
      )}
    </div>
  )
}

const IndexPage = () => {
  const [q, setQ] = useState('')
  const [type, setType] = useState<EntryType | 'All'>('All')
  const counts = countsByType()

  const byYear = useMemo(() => {
    const needle = q.toLowerCase().trim()
    const matched = entries.filter(
      (e) =>
        (type === 'All' || e.type === type) &&
        (!needle || [e.title, e.summary, e.where].filter(Boolean).join(' ').toLowerCase().includes(needle)),
    )
    const groups = new Map<string, typeof entries>()
    matched.forEach((e) => {
      const y = e.iso.slice(0, 4)
      groups.set(y, [...(groups.get(y) ?? []), e])
    })
    return [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0]))
  }, [q, type])

  return (
    <div className="min-h-screen bg-page">
      <Nav />
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[1fr_260px] gap-14 py-12">
        <main className="min-w-0">
          <h1 className="text-4xl font-bold tracking-tight text-fg mb-2">Index</h1>
          <p className="text-muted mb-8">
            Writing, talks, papers and the moves between them — one list, newest first.
          </p>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            aria-label="Search everything"
            className="w-full px-4 py-2.5 rounded-lg border border-line/15 bg-page text-fg placeholder:text-muted focus:outline focus:outline-2 focus:outline-accent"
          />

          {/* One filter: content type. Types with nothing in them yet are shown but disabled —
              the shape of the hub is visible without anyone clicking into an empty list. */}
          <div className="flex gap-2 flex-wrap mt-3">
            {(['All', ...ALL_TYPES] as const).map((t) => {
              const empty = t !== 'All' && !counts[t]
              const on = type === t
              return (
                <button
                  key={t}
                  type="button"
                  disabled={empty}
                  onClick={() => setType(t as EntryType | 'All')}
                  aria-pressed={on}
                  title={empty ? 'Nothing here yet' : undefined}
                  className={
                    'text-xs px-3 py-1 rounded-full border transition-colors ' +
                    (on
                      ? 'bg-fg text-page border-fg'
                      : empty
                        ? 'border-line/10 text-muted/50 cursor-not-allowed'
                        : 'border-line/20 text-fg hover:border-line/40')
                  }
                >
                  {t}
                </button>
              )
            })}
          </div>

          <div className="mt-8">
            {byYear.length === 0 && <p className="text-muted">Nothing matches.</p>}
            {byYear.map(([year, items]) => (
              <section key={year}>
                <h2 className="text-2xl font-bold text-fg mt-8 mb-1">{year}</h2>
                {items.map((e) => (
                  <Row key={e.id} e={e} />
                ))}
              </section>
            ))}
          </div>
        </main>
        <Rail />
      </div>
    </div>
  )
}

export default IndexPage
