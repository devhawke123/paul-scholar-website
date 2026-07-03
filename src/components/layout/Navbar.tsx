import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { navLinks } from '../../pages/home/data/homeContent'

function isNavActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  if (href === '/about') return pathname === '/about'
  // if (href === '/library') return pathname === '/library'
  // if (href === '/blogs') return pathname.startsWith('/blogs')
  // if (href === '/contact') return pathname === '/contact'
  return false
}

export function Navbar() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  return (
    <>
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-[72px]">
        <Link
          to="/"
          className="min-w-0 shrink font-serif text-lg font-semibold italic leading-tight text-navy sm:text-xl md:text-2xl"
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
          Subscribe
        </Button>

        <button
          type="button"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-navy/10 text-navy lg:hidden"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen(true)}
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

    {/* Mobile menu overlay — outside header so backdrop-blur doesn't trap fixed positioning */}
    <div
      className={`fixed inset-0 z-[60] bg-navy/40 transition-opacity duration-300 lg:hidden ${
        isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!isMenuOpen}
      onClick={() => setIsMenuOpen(false)}
    />

    {/* Mobile side panel */}
    <aside
      id="mobile-nav"
      className={`fixed inset-y-0 right-0 z-[70] flex w-[min(320px,85vw)] flex-col bg-cream shadow-xl transition-transform duration-300 ease-out lg:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
      }`}
      aria-hidden={!isMenuOpen}
    >
      <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
        <span className="font-serif text-lg font-semibold italic text-navy">Menu</span>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-navy/10 text-navy"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6" aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className={`rounded-lg px-3 py-3 text-base transition-colors hover:bg-navy/5 hover:text-accent ${
              isNavActive(link.href, pathname)
                ? 'font-medium text-navy'
                : 'text-navy/80'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-navy/10 px-5 py-6">
        <Button className="h-[55px] w-full rounded-[27.5px] px-10 text-sm">
          Subscribe
        </Button>
      </div>
    </aside>
    </>
  )
}
