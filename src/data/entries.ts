import { blogPosts } from './posts'

/**
 * One list drives the Index, the Home "Recent" block and search.
 *
 * Today it holds only the posts published on this site. Talks, papers, career moves and
 * writing that first appeared elsewhere each have their own card on the board and slot in
 * here without a rewrite: add the entries, and the type chips appear on their own.
 */
export type EntryType = 'Post' | 'Talk' | 'Research Paper' | 'Move'

/** Every type the Index filters by, in the order the chips show. Types with nothing in them yet
 *  still appear, disabled — the shape of the hub is visible before the content lands. */
export const ALL_TYPES: EntryType[] = ['Post', 'Talk', 'Move', 'Research Paper']

export interface Entry {
  id: string
  type: EntryType
  /** Display date, e.g. "October 3, 2026" — matches posts.ts */
  date: string
  /** Sortable, derived from `date`. Parsed as UTC so the day never shifts with the timezone. */
  iso: string
  title: string
  summary?: string
  /** Where this first appeared, when that wasn't here — a venue, journal or publication. */
  where?: string
  /** Internal link, when there is one. */
  href?: string
  /** Shown under "Start here". */
  featured?: boolean
}

const toIso = (display: string): string => {
  const t = new Date(`${display} 00:00:00 UTC`)
  return Number.isNaN(t.getTime()) ? '' : t.toISOString().slice(0, 10)
}

/** The three worth reading first, for the "Start here" rail. */
const FEATURED = new Set([
  '2026-10-03-soc2-iso27001-engineering-problem',
  '2026-07-18-build-vs-buy-age-of-ai',
  '2026-07-05-earning-enterprise-ai-trust',
])

const postEntries: Entry[] = blogPosts.map((p) => ({
  id: `post-${p.slug}`,
  type: 'Post',
  date: p.date,
  iso: toIso(p.date),
  title: p.title,
  summary: p.excerpt,
  href: `/posts/${p.slug}`,
  featured: FEATURED.has(p.slug),
}))

export const entries: Entry[] = [...postEntries].sort((a, b) => b.iso.localeCompare(a.iso))

/** How many entries each type has, so the chips can disable the empty ones. */
export const countsByType = (): Record<string, number> =>
  entries.reduce<Record<string, number>>((acc, e) => ({ ...acc, [e.type]: (acc[e.type] ?? 0) + 1 }), {})

export const featured = entries.filter((e) => e.featured)

/** "October 3, 2026" -> "Oct 2026", for the date column. */
export const shortDate = (iso: string): string =>
  iso ? new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : ''
