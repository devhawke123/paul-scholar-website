import { Button } from '../../../components/ui/Button'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { homeAssets } from '../data/homeAssets'
import { affiliations } from '../data/homeContent'

export function AffiliationsSection() {
  return (
    <section className="bg-cream px-4 py-20 md:px-11">
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <SectionBadge label="Affiliations" className="mx-auto" />
          <h2 className="mt-6 text-3xl font-bold text-navy md:text-4xl">
            Affiliations & Collaborations
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-navy/70">
            Academic, Institutional, and Professional Engagements
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-end">
          {affiliations.map((item) => (
            <article
              key={item.title}
              className={`overflow-hidden rounded-3xl bg-white shadow-sm ${
                'featured' in item && item.featured ? 'md:-mt-8' : ''
              }`}
            >
              <img
                src={homeAssets.affiliations[item.title]}
                alt={item.title}
                className={`w-full object-cover ${
                  'featured' in item && item.featured ? 'h-72' : 'h-64'
                }`}
              />
              <div className="p-8 text-center">
                <h3 className="text-xl font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/70">
                  {item.description}
                </p>
                <Button variant="outline" className="mt-6 rounded-full px-8">
                  Explore More →
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
