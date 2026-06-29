import { Footer } from '../../components/layout/Footer'
import { Navbar } from '../../components/layout/Navbar'
import { NewsletterSection } from '../home/components/NewsletterSection'
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
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
