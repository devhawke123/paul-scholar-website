import { Button } from '../../../components/ui/Button'
import {
  HeroWhatsAppCorner,
  heroImageScoopMaskClass,
} from '../../../components/sections/HeroWhatsAppCorner'
import { homeAssets } from '../data/homeAssets'
import { heroTags } from '../data/homeContent'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-[1440px] px-4 pb-4 pt-4 sm:px-6 sm:pb-25 sm:pt-6 md:px-11">
        <div className="relative rounded-[20px] sm:rounded-[32px]">
          <div
            className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[20px] sm:rounded-[32px] ${heroImageScoopMaskClass}`}
          >
            <img
              src={homeAssets.heroBg}
              alt="Dr. Paul A. Stokes working in his study"
              className="size-full object-cover object-[center_20%] sm:object-center"
            />
            <div className="absolute inset-0 bg-navy/40 sm:bg-navy/35" />
          </div>

          <div className="relative z-10 flex min-h-[min(92vh,680px)] flex-col gap-6 p-5 sm:min-h-[600px] sm:gap-8 sm:p-6 md:min-h-[808px] md:justify-between md:gap-0 md:p-12 lg:p-16">
            <div>
              <p className="text-xs font-medium text-white/90 sm:text-sm md:text-base">
                Welcome to Dr. Paul A. Stokes
              </p>
              <div className="mt-2 h-1 w-28 rounded-full bg-accent sm:w-48" />
            </div>

            <div className="md:mt-auto">
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Dr. Paul A. Stokes
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-base md:text-lg">
                Bridging rigorous academic insight with real-world organizational strategy
                to shape smarter, sustainable institutions.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <Button className="h-12 w-full rounded-full px-6 text-sm sm:h-14 sm:w-auto sm:px-8 sm:text-base">
                  Learn More About Dr. Stokes
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/40 bg-white/10 px-6 text-sm text-white backdrop-blur-sm hover:bg-white/20 sm:h-14 sm:w-auto sm:px-8 sm:text-base"
                >
                  Explore Articles
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-10 sm:flex sm:flex-wrap sm:gap-8 md:gap-16">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl font-bold text-white sm:text-4xl">95%</span>
                  <span className="text-xs leading-snug text-white/85 sm:max-w-[140px] sm:text-sm">
                    Good Reviews From Researchers
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl font-bold text-white sm:text-4xl">50+</span>
                  <span className="text-xs text-white/85 sm:text-sm">Viewed My Work</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-2 pb-1 sm:gap-x-4 md:mt-8 md:pb-0">
              {heroTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 text-xs text-white/90 sm:text-sm md:text-base"
                >
                  <span className="size-3 shrink-0 rounded-full bg-accent sm:size-4" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <HeroWhatsAppCorner />
        </div>
      </div>
    </section>
  )
}
