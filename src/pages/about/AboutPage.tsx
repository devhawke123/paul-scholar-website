import { Navbar } from '../../components/layout/Navbar'
import { SiteClosing } from '../../components/layout/SiteClosing'
import { PageHero } from '../../components/sections/PageHero'
import { TestimonialsSection } from '../../components/sections/TestimonialsSection'
import { pageHeroContent } from '../../data/pageHeroContent'
import { AboutAchievementsSection } from './components/AboutAchievementsSection'
import { AboutCareerSection } from './components/AboutCareerSection'
import { AboutEducationExperienceSection } from './components/AboutEducationExperienceSection'
import { AboutEducationIntroSection } from './components/AboutEducationIntroSection'

export function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-navy">
      <Navbar />
      <main>
        <PageHero {...pageHeroContent.about} />
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
