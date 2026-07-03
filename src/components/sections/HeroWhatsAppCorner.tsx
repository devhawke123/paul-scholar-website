import { siteContact } from '../../data/siteContact'

type HeroWhatsAppCornerProps = {
  href?: string | null
  iconSrc?: string
}

/** Shared sizing tokens — apply on the hero card wrapper that contains the image + WhatsApp link. */
export const heroCornerVarsClass =
  '[--wa-size:40px] [--wa-offset:10%] xs:[--wa-size:44px] xs:[--wa-offset:11%] sm:[--wa-size:52px] sm:[--wa-offset:13%] md:[--wa-size:60px] md:[--wa-offset:15%] lg:[--wa-size:72px] lg:[--wa-offset:20%] xl:[--wa-size:84px] xl:[--wa-offset:24%] 2xl:[--wa-size:96px] 2xl:[--wa-offset:26%]'

/** Masks the hero image so the bottom-right corner scoops inward for the WhatsApp icon (laptop+ only). */
export const heroImageScoopMaskClass =
  'lg:[-webkit-mask-image:radial-gradient(circle_calc(var(--wa-size)*0.62)_at_100%_100%,transparent_calc(var(--wa-size)*0.62_-_1px),#000_calc(var(--wa-size)*0.62))] lg:[mask-image:radial-gradient(circle_calc(var(--wa-size)*0.62)_at_100%_100%,transparent_calc(var(--wa-size)*0.62_-_1px),#000_calc(var(--wa-size)*0.62))]'

export function HeroWhatsAppCorner({
  href = siteContact.whatsappHref,
  iconSrc = siteContact.whatsappIcon,
}: HeroWhatsAppCornerProps) {
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="absolute bottom-0 right-0 z-30 hidden translate-x-[var(--wa-offset)] translate-y-[var(--wa-offset)] transition hover:scale-105 lg:block"
    >
      <img
        src={iconSrc}
        alt=""
        className="size-[var(--wa-size)] object-contain"
      />
    </a>
  )
}
