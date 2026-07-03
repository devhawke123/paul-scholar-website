import { SectionBadge } from '../../../components/ui/SectionBadge'
import { aboutPageAssets } from '../data/aboutPageAssets'
import { careerAchievements } from '../data/aboutContent'

export function AboutAchievementsSection() {
  return (
    <section className="bg-cream px-4 pb-10 pt-4 sm:pb-14 sm:pt-6 md:px-11 md:pb-20 md:pt-8">
      <div className="mx-auto max-w-[1260px] text-center">
        <SectionBadge label={careerAchievements.badge} className="mx-auto" />
        <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-bold text-navy xs:text-[26px] sm:mt-4 md:text-4xl lg:text-5xl">
          {careerAchievements.title}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 xs:grid-cols-2 sm:mt-10 sm:gap-5 md:grid-cols-3 lg:grid-cols-5 lg:items-end lg:gap-4 xl:gap-5">
          {careerAchievements.items.map((item, index) => (
            <article
              key={item.title}
              className="relative overflow-hidden rounded-2xl text-left shadow-sm sm:rounded-3xl"
            >
              <img
                src={aboutPageAssets.achievementImages[index]}
                alt={item.title}
                className="h-48 w-full object-cover xs:h-52 sm:h-56 md:h-60 lg:h-64 xl:h-72"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="text-sm font-semibold leading-snug text-white sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/85 sm:text-sm">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
