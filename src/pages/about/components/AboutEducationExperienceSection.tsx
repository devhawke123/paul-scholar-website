import { aboutIcons } from '../../home/data/aboutAssets'
import { aboutPageAssets } from '../data/aboutPageAssets'
import { educationExperience } from '../data/aboutContent'

function EducationCardIcon() {
  return (
    <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-accent text-navy sm:size-16">
      <svg className="size-7 sm:size-8" viewBox="0 0 24 24" fill="none" aria-hidden>
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
        className="pointer-events-none absolute right-2 top-28 w-14 scale-x-[-1] opacity-90 md:right-10 md:top-32 md:w-16"
      />
      <img
        src={aboutIcons.decorativeVector}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-12 right-4 w-16 opacity-90 md:bottom-16 md:right-10 md:w-20"
      />

      <div className="relative mx-auto max-w-[1350px] overflow-hidden rounded-[32px] bg-gradient-warm px-6 py-10 shadow-sm md:px-10 md:py-14 lg:px-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="flex flex-col">
            <h2 className="max-w-sm text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-[44px] lg:leading-[1.15]">
              {educationExperience.title}
            </h2>

            <div className="mt-8 overflow-hidden rounded-[24px] shadow-md sm:mt-10 lg:mt-auto lg:max-w-[410px]">
              <img
                src={aboutPageAssets.educationExperience}
                alt="Education and research"
                className="aspect-square w-full object-cover object-top"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-base leading-relaxed text-navy/80 md:text-lg">
              {educationExperience.description}
            </p>

            <div className="mt-8 space-y-4 sm:mt-10">
              {educationExperience.items.map((item) => (
                <article
                  key={item.title}
                  className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm sm:gap-5 sm:p-6"
                >
                  <EducationCardIcon />
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-base font-bold text-navy sm:text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/75 sm:text-base">
                      {item.description}
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
