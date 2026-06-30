import { libraryContent } from '../data/libraryContent'

export function LibraryHeroSection() {
  return (
    <section className="px-4 pt-6 md:px-11 md:pt-8">
      <div className="relative mx-auto max-w-[1296px] overflow-hidden rounded-3xl">
        <div
          className="aspect-[1296/609] w-full bg-gradient-to-br from-navy/25 via-navy/15 to-accent/20"
          aria-hidden
        />
        <div className="absolute inset-0 bg-navy/30" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1 className="text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {libraryContent.heroTitle}
          </h1>
        </div>
      </div>
    </section>
  )
}
