import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/Button'
import { aboutPageAssets } from '../data/aboutPageAssets'
import { aboutHero } from '../data/aboutContent'

export function AboutHeroSection() {
  return (
    <section className="px-4 pt-6 md:px-11 md:pt-8">
      <div className="relative mx-auto max-w-[1296px] overflow-hidden rounded-3xl">
        <img
          src={aboutPageAssets.hero}
          alt=""
          className="aspect-[1296/609] w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/35" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            {aboutHero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            {aboutHero.subtitle}
          </p>
          <Link to="/contact">
            <Button className="mt-8 h-14 rounded-full px-10 text-base">
              {aboutHero.cta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
