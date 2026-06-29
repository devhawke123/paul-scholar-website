import { type FormEvent, useState } from 'react'
import { contactInfo } from '../data/contactContent'
import { ContactChannelCard } from './ContactChannelCard'
import { ContactSubmitButton } from './ContactSubmitButton'

const fieldClassName =
  'w-full border-0 border-b border-navy bg-transparent py-3 text-sm text-navy outline-none transition placeholder:text-navy/35 focus:border-accent'

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-cream px-4 py-16 md:px-11 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-3xl font-bold text-navy md:text-5xl">Get in Touch</h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-0">
          <div className="lg:pr-14">
            <p className="text-base font-bold text-navy">Send a Message</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy/70 md:text-base">
              Every journey begins with a conversation. If you feel aligned with this approach,
              contact us to explore whether you&apos;re suitable for the program and how the
              process would apply to your situation.
            </p>

            <form onSubmit={handleSubmit} className="mt-10">
              <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-navy">First Name</span>
                  <input type="text" name="firstName" required className={fieldClassName} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-navy">Last Name</span>
                  <input type="text" name="lastName" required className={fieldClassName} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-navy">Email Address</span>
                  <input type="email" name="email" required className={fieldClassName} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-navy">Contact No</span>
                  <input type="tel" name="phone" className={fieldClassName} />
                </label>
              </div>

              <label className="mt-7 block">
                <span className="mb-1 block text-sm font-medium text-navy">Message</span>
                <textarea
                  name="message"
                  rows={3}
                  required
                  className={`${fieldClassName} resize-none`}
                />
              </label>

              <div className="mt-10 flex flex-wrap items-center justify-end gap-4">
                {submitted && (
                  <p className="text-sm text-green-700">
                    Thank you — your message has been received.
                  </p>
                )}
                <ContactSubmitButton />
              </div>
            </form>
          </div>

          <div className="hidden bg-navy/15 lg:block" aria-hidden />

          <div className="space-y-5 lg:pl-14">
            <ContactChannelCard
              title="Call Us"
              description="If you prefer direct communication, our team is available to assist you over the phone. We respond to all inquiries with care and confidentiality,"
              actionLabel={contactInfo.displayPhone}
              icon="phone"
              onAction={() => {
                window.location.href = `tel:${contactInfo.phone}`
              }}
            />
            <ContactChannelCard
              title="Live Chat"
              description="For quick questions or initial guidance, you can connect with our support team through live chat. This option is ideal for fast responses and general inquiries about the program."
              actionLabel="Start Chat"
              icon="chat"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
