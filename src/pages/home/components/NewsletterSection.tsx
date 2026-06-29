import { Button } from '../../../components/ui/Button'

export function NewsletterSection() {
  return (
    <section className="px-4 py-20 md:px-11">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-3xl bg-gradient-to-r from-navy to-navy/90 px-6 py-16 text-center md:px-16">
        <h2 className="text-2xl font-bold text-white md:text-4xl">
          Stay Ahead with My Latest Learning Resources
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
          Get high-level strategic insights on managing organizational complexity,
          systems thinking, and sustainable institutional design.
        </p>
        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter Your Mail Here"
            className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-accent"
          />
          <Button className="shrink-0 rounded-xl px-8">Subscribe</Button>
        </form>
      </div>
    </section>
  )
}
