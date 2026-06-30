import { Navbar } from '../../components/layout/Navbar'
import { SiteClosing } from '../../components/layout/SiteClosing'
import { TestimonialsSection } from '../../components/sections/TestimonialsSection'
import { LibraryGridSection } from './components/LibraryGridSection'
import { LibraryHeroSection } from './components/LibraryHeroSection'

export function LibraryPage() {
  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar />
      <main>
        <LibraryHeroSection />
        <LibraryGridSection />
        <TestimonialsSection />
      </main>
      <SiteClosing />
    </div>
  )
}
