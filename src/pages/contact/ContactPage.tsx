import { Navbar } from '../../components/layout/Navbar'
import { SiteClosing } from '../../components/layout/SiteClosing'
import { ContactFaqSection } from './components/ContactFaqSection'
import { ContactFormSection } from './components/ContactFormSection'
import { ContactHeroSection } from './components/ContactHeroSection'

export function ContactPage() {
  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar />
      <main>
        <ContactHeroSection />
        <ContactFormSection />
        <ContactFaqSection />
      </main>
      <SiteClosing />
    </div>
  )
}
