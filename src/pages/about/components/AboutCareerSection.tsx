import { PAGE_GUTTER, PageContainer } from '../../../components/layout/PageContainer'
import { DecorativeVector } from '../../../components/ui/DecorativeVector'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { aboutPageAssets } from '../data/aboutPageAssets'
import { professionalCareer } from '../data/aboutContent'

export function AboutCareerSection() {
  return (
    <section className={`relative overflow-x-hidden bg-cream pb-8 pt-4 sm:pb-12 sm:pt-6 md:pb-16 md:pt-8 lg:py-20 ${PAGE_GUTTER}`}>
      <DecorativeVector className="absolute left-2 top-20 lg:left-8 lg:top-24 xl:left-10" />
      <DecorativeVector className="absolute bottom-16 left-4 lg:bottom-20 lg:left-10" />

      <PageContainer className="relative">
        <div className="grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
          <div className="min-w-0 lg:max-w-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:flex-col lg:gap-0">
              <SectionBadge label={professionalCareer.badge} className="shrink-0" />
            </div>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-navy xs:text-3xl sm:mt-6 md:text-4xl lg:mt-4 lg:text-5xl">
              {professionalCareer.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-navy/75 sm:text-base md:text-lg">
              {professionalCareer.description}
            </p>

            <div className="relative mx-auto mt-8 aspect-[410/480] w-full max-w-[340px] sm:mt-10 sm:max-w-[380px] md:max-w-[410px] lg:mx-0">
              <div
                aria-hidden
                className="absolute left-0 top-0 h-[92%] w-[88%] rounded-[24px] rounded-tl-[12px] bg-gradient-warm sm:rounded-[28px] sm:rounded-tl-[16px] md:rounded-[32px] md:rounded-tl-[48px]"
              />
              <div className="absolute bottom-0 right-0 h-[94%] w-[88%] overflow-hidden rounded-[20px] shadow-md sm:rounded-[24px] md:rounded-[28px]">
                <img
                  src={aboutPageAssets.careerFront}
                  alt="Dr. Paul A. Stokes"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="relative min-w-0 lg:pt-2">
            <div
              className="absolute bottom-3 left-[9px] top-3 w-px -translate-x-1/2 bg-navy/20"
              aria-hidden
            />

            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              {professionalCareer.roles.map((role) => (
                <article
                  key={role.period}
                  className="grid grid-cols-[18px_minmax(0,1fr)] gap-x-4 sm:gap-x-5 md:gap-x-7"
                >
                  <div className="flex justify-center pt-2 sm:pt-2.5 md:pt-3">
                    <span
                      className="relative z-10 size-3.5 shrink-0 rounded-full bg-accent ring-[3px] ring-cream sm:size-4 md:size-[18px] md:ring-4"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-navy/55 sm:text-sm">{role.period}</p>
                    <h3 className="mt-1 text-base font-semibold text-navy sm:text-lg md:text-xl">
                      {role.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/75 sm:text-base">
                      {role.description}
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
