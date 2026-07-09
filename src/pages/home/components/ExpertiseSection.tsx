import { PAGE_GUTTER, PageContainer } from '../../../components/layout/PageContainer'
import { ArrowLink } from '../../../components/ui/ArrowLink'
import { routes } from '../../../routes'
// import { aboutIcons } from '../data/aboutAssets'
import { expertiseCards } from '../data/homeContent'

export function ExpertiseSection() {
  return (
    <section className={`relative z-10 bg-cream pb-16 sm:-mt-14 sm:pb-20 md:-mt-32 md:pb-20 lg:mt-6 ${PAGE_GUTTER}`}>

      <PageContainer>
        <div className="grid gap-5 md:grid-cols-3 md:items-end md:gap-6">
          {expertiseCards.map((card) => {
            const isFeatured = 'featured' in card && card.featured

            return (
              <article
                key={card.title}
                className={`flex flex-col overflow-hidden rounded-2xl shadow-lg ${
                  isFeatured
                    ? 'bg-accent p-5 sm:p-6 md:-mt-12 md:p-8 md:pb-12 lg:-mt-14 lg:pb-14'
                    : 'bg-peach-surface p-5 sm:p-6 md:p-8'
                }`}
              >
                <h3 className="text-lg font-bold leading-snug text-navy sm:text-xl md:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-navy/80 md:text-base">
                  {card.description}
                </p>
                <ArrowLink
                  label="Learn More"
                  href={routes.about}
                  className="mt-6 font-semibold text-navy hover:text-navy/70"
                />
              </article>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
