import { useState, useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

function Navbar({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Code2 className="h-5 w-5 text-primary" />
          <span>lukaszradziak.pl</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                pathname === to
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggle} aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-border/40 bg-background px-6 py-3 md:hidden">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === to
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

export default function App() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar dark={dark} onToggle={() => setDark(!dark)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Łukasz Radziak — Built with React & shadcn/ui
      </footer>
    </div>
  )
}