import { SectionBadge } from '../../../components/ui/SectionBadge'
import { aboutPageAssets } from '../data/aboutPageAssets'
import { educationIntro } from '../data/aboutContent'

export function AboutEducationIntroSection() {
  return (
    <section className="relative overflow-hidden bg-cream px-4 py-16 md:px-11 md:py-24">
      <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionBadge label={educationIntro.badge} />
          <h2 className="mt-6 text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-5xl">
            {educationIntro.title}
          </h2>
          <div className="mt-6 space-y-4">
            {educationIntro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-navy/75">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[528px]">
          <div
            className="absolute right-0 top-0 h-[88%] w-[88%] rounded-3xl bg-gradient-to-br from-[#f0a03d] via-[#f7b85a] to-[#fdd89a]"
            aria-hidden
          />
          <div className="relative ml-8 mt-8 aspect-[464/580] w-[82%] overflow-hidden rounded-3xl shadow-md">
            <img
              src={aboutPageAssets.portraitMain}
              alt="Dr. Paul A. Stokes"
              className="size-full object-cover object-top"
            />
          </div>
          <div className="absolute bottom-4 left-0 aspect-[288/255] w-[55%] overflow-hidden rounded-2xl shadow-sm">
            <img
              src={aboutPageAssets.portraitAccent}
              alt=""
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
