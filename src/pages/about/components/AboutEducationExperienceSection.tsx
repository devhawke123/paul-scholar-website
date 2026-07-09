import { PAGE_GUTTER, PageContainer } from '../../../components/layout/PageContainer'
import { DecorativeVector } from '../../../components/ui/DecorativeVector'
import { aboutPageAssets } from '../data/aboutPageAssets'
import { educationExperience } from '../data/aboutContent'

function EducationCardIcon() {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-navy sm:size-12 md:size-16">
      <svg className="size-5 sm:size-6 md:size-8" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 7.5A2.5 2.5 0 016.5 5H9l1.5 2h7.5A2.5 2.5 0 0120 9.5v9A2.5 2.5 0 0117.5 21h-11A2.5 2.5 0 014 18.5v-11z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M9 5V4.5A1.5 1.5 0 0110.5 3h3A1.5 1.5 0 0115 4.5V5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  )
}

export function AboutEducationExperienceSection() {
  return (
    <section className={`relative overflow-x-hidden bg-cream pb-8 pt-0 sm:pb-12 md:pb-16 lg:py-20 ${PAGE_GUTTER}`}>
      <DecorativeVector className="absolute left-2 top-20 lg:left-8 lg:top-24 xl:left-10" />
      <DecorativeVector flip className="absolute right-2 top-28 lg:right-10 lg:top-32" />
      <DecorativeVector className="absolute bottom-12 right-4 lg:bottom-16 lg:right-10" />

      <PageContainer>
        <div className="relative overflow-hidden rounded-[16px] bg-gradient-warm px-4 py-5 shadow-sm sm:rounded-[28px] sm:px-6 sm:py-8 md:rounded-[32px] md:px-10 md:py-14 lg:px-12 lg:py-16">
        <div className="grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8 xl:gap-x-16">
          <h2 className="order-1 text-xl font-bold leading-tight text-navy xs:text-2xl sm:text-3xl md:text-4xl lg:col-start-1 lg:row-start-1 lg:text-[44px] lg:leading-[1.15]">
            {educationExperience.title}
          </h2>

          <p className="order-2 text-xs leading-relaxed text-navy/80 sm:text-sm md:text-base lg:col-start-2 lg:row-start-1 lg:text-lg">
            {educationExperience.description}
          </p>

          <div className="order-3 mx-auto w-full max-w-[240px] overflow-hidden rounded-2xl shadow-md xs:max-w-[250px] sm:max-w-[270px] md:max-w-[320px] lg:col-start-1 lg:row-start-2 lg:mx-0 lg:max-w-[410px] lg:self-end">
            <img
              src={aboutPageAssets.educationExperience}
              alt="Education and research"
              className="aspect-square w-full object-cover object-top"
            />
          </div>

          <div className="order-4 space-y-3 sm:space-y-4 lg:col-start-2 lg:row-start-2">
            {educationExperience.items.map((item) => (
              <article
                key={item.title}
                className="flex gap-3 rounded-2xl bg-white p-3.5 shadow-sm sm:gap-4 sm:p-5 md:p-6"
              >
                <EducationCardIcon />
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-sm font-bold text-navy sm:text-base md:text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy/75 sm:mt-2 sm:text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        </div>
      </PageContainer>
    </section>
  )
}
