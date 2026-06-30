import { SectionBadge } from '../../../components/ui/SectionBadge'
import { aboutPageAssets } from '../data/aboutPageAssets'
import { careerAchievements } from '../data/aboutContent'

export function AboutAchievementsSection() {
  return (
    <section className="bg-cream px-4 py-16 md:px-11 md:py-24">
      <div className="mx-auto max-w-[1260px] text-center">
        <SectionBadge label={careerAchievements.badge} className="mx-auto" />
        <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold text-navy md:text-4xl lg:text-5xl">
          {careerAchievements.title}
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
          {careerAchievements.items.map((item, index) => (
            <article
              key={item.title}
              className={`overflow-hidden rounded-3xl bg-white text-left shadow-sm ${
                item.featured ? 'lg:-mt-6 lg:pb-2' : ''
              }`}
            >
              <img
                src={aboutPageAssets.achievementImages[index]}
                alt={item.title}
                className={`w-full object-cover ${item.featured ? 'h-56' : 'h-48'}`}
              />
              <div className="p-5">
                <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
