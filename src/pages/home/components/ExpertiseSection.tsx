import { ArrowLink } from '../../../components/ui/ArrowLink'
import { expertiseCards } from '../data/homeContent'

export function ExpertiseSection() {
  return (
    <section className="bg-cream px-4 pb-20 md:px-11">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 md:grid-cols-3">
          {expertiseCards.map((card) => (
            <article
              key={card.title}
              className={`flex flex-col rounded-3xl p-6 md:p-8 ${
                'featured' in card && card.featured
                  ? 'bg-navy text-white md:-mt-4 md:pb-10 md:pt-12'
                  : 'bg-white text-navy shadow-sm'
              }`}
            >
              <h3
                className={`text-xl font-semibold leading-snug md:text-2xl ${
                  'featured' in card && card.featured ? 'text-white' : 'text-navy'
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`mt-4 flex-1 text-sm leading-relaxed md:text-base ${
                  'featured' in card && card.featured ? 'text-white/80' : 'text-navy/70'
                }`}
              >
                {card.description}
              </p>
              <ArrowLink
                label="Learn More"
                className={`mt-6 ${
                  'featured' in card && card.featured ? 'text-accent hover:text-white' : ''
                }`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
