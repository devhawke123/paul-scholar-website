import { siteContact } from '../../data/siteContact'

type HeroWhatsAppCornerProps = {
  href?: string | null
  iconSrc?: string
}

/** Masks the hero image so the bottom-right corner scoops inward for the WhatsApp icon. */
export const heroImageScoopMaskClass =
  '[-webkit-mask-image:radial-gradient(circle_44px_at_100%_100%,transparent_43px,#000_44px)] [mask-image:radial-gradient(circle_44px_at_100%_100%,transparent_43px,#000_44px)] sm:[-webkit-mask-image:radial-gradient(circle_54px_at_100%_100%,transparent_53px,#000_54px)] sm:[mask-image:radial-gradient(circle_54px_at_100%_100%,transparent_53px,#000_54px)]'

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
      className="absolute bottom-0 right-0 z-30 translate-x-[22%] translate-y-[22%] transition hover:scale-105 sm:translate-x-[26%] sm:translate-y-[26%]"
    >
      <img
        src={iconSrc}
        alt=""
        className="h-[72px] w-[71px] object-contain sm:h-[84px] sm:w-[83px]"
      />
    </a>
  )
}
