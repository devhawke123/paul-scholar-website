import { PAGE_GUTTER, PageContainer, SECTION_PY } from '../../../components/layout/PageContainer'
import { Button } from '../../../components/ui/Button'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { DecorativeVector } from '../../../components/ui/DecorativeVector'
import { homeAssets } from '../data/homeAssets'
import { affiliations } from '../data/homeContent'

function ExploreArrow() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AffiliationsSection() {
  return (
    <section className={`relative overflow-hidden bg-cream ${SECTION_PY} ${PAGE_GUTTER}`}>
      <DecorativeVector className="absolute bottom-8 left-2 lg:bottom-12 lg:left-0 xl:left-0" />
      <DecorativeVector flip className="absolute right-0 top-16 lg:top-20 xl:top-24" />

      <PageContainer className="relative">
        <div className="text-center">
          <SectionBadge label="Affiliations" className="mx-auto" />
          <h2 className="mt-6 text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
            Affiliations & Collaborations
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-navy/70 md:text-lg">
            Academic, Institutional, and Professional Engagements
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 md:mt-20 md:grid-cols-3 md:items-end md:gap-6">
          {affiliations.map((item) => {
            const isFeatured = 'featured' in item && item.featured

            return (
              <article
                key={item.title}
                className={`overflow-hidden shadow-lg ${
                  isFeatured ? 'md:-mt-10 lg:-mt-12' : ''
                }`}
              >
                <img
                  src={homeAssets.affiliations[item.title]}
                  alt={item.title}
                  className={`w-full object-cover ${
                    isFeatured ? 'h-64 md:h-72 lg:h-80' : 'h-56 md:h-64'
                  }`}
                />
                <div
                  className={`px-6 py-8 text-center md:px-8 ${
                    isFeatured
                      ? 'bg-accent pb-10 md:pb-14 lg:pb-16'
                      : 'bg-peach-surface'
                  }`}
                >
                  <h3 className="text-xl font-bold text-navy md:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy/80 md:text-base">
                    {item.description}
                  </p>
                  <Button
                    variant={isFeatured ? 'secondary' : 'primary'}
                    className="mt-6 gap-2 rounded-full px-8 py-3 font-semibold"
                  >
                    Explore More
                    <ExploreArrow />
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
