import { newsletterContent } from '../../data/newsletterContent'

export function NewsletterSection() {
  return (
    <section className="bg-peach-banner px-4 py-16 md:px-11 md:py-20">
      <div className="mx-auto max-w-[908px] text-center">
        <h2 className="text-2xl font-bold text-navy md:text-4xl md:leading-tight">
          {newsletterContent.heading}
        </h2>

        <form
          className="mx-auto mt-8 flex max-w-[448px] overflow-hidden rounded-full bg-white shadow-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder={newsletterContent.placeholder}
            className="min-w-0 flex-1 bg-transparent px-6 py-4 text-sm text-navy outline-none placeholder:text-navy/45"
          />
          <button
            type="submit"
            className="shrink-0 bg-navy px-8 py-4 text-sm font-medium text-white transition hover:bg-navy/90"
          >
            {newsletterContent.submitLabel}
          </button>
        </form>

        <p className="mx-auto mt-6 max-w-[512px] text-sm leading-relaxed text-navy/80 md:text-base">
          {newsletterContent.description}
        </p>
      </div>
    </section>
  )
}
