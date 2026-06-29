import { Footer } from '../../components/layout/Footer'
import { Navbar } from '../../components/layout/Navbar'
import { AboutSection } from './components/AboutSection'
import { AffiliationsSection } from './components/AffiliationsSection'
import { BlogsSection } from './components/BlogsSection'
import { DocumentLibrarySection } from './components/DocumentLibrarySection'
import { ExperienceSection } from './components/ExperienceSection'
import { ExpertiseSection } from './components/ExpertiseSection'
import { HeroSection } from './components/HeroSection'
import { NewsletterSection } from './components/NewsletterSection'
import { TestimonialsSection } from './components/TestimonialsSection'

export function HomePage() {
  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar />
      <main>
        <HeroSection />
        <ExpertiseSection />
        <AboutSection />
        <AffiliationsSection />
        <DocumentLibrarySection />
        <ExperienceSection />
        <BlogsSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
