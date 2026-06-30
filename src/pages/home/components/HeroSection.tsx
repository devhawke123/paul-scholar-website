import { Button } from '../../../components/ui/Button'
import { homeAssets } from '../data/homeAssets'
import { heroTags } from '../data/homeContent'


export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-[1440px] px-4 pb-6 pt-6 md:px-11">
        <div className="relative overflow-hidden rounded-[32px]">
          <img
            src={homeAssets.heroBg}
            alt="Dr. Paul A. Stokes working in his study"
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy/35" />

          <div className="relative flex min-h-[640px] flex-col justify-between p-6 md:min-h-[808px] md:p-12 lg:p-16">
            <div>
              <p className="text-sm font-medium text-white/90 md:text-base">
                Welcome to Dr. Paul A. Stokes
              </p>
              <div className="mt-2 h-1 w-48 rounded-full bg-accent" />
            </div>

            <div className="mt-auto max-w-3xl">
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Dr. Paul A. Stokes
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                Bridging rigorous academic insight with real-world organizational strategy
                to shape smarter, sustainable institutions.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="h-16 rounded-full px-8 text-base">
                  Learn More About Dr. Stokes
                </Button>
                <Button
                  variant="outline"
                  className="h-14 rounded-full border-white/40 bg-white/10 px-8 text-base text-white backdrop-blur-sm hover:bg-white/20"
                >
                  Explore Articles
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 md:gap-16">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-white">95%</span>
                  <span className="max-w-[140px] text-sm leading-snug text-white/85">
                    Good Reviews From Researchers
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-white">50+</span>
                  <span className="text-sm text-white/85">Viewed My Work</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 md:gap-6">
              {heroTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 text-sm text-white/90 md:text-base"
                >
                  <span className="size-4 rounded-full bg-accent" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
