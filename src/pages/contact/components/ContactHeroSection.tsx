import { Button } from '../../../components/ui/Button'

export function ContactHeroSection() {
  return (
    <section className="px-4 pt-6 md:px-11 md:pt-8">
      <div className="relative mx-auto max-w-[1296px] overflow-hidden rounded-3xl">
        <div
          className="aspect-[1296/609] w-full bg-gradient-to-br from-navy/25 via-navy/15 to-accent/20"
          aria-hidden
        />
        <div className="absolute inset-0 bg-navy/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="max-w-3xl text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            Get In Touch
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
            Partner with an experienced strategic leader to navigate complex institutional
            governance and organizational challenges
          </p>
          <Button className="mt-8 h-14 rounded-full px-10 text-base">
            Request Private Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
