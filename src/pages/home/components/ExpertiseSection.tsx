import { ArrowLink } from '../../../components/ui/ArrowLink'
// import { aboutIcons } from '../data/aboutAssets'
import { expertiseCards } from '../data/homeContent'

export function ExpertiseSection() {
  return (
    <section className="relative z-10 -mt-24 bg-cream px-4 pb-20 md:-mt-32 md:px-11 lg:mt-6">
      {/* <img
        src={aboutIcons.decorativeVector}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-2 w-20 opacity-90 md:bottom-10 md:left-8 md:w-28"
      /> */}

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-5 md:grid-cols-3 md:items-end md:gap-6">
          {expertiseCards.map((card) => {
            const isFeatured = 'featured' in card && card.featured

            return (
              <article
                key={card.title}
                className={`flex flex-col shadow-lg ${
                  isFeatured
                    ? 'bg-accent p-6 md:-mt-12 md:p-8 md:pb-12 lg:-mt-14 lg:pb-14'
                    : 'bg-[#f9d5b0] p-6 md:p-8'
                }`}
              >
                <h3 className="text-xl font-bold leading-snug text-navy md:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-navy/80 md:text-base">
                  {card.description}
                </p>
                <ArrowLink
                  label="Learn More"
                  className="mt-6 font-semibold text-navy hover:text-navy/70"
                />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
