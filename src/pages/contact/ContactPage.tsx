import { Navbar } from '../../components/layout/Navbar'
import { SiteClosing } from '../../components/layout/SiteClosing'
import { PageHero } from '../../components/sections/PageHero'
import { pageHeroContent } from '../../data/pageHeroContent'
import { ContactFaqSection } from './components/ContactFaqSection'
import { ContactFormSection } from './components/ContactFormSection'

export function ContactPage() {
  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar />
      <main>
        <PageHero {...pageHeroContent.contact} />
        <ContactFormSection />
        <ContactFaqSection />
      </main>
      <SiteClosing />
    </div>
  )
}
