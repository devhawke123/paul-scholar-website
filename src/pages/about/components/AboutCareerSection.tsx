import { SectionBadge } from '../../../components/ui/SectionBadge'
import { aboutPageAssets } from '../data/aboutPageAssets'
import { professionalCareer } from '../data/aboutContent'

export function AboutCareerSection() {
  return (
    <section className="bg-cream px-4 py-16 md:px-11 md:py-24">
      <div className="mx-auto max-w-[1355px] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#efb04a] via-[#f5c47a] to-[#fde8c8] px-6 py-10 md:px-10 md:py-14">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionBadge label={professionalCareer.badge} />
            <h2 className="mt-6 text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-5xl">
              {professionalCareer.title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-navy/80">
              {professionalCareer.description}
            </p>

            <div className="relative mt-10 h-[420px] max-w-md">
              <div className="absolute right-0 top-0 h-full w-[59%] overflow-hidden rounded-3xl">
                <img
                  src={aboutPageAssets.careerBack}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-[95%] w-[86%] overflow-hidden rounded-3xl shadow-md">
                <img
                  src={aboutPageAssets.careerFront}
                  alt="Dr. Paul A. Stokes"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <div className="relative pl-8 lg:pl-12">
            <div className="absolute bottom-4 left-[11px] top-4 w-px bg-navy/20 lg:left-[11px]" aria-hidden />

            <div className="space-y-10">
              {professionalCareer.roles.map((role) => (
                <article key={role.period} className="relative pl-10">
                  <span
                    className="absolute left-0 top-1 size-[22px] rounded-full border-4 border-[#f5c47a] bg-navy"
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-navy/60">{role.period}</p>
                  <h3 className="mt-1 text-lg font-semibold text-navy">{role.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/75">
                    {role.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
