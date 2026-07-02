// import { Link } from 'react-router-dom' 
import { Button } from '../../../components/ui/Button'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { aboutIcons } from '../data/aboutAssets'
import { homeAssets } from '../data/homeAssets'
import { aboutHighlights } from '../data/homeContent'
import { AboutHighlightIcon } from './AboutHighlightIcon'

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream px-4 py-20 md:px-11">
      <img
        src={aboutIcons.decorativeVector}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-6 top-24 w-24 opacity-90 md:w-28"
      />
      <img
        src={aboutIcons.decorativeVectorAlt}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-4 bottom-16 w-20 opacity-90 md:w-24"
      />
      <img
        src={aboutIcons.decorativeVector}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 w-20 -translate-y-1/2 opacity-90 md:w-24"
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[663px]">
          <div
            aria-hidden
            className="absolute left-[-24px] top-[-24px] h-[88%] w-[92%] rounded-[24px] rounded-tr-[72px] bg-gradient-warm shadow-sm sm:left-[-36px] sm:top-[-32px] sm:rounded-[35px] sm:rounded-tr-[100px]"
          />

          <div className="relative ml-4 mt-3 overflow-hidden rounded-2xl shadow-md sm:ml-6 sm:mt-4 sm:rounded-3xl lg:ml-10 lg:mt-8">
            <img
              src={homeAssets.aboutPortrait}
              alt="Dr. Paul A. Stokes"
              className="aspect-[464/500] w-full object-cover object-top"
            />
          </div>

          <a
            href="mailto:pol@bhaile.ie"
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-accent px-8 py-3 text-sm font-medium text-navy shadow-lg transition hover:bg-accent/90"
          >
            <svg className="size-4" viewBox="0 0 20 16" fill="none" aria-hidden>
              <path
                d="M1 3.5A2 2 0 013 1.5h14a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2v-9z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M1.5 4l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            pol@bhaile.ie
          </a>
        </div>

        <div className="relative">
          <SectionBadge label="About" />
          <h2 className="mt-6 text-3xl font-bold tracking-wide text-navy md:text-4xl">
            Dr. Paul A. Stokes
          </h2>
          <p className="mt-6 text-base leading-relaxed text-navy/75">
            Dr. Paul A. Stokes is a scholar of organizational theory and sociological
            economics, with a PhD from the European Business Management School at the
            University of Wales, Swansea. He studied under Professor Stafford Beer, the
            pioneer of Managerial Cybernetics, shaping his deep expertise in systems
            thinking and organizational design.
          </p>

          <div className="mt-8 space-y-5">
            {aboutHighlights.map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-4 rounded-2xl bg-peach-highlight p-4 sm:flex-row sm:gap-5 sm:p-5"
              >
                <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-navy sm:size-[93px]">
                  <AboutHighlightIcon variant={item.icon} className="size-9 sm:size-11" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            {/* <Link to="/about"> */}
              <Button className="rounded-full px-10">Explore More</Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </section>
  )
}
