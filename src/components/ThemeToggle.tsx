import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const systemQuery = () => window.matchMedia('(prefers-color-scheme: dark)')

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

// index.html has already set data-theme before first paint; this keeps it in sync.
function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    // Light is the default; the system preference is not followed. Only a choice made
    // here (or in another tab) changes the theme.
    const media = systemQuery()
    const onSystemChange = () => {}
    // Keep other open tabs in step with a choice made here.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      setTheme(readStored() ?? 'light')
    }
    media.addEventListener('change', onSystemChange)
    window.addEventListener('storage', onStorage)
    return () => {
      media.removeEventListener('change', onSystemChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage blocked (private mode etc.): the switch still applies for this page.
    }
    setTheme(next)
  }

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="fixed top-2 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 text-fg border border-line/20 backdrop-blur-md hover:bg-line/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  )
}

export default ThemeToggle
