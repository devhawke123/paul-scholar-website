import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { routes } from '../../../routes'

export function AdminNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-[72px]">
        <Link
          to={routes.admin}
          className="font-serif text-xl font-semibold italic text-navy md:text-2xl"
        >
          Admin Panel
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-navy/60 sm:inline">Dr. Paul A. Stokes</span>
          <Link to={routes.home}>
            <Button variant="outline" className="h-11 min-w-0 rounded-full px-5 text-sm">
              View Site
            </Button>
          </Link>
        </div>
      </div>
      {/* accent rule replaces plain navy/10 border */}
      <div className="h-px bg-gradient-to-r from-accent/60 via-peach/40 to-transparent" />
    </header>
  )
}
