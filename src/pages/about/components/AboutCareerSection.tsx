import { aboutIcons } from '../../home/data/aboutAssets'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { aboutPageAssets } from '../data/aboutPageAssets'
import { professionalCareer } from '../data/aboutContent'

export function AboutCareerSection() {
  return (
    <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-11 md:py-24">
      <img
        src={aboutIcons.decorativeVector}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-2 top-20 w-16 opacity-90 md:left-8 md:top-24 md:w-20"
      />
      <img
        src={aboutIcons.decorativeVector}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-16 left-4 w-14 opacity-90 md:bottom-20 md:left-10 md:w-16"
      />

      <div className="relative mx-auto max-w-[1355px]">
        <SectionBadge
          label={professionalCareer.badge}
          className="absolute right-0 top-0 hidden sm:inline-flex"
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
          <div className="max-w-xl">
            <SectionBadge label={professionalCareer.badge} className="sm:hidden" />
            <h2 className="mt-4 text-3xl font-bold leading-tight text-navy sm:mt-0 md:text-4xl lg:text-5xl">
              {professionalCareer.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy/75 md:text-lg">
              {professionalCareer.description}
            </p>

            <div className="relative mt-10 aspect-[410/480] w-full max-w-[410px]">
              <div
                aria-hidden
                className="absolute left-0 top-0 h-[92%] w-[88%] rounded-[28px] rounded-tl-[16px] bg-gradient-warm sm:rounded-[32px] sm:rounded-tl-[48px]"
              />
              <div className="absolute bottom-0 right-0 h-[94%] w-[88%] overflow-hidden rounded-[24px] shadow-md sm:rounded-[28px]">
                <img
                  src={aboutPageAssets.careerFront}
                  alt="Dr. Paul A. Stokes"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="relative lg:pt-2">
            <div
              className="absolute bottom-3 left-[9px] top-3 w-px -translate-x-1/2 bg-navy/20"
              aria-hidden
            />

            <div className="space-y-8 sm:space-y-10">
              {professionalCareer.roles.map((role) => (
                <article
                  key={role.period}
                  className="grid grid-cols-[18px_minmax(0,1fr)] gap-x-5 sm:gap-x-7"
                >
                  <div className="flex justify-center pt-2.5 sm:pt-3">
                    <span
                      className="relative z-10 size-4 shrink-0 rounded-full bg-accent ring-[3px] ring-cream sm:size-[18px] sm:ring-4"
                      aria-hidden
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy/55">{role.period}</p>
                    <h3 className="mt-1 text-lg font-semibold text-navy sm:text-xl">{role.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/75 sm:text-base">
                      {role.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
