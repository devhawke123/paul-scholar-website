import { useEffect, useState, type TouchEvent } from 'react'
import { Button } from '../ui/Button'
import { SectionBadge } from '../ui/SectionBadge'
import { featuredTestimonial, testimonialsContent } from '../../data/testimonialsContent'

type TestimonialsSectionProps = {
  showBadge?: boolean
}

function CarouselArrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="text-navy"
    >
      {direction === 'left' ? (
        <path
          d="M11 4L6 9l5 5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M7 4l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

export function TestimonialsSection({ showBadge = true }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const testimonial = testimonialsContent.items[activeIndex] ?? featuredTestimonial
  const total = testimonialsContent.items.length

  function transitionTo(nextIndex: (currentIndex: number) => number) {
    if (total <= 1 || isTransitioning) return

    setIsTransitioning(true)
    window.setTimeout(() => {
      setActiveIndex(nextIndex)
      setIsTransitioning(false)
    }, 180)
  }

  const goToPrevious = () => {
    transitionTo((index) => (index === 0 ? total - 1 : index - 1))
  }

  const goToNext = () => {
    transitionTo((index) => (index === total - 1 ? 0 : index + 1))
  }

  useEffect(() => {
    if (total <= 1) return

    const timer = window.setInterval(goToNext, 10000)

    return () => window.clearInterval(timer)
  }, [total, isTransitioning])

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    setTouchStartX(event.touches[0]?.clientX ?? null)
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    if (touchStartX === null || total <= 1) return

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX
    const delta = touchEndX - touchStartX
    const swipeThreshold = 40

    if (Math.abs(delta) < swipeThreshold) {
      setTouchStartX(null)
      return
    }

    if (delta > 0) {
      goToPrevious()
    } else {
      goToNext()
    }

    setTouchStartX(null)
  }

  return (
    <section className="bg-surface px-4 py-20 md:px-11">
      <div className="mx-auto max-w-[1440px] ">
      <div className="text-center ">
        {showBadge ? (
          <SectionBadge label={testimonialsContent.badge} className="mx-auto" />
        ) : null}
        </div>
        <div className={`grid gap-10 lg:grid-cols-2 lg:items-center ${showBadge ? 'mt-12' : ''}`}>
          <div>
            <div className="h-1 w-32 rounded-full bg-accent" />
            <h2 className="mt-6 text-3xl font-bold leading-tight text-navy md:text-4xl">
              {testimonialsContent.heading}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-navy/70">
              {testimonialsContent.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {total > 1 ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={goToPrevious}
                    className="flex size-12 items-center justify-center rounded-full border border-navy bg-white text-navy transition hover:bg-navy/5"
                  >
                    <CarouselArrow direction="left" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={goToNext}
                    className="flex size-12 items-center justify-center rounded-full bg-gradient-accent text-navy shadow-sm transition hover:opacity-90"
                  >
                    <CarouselArrow direction="right" />
                  </button>
                </div>
              ) : null}
              <Button className="rounded-full bg-gradient-accent px-8 hover:opacity-90">
                Explore More
              </Button>
            </div>
          </div>

          <article
            className="relative h-[360px] overflow-hidden rounded-3xl bg-white shadow-md lg:grid lg:h-[320px] lg:grid-cols-[1fr_270px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`flex h-full flex-col p-8 transition-opacity duration-300 md:p-10 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <p className="text-accent" aria-label={`${testimonial.rating} star rating`}>
                {'★'.repeat(testimonial.rating)}
              </p>
              <blockquote className="mt-6 h-[7.5rem] overflow-hidden text-lg leading-relaxed text-navy/80">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <footer className="mt-8 h-[3.5rem] overflow-hidden">
                <p className="font-semibold text-navy">{testimonial.name}</p>
                <p className="line-clamp-1 text-sm text-navy/60">{testimonial.role}</p>
              </footer>
            </div>
            <img
              src={testimonial.image}
              alt={testimonial.imageAlt}
              className={`hidden h-full min-h-[320px] w-full object-cover object-top transition-opacity duration-300 lg:block ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </article>
        </div>
      </div>
    </section>
  )
}
