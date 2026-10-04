import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/all', label: 'Index' },
  { to: '/about', label: 'About' },
]

const Nav = () => {
  const { pathname } = useLocation()
  return (
    <header className="border-b border-line/10 bg-page">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-6">
        <Link to="/" className="font-bold tracking-tight text-fg hover:text-accent transition-colors">
          Rajnish Dashora
        </Link>
        <nav className="flex gap-5 text-[15px]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-current={pathname === l.to ? 'page' : undefined}
              className={
                pathname === l.to
                  ? 'text-fg font-semibold'
                  : 'text-muted hover:text-fg transition-colors'
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Nav
