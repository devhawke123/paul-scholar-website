import { Link } from 'react-router-dom'
import pageHeroBg from '../../assets/about/hero.png'
import { siteContact } from '../../data/siteContact'
import { HeroWhatsAppCorner, heroImageScoopMaskClass } from './HeroWhatsAppCorner'

function HeroArrowIcon() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export type PageHeroProps = {
  title: string
  description: string
  ctaLabel: string
  ctaHref?: string
  backgroundSrc?: string
  backgroundAlt?: string
  whatsappHref?: string | null
  whatsappIconSrc?: string
}

export function PageHero({
  title,
  description,
  ctaLabel,
  ctaHref = '/contact',
  backgroundSrc = pageHeroBg,
  backgroundAlt = '',
  whatsappHref = siteContact.whatsappHref,
  whatsappIconSrc = siteContact.whatsappIcon,
}: PageHeroProps) {
  const isExternal = ctaHref.startsWith('http')
  const isHash = ctaHref.startsWith('#')

  const cta = (
    <span className="inline-flex h-[55px] min-w-[280px] items-center justify-between gap-4 rounded-full bg-accent pl-8 pr-1.5 text-base font-medium text-navy transition hover:bg-accent/90 sm:min-w-[320px]">
      <span className="text-left leading-tight">{ctaLabel}</span>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-navy">
        <HeroArrowIcon />
      </span>
    </span>
  )

  return (
    <section className="px-4 pt-6 md:px-11 md:pt-8">
      <div className="relative mx-auto max-w-[1296px] rounded-[32px]">
        <div
          className={`relative overflow-hidden rounded-[32px] ${heroImageScoopMaskClass}`}
        >
          <img
            src={backgroundSrc}
            alt={backgroundAlt}
            className="aspect-[1296/609] w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy/35" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-12 text-center sm:px-12 md:py-16">
          <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-[72px] lg:leading-[1.1]">
            {title}
          </h1>
          <p className="mt-6 max-w-[720px] text-base leading-relaxed text-white/90 md:text-lg">
            {description}
          </p>

          {isHash ? (
            <a href={ctaHref} className="mt-8">
              {cta}
            </a>
          ) : isExternal ? (
            <a href={ctaHref} className="mt-8" target="_blank" rel="noreferrer">
              {cta}
            </a>
          ) : (
            <Link to={ctaHref} className="mt-8">
              {cta}
            </Link>
          )}
        </div>

        <HeroWhatsAppCorner href={whatsappHref} iconSrc={whatsappIconSrc} />
      </div>
    </section>
  )
}
