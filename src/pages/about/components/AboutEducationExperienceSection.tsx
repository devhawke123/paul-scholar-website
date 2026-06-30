import { aboutPageAssets } from '../data/aboutPageAssets'
import { educationExperience } from '../data/aboutContent'

function EducationTabIcon() {
  return (
    <span className="flex size-[70px] shrink-0 items-center justify-center rounded-2xl bg-navy text-white">
      <svg className="size-8" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3 2 8l10 5 10-5-10-5zm0 7.2L4.24 8 12 4.8 19.76 8 12 10.2zm-8 3.3V16l8 4.5 8-4.5v-2.5l-8 4.5-8-4.5z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

export function AboutEducationExperienceSection() {
  return (
    <section className="bg-[#f5f5f5] px-4 py-16 md:px-11 md:py-24">
      <div className="mx-auto max-w-[1350px]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-5xl">
              {educationExperience.title}
            </h2>
            <div className="mt-8 aspect-[410/358] max-w-md overflow-hidden rounded-3xl">
              <img
                src={aboutPageAssets.educationExperience}
                alt="Education and research"
                className="size-full object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-base leading-relaxed text-navy/75 md:text-lg">
              {educationExperience.description}
            </p>

            <div className="mt-8 space-y-4">
              {educationExperience.items.map((item) => (
                <article
                  key={item.title}
                  className="flex gap-5 rounded-2xl bg-white p-5 shadow-sm"
                >
                  <EducationTabIcon />
                  <div>
                    <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/70">
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
