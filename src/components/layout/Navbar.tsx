import { Button } from '../ui/Button'
import { navLinks } from '../../pages/home/data/homeContent'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-[72px]">
        <a
          href="#"
          className="font-serif text-xl italic font-semibold text-navy md:text-2xl"
        >
          Dr. Paul A. Stokes
        </a>

        <nav className="hidden items-center gap-11 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-base transition-colors hover:text-accent ${
                'active' in link && link.active
                  ? 'font-medium text-navy'
                  : 'text-navy/80'
              }`}
            >
              {link.label}
            </a>
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
