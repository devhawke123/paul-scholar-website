import { aboutIcons } from '../../home/data/aboutAssets'
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

        <div className="relative mx-auto aspect-[528/640] w-full max-w-[528px]">
          <div
            aria-hidden
            className="absolute left-10 top-0 h-[72%] w-[90%] rounded-[60px] rounded-tl-[16px] bg-gradient-warm sm:rounded-tl-[120px]"
          />

          <div className="absolute right-3 top-[16%] z-[1] aspect-[464/580] w-[78%] overflow-hidden  shadow-md sm:top-[14%] sm:w-[71%] sm:rounded-[18px]">
            <img
              src={aboutPageAssets.portraitMain}
              alt="Dr. Paul A. Stokes"
              className="size-full object-cover object-top"
            />
          </div>

          <div className="absolute bottom-[8%] -left-10 z-[2] aspect-[388/305] w-[44%] overflow-hidden shadow-lg sm:bottom-[13%] sm:w-[50%] sm:rounded-[15px]">
            <img
              src={aboutPageAssets.portraitAccent}
              alt=""
              className="size-full object-cover object-center"
            />
          </div>

          <img
            src={aboutIcons.decorativeVector}
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-[2%] right-[2%]  w-[72px] opacity-95 sm:bottom-[4%] sm:right-4 sm:w-[90px]"
          />
        </div>
      </div>
    </section>
  )
}
