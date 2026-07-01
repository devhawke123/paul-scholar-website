import { SectionBadge } from '../../../components/ui/SectionBadge'
import { aboutPageAssets } from '../data/aboutPageAssets'
import { careerAchievements } from '../data/aboutContent'

export function AboutAchievementsSection() {
  return (
    <section className="bg-cream px-4 py-1 md:px-11 md:pb-25">
      <div className="mx-auto max-w-[1260px] text-center">
        <SectionBadge label={careerAchievements.badge} className="mx-auto" />
        <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
          {careerAchievements.title}
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
          {careerAchievements.items.map((item, index) => (
            <article
              key={item.title}
              className={`relative overflow-hidden rounded-2xl text-left shadow-sm sm:rounded-3xl ${
                item.featured ? 'lg:-mt-0' : ''
              }`}
            >
              <img
                src={aboutPageAssets.achievementImages[index]}
                alt={item.title}
                className={`w-full object-cover ${
                  item.featured ? 'h-60 sm:h-64 lg:h-72' : 'h-52 sm:h-56 lg:h-64'
                }`}
              />
              <div
                // className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent"
                // aria-hidden
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
