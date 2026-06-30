import { Navbar } from '../../components/layout/Navbar'
import { SiteClosing } from '../../components/layout/SiteClosing'
import { TestimonialsSection } from '../../components/sections/TestimonialsSection'
import { AboutAchievementsSection } from './components/AboutAchievementsSection'
import { AboutCareerSection } from './components/AboutCareerSection'
import { AboutEducationExperienceSection } from './components/AboutEducationExperienceSection'
import { AboutEducationIntroSection } from './components/AboutEducationIntroSection'
import { AboutHeroSection } from './components/AboutHeroSection'

export function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar />
      <main>
        <AboutHeroSection />
        <AboutEducationIntroSection />
        <AboutEducationExperienceSection />
        <AboutCareerSection />
        <AboutAchievementsSection />
        <TestimonialsSection />
      </main>
      <SiteClosing />
    </div>
  )
}
