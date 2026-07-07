import { Navbar } from '../../components/layout/Navbar'
import { SiteClosing } from '../../components/layout/SiteClosing'
import { PageHero } from '../../components/sections/PageHero'
import { TestimonialsSection } from '../../components/sections/TestimonialsSection'
import { pageHeroContent } from '../../data/pageHeroContent'
import libraryHero from '../../assets/libraryHero.png'
import { LibraryGridSection } from './components/LibraryGridSection'

export function LibraryPage() {
  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar />
      <main>
        <PageHero {...pageHeroContent.library} backgroundSrc={libraryHero} />
        <LibraryGridSection />
        <TestimonialsSection />
      </main>
      <SiteClosing />
    </div>
  )
}
