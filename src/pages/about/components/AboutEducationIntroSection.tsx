import { PAGE_GUTTER, PageContainer } from '../../../components/layout/PageContainer'
import { DecorativeVector } from '../../../components/ui/DecorativeVector'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { aboutPageAssets } from '../data/aboutPageAssets'
import { educationIntro } from '../data/aboutContent'

export function AboutEducationIntroSection() {
  return (
    <section className={`relative overflow-x-hidden bg-cream pb-4 pt-4 sm:pb-8 sm:pt-6 md:pb-12 md:pt-8 lg:py-20 ${PAGE_GUTTER}`}>
      <PageContainer className="grid min-w-0 gap-5 sm:gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="min-w-0">
          <SectionBadge label={educationIntro.badge} />
          <h2 className="mt-3 text-2xl font-bold leading-tight text-navy xs:text-[26px] sm:mt-4 md:text-4xl lg:text-5xl">
            {educationIntro.title}
          </h2>
          <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
            {educationIntro.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-sm leading-relaxed text-navy/75 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="flex w-full justify-center lg:justify-end">
          <div className="relative aspect-[4/5] w-full max-w-[260px] xs:max-w-[275px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[528px]">
            <div
              aria-hidden
              className="absolute left-1/2 top-0 h-[68%] w-[82%] -translate-x-1/2 rounded-[28px] rounded-tl-[12px] bg-gradient-warm sm:left-8 sm:w-[90%] sm:translate-x-0 sm:rounded-[48px] sm:rounded-tl-[80px] lg:left-10 lg:rounded-[60px] lg:rounded-tl-[120px]"
            />

            <div className="absolute left-1/2 top-[12%] z-[1] aspect-[464/580] w-[68%] -translate-x-1/2 overflow-hidden rounded-2xl shadow-md sm:left-auto sm:right-3 sm:top-[14%] sm:w-[71%] sm:translate-x-0 sm:rounded-[18px]">
              <img
                src={aboutPageAssets.portraitMain}
                alt="Dr. Paul A. Stokes"
                className="size-full object-cover object-top"
              />
            </div>

            <div className="absolute bottom-[6%] left-[4%] z-[2] aspect-[388/305] w-[44%] overflow-hidden rounded-xl shadow-lg sm:bottom-[13%] sm:-left-8 sm:w-[48%] sm:rounded-[15px] lg:-left-10 lg:w-[50%]">
              <img
                src={aboutPageAssets.portraitAccent}
                alt=""
                className="size-full object-cover object-center"
              />
            </div>

            <DecorativeVector className="absolute bottom-[2%] right-[2%] opacity-95 lg:bottom-[4%] lg:right-4" />
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
