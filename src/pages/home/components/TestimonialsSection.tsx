import { SectionBadge } from '../../../components/ui/SectionBadge'
import { homeAssets } from '../data/homeAssets'

export function TestimonialsSection() {
  return (
    <section className="bg-cream px-4 py-20 md:px-11">
      <div className="mx-auto max-w-[1440px]">
        <SectionBadge label="Testimonials" className="mx-auto" />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="h-1 w-32 rounded-full bg-accent" />
            <h2 className="mt-6 text-3xl font-bold leading-tight text-navy md:text-4xl">
              What People Say About Dr. Paul A. Stokes
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-navy/70">
              Get access to professional training that helps you gain skills employers
              value. From beginner to advanced, our programs are built for learners who
              want results.
            </p>
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                className="flex size-11 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-accent"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                className="flex size-11 items-center justify-center rounded-full border border-navy/15 text-navy transition hover:border-accent"
              >
                →
              </button>
            </div>
          </div>

          <article className="relative overflow-hidden rounded-3xl bg-navy lg:grid lg:grid-cols-[1fr_270px]">
            <div className="p-8 md:p-10">
              <p className="text-accent" aria-label="5 star rating">
                ★★★★★
              </p>
              <blockquote className="mt-6 text-lg leading-relaxed text-white/90">
                &ldquo;Dr. Stokes brings unparalleled insight into organizational systems.
                His guidance shaped my research and understanding of complex
                institutions.&rdquo;
              </blockquote>
              <footer className="mt-8">
                <p className="font-semibold text-white">Professor Jane Smith</p>
                <p className="text-sm text-white/70">University of Leeds</p>
              </footer>
            </div>
            <img
              src={homeAssets.testimonialPortrait}
              alt="Professor Jane Smith"
              className="hidden h-full min-h-[320px] w-full object-cover object-top lg:block"
            />
          </article>
        </div>
      </div>
    </section>
  )
}
