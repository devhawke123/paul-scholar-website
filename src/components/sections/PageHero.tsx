import { Link } from 'react-router-dom'
import pageHeroBg from '../../assets/about/hero.png'
import { siteContact } from '../../data/siteContact'
import { isInternalHref } from '../../routes'
import {
  HeroWhatsAppCorner,
  heroCornerVarsClass,
  heroImageScoopMaskClass,
} from './HeroWhatsAppCorner'

function HeroArrowIcon() {
  return (
    <svg className="size-3.5 sm:size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
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
  const isHashOnly = ctaHref.startsWith('#')
  const isInternal = isInternalHref(ctaHref)

  const cta = (
    <span className="inline-flex h-10 max-w-full items-center gap-2 rounded-full bg-accent py-1 pl-4 pr-1 text-xs font-medium text-navy transition hover:bg-accent/90 sm:h-12 sm:gap-3 sm:pl-5 sm:pr-1.5 sm:text-sm md:h-[55px] md:gap-4 md:pl-8 md:pr-1.5 md:text-base">
      <span className="text-left leading-tight">{ctaLabel}</span>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-navy sm:size-9 md:size-10">
        <HeroArrowIcon />
      </span>
    </span>
  )

  const ctaLink = (
    <>
      {isHashOnly ? (
        <a href={ctaHref}>{cta}</a>
      ) : isExternal ? (
        <a href={ctaHref} target="_blank" rel="noreferrer">
          {cta}
        </a>
      ) : isInternal ? (
        <Link to={ctaHref}>{cta}</Link>
      ) : (
        <a href={ctaHref}>{cta}</a>
      )}
    </>
  )

  return (
    <section className="px-4 pb-2 pt-3 sm:pb-4 sm:pt-5 md:px-11 md:pb-6 md:pt-8">
      <div
        className={`relative mx-auto max-w-[1296px] overflow-visible rounded-[16px] sm:rounded-[28px] md:rounded-[32px] ${heroCornerVarsClass}`}
      >
        <div
          className={`relative overflow-hidden rounded-[16px] sm:rounded-[28px] md:rounded-[32px] ${heroImageScoopMaskClass}`}
        >
          <img
            src={backgroundSrc}
            alt={backgroundAlt}
            className="aspect-[4/3] w-full object-cover object-center sm:aspect-[16/9] md:aspect-[1296/609]"
          />
          <div className="absolute inset-0 bg-navy/35" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-between px-5 py-5 text-center sm:px-8 sm:py-7 md:justify-center md:py-16">
          <h1 className="font-serif text-[26px] font-bold leading-tight text-white sm:text-4xl md:text-6xl lg:text-[72px] lg:leading-[1.1]">
            {title}
          </h1>

          <p className="max-w-[92%] text-[11px] leading-snug text-white/90 sm:max-w-[480px] sm:text-sm sm:leading-relaxed md:mt-6 md:max-w-[720px] md:text-base md:leading-relaxed lg:text-lg">
            {description}
          </p>

          <div className="shrink-0 md:mt-8">{ctaLink}</div>
        </div>

        <HeroWhatsAppCorner href={whatsappHref} iconSrc={whatsappIconSrc} />
      </div>
    </section>
  )
}
