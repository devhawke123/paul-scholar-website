import { ArrowLink } from '../../../components/ui/ArrowLink'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { aboutIcons } from '../data/aboutAssets'
import { experienceCards } from '../data/homeContent'

export function ExperienceSection() {
  return (
    <section className="relative overflow-hidden bg-cream px-4 py-20 md:px-11">
      <img
        src={aboutIcons.decorativeVector}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-2 top-16 w-20 opacity-90 md:left-8 md:w-24"
      />

      <div className="relative mx-auto max-w-[1350px] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#efb04a] via-[#f5c47a] to-[#fde8c8] px-6 py-10 shadow-sm md:px-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <SectionBadge label="Work & Experience" />
            <h2 className="mt-6 text-3xl font-bold text-navy md:text-[42px] md:leading-tight">
              The Strategic Leader
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-navy/80 lg:pt-12">
            Get access to professional training that helps you gain skills employers
            value. From beginner to advanced, our programs are built for learners who
            want results.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-4">
          {experienceCards.map((card) => {
            const isFeatured = 'featured' in card && card.featured

            return (
              <article
                key={card.number}
                className={`flex flex-col rounded-2xl p-6 shadow-md md:p-8 ${
                  isFeatured ? 'bg-accent' : 'bg-white'
                }`}
              >
                <span
                  className={`inline-flex size-14 items-center justify-center rounded-full text-lg font-bold ${
                    isFeatured
                      ? 'bg-white text-accent'
                      : 'bg-accent text-white'
                  }`}
                >
                  {card.number}
                </span>
                <h3 className="mt-6 text-xl font-bold leading-snug text-navy">
                  {card.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-navy/75">
                  {card.description}
                </p>
                <ArrowLink
                  label="Learn More"
                  className={`mt-6 font-semibold ${
                    isFeatured ? 'text-navy hover:text-navy/70' : 'text-navy hover:text-accent'
                  }`}
                />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
