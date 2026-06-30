import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { navLinks } from '../../pages/home/data/homeContent'

function isNavActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  if (href === '/about') return pathname === '/about'
  if (href === '/library') return pathname === '/library'
  if (href === '/blogs') return pathname.startsWith('/blogs')
  if (href === '/contact') return pathname === '/contact'
  return false
}

export function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-[72px]">
        <Link
          to="/"
          className="font-serif text-xl font-semibold italic text-navy md:text-2xl"
        >
          Dr. Paul A. Stokes
        </Link>

        <nav className="hidden items-center gap-11 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-base transition-colors hover:text-accent ${
                isNavActive(link.href, pathname)
                  ? 'font-medium text-navy'
                  : 'text-navy/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button className="hidden h-[55px] min-w-[172px] rounded-[27.5px] px-10 text-sm lg:inline-flex">
          Sign in
        </Button>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-navy/10 text-navy lg:hidden"
          aria-label="Open menu"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
