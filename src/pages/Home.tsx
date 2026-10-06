import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Rail from '../components/Rail'
import profileImage from '../assets/images/rajnish.png'
import { entries, shortDate } from '../data/entries'

const Home = () => {
  const recent = entries.slice(0, 5)
  return (
    <div className="min-h-screen bg-page">
      <Nav />
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[1fr_260px] gap-14 py-12">
        <main className="min-w-0">
          <div className="flex items-center gap-7 mb-9">
            <img
              src={profileImage}
              alt="Rajnish Dashora"
              className="w-28 h-28 rounded-full border-2 border-line/20 object-cover shrink-0"
            />
            <div>
              <h1 className="text-4xl md:text-[2.75rem] font-bold tracking-tight text-fg leading-tight">
                Rajnish Dashora
              </h1>
              <p className="text-muted mt-1">VP Engineering, realfast</p>
            </div>
          </div>

          {/* Short on purpose: Home introduces and points onward; the longer version is on About.
              Timeless by design — no technology, no industry list, no current subjects, so it
              doesn't need rewriting when the work or the writing moves on. Humble and
              reading-first: the bio is context, the writing is the point. */}
          <p className="text-[19px] leading-relaxed text-fg max-w-[62ch]">
            I'm Rajnish. I build engineering teams and the platforms they run on — currently at{' '}
            <a href="https://www.realfast.ai" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:text-accent-hover transition-colors">realfast</a>,
            before that <span className="font-semibold">Gojek</span> and{' '}
            <span className="font-semibold">McKinsey</span>. I write here mostly to work out what I
            think: what made something reliable, what it cost, and what I'd do differently.
          </p>

          <h2 className="text-xs uppercase tracking-[0.08em] text-muted mt-12 mb-4">Recent</h2>
          <div className="border-t border-line/10">
            {recent.map((e) => (
              <Link
                key={e.id}
                to={e.href ?? '/all'}
                className="grid grid-cols-[110px_1fr] gap-3 items-baseline py-3.5 border-b border-line/10 group"
              >
                <span className="text-sm text-muted">{shortDate(e.iso)}</span>
                <span className="text-[17px] text-fg group-hover:text-accent transition-colors leading-snug">
                  {e.title}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-5">
            <Link to="/all" className="text-accent hover:text-accent-hover transition-colors">
              Everything — writing, talks, papers and moves →
            </Link>
          </p>
        </main>
        <Rail />
      </div>
    </div>
  )
}

export default Home
