import { useState } from 'react'
import { contactFaqs } from '../data/contactContent'

function FaqToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-base leading-none ${
        isOpen ? 'bg-white text-navy' : 'bg-accent text-white'
      }`}
      aria-hidden
    >
      {isOpen ? '−' : '+'}
    </span>
  )
}

export function ContactFaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="bg-white px-4 py-16 md:px-11 md:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:pr-8">
          <h2 className="font-serif text-4xl font-bold leading-[1.1] text-navy md:text-5xl lg:text-6xl">
            Frequently asked Questions
          </h2>
        </div>

        <div>
          <p className="text-base font-bold text-navy">Clarity Before You Begin</p>
          <p className="mt-3 text-sm leading-relaxed text-navy/70 md:text-base">
            If you have questions about the process, structure, or suitability of the program,
            this section provides clear and direct answers to help you understand how everything
            works before getting started. Our goal is to ensure full clarity so you can make an
            informed decision.
          </p>

          <div className="mt-8">
            {contactFaqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <div
                  key={faq.question}
                  className={
                    isOpen
                      ? 'my-3 rounded-2xl bg-[#ffc896]/45 px-5 py-5'
                      : 'border-b border-navy/15 py-5'
                  }
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-medium leading-snug text-navy md:text-[15px]">
                      {faq.question}
                    </span>
                    <FaqToggleIcon isOpen={isOpen} />
                  </button>
                  {isOpen && (
                    <p className="mt-4 pr-12 text-sm leading-relaxed text-navy/75">
                      {faq.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
