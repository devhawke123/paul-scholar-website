import { useState, type FormEvent } from 'react'
import { PAGE_GUTTER, PageContainer } from '../layout/PageContainer'
import { Alert } from '../ui/Alert'
import { newsletterContent } from '../../data/newsletterContent'
import { sendNewsletterSignup } from '../../services/email'
import { formatErrorMessage } from '../../utils/errors'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()

    if (!trimmed) {
      setErrorMsg('Please enter your email address.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setErrorMsg('')
    try {
      await sendNewsletterSignup(trimmed)
      setStatus('success')
      setEmail('')
    } catch (err) {
      setErrorMsg(formatErrorMessage(err, 'Failed to subscribe. Please try again.'))
      setStatus('error')
    }
  }

  return (
    <section className={`bg-peach-banner py-16 md:py-20 ${PAGE_GUTTER}`}>
      <PageContainer>
      <div className="mx-auto max-w-[908px] text-center">        <h2 className="text-2xl font-bold text-navy md:text-4xl md:leading-tight">
          {newsletterContent.heading}
        </h2>

        {status === 'success' ? (
          <div className="mx-auto mt-8 max-w-[448px] text-left">
            <Alert variant="success">Thanks for subscribing!</Alert>
          </div>
        ) : (
          <form
            className="mx-auto mt-8 max-w-[448px] space-y-3"
            onSubmit={(e) => void handleSubscribe(e)}
            noValidate
          >
            <div className="flex overflow-hidden rounded-full bg-white shadow-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') {
                    setStatus('idle')
                    setErrorMsg('')
                  }
                }}
                placeholder={newsletterContent.placeholder}
                className="min-w-0 flex-1 bg-transparent px-6 py-4 text-sm text-navy outline-none placeholder:text-navy/45"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="shrink-0 bg-navy px-8 py-4 text-sm font-medium text-white transition hover:bg-navy/90 disabled:opacity-60"
              >
                {status === 'sending' ? 'Subscribing…' : newsletterContent.submitLabel}
              </button>
            </div>
            {status === 'error' && errorMsg && <Alert>{errorMsg}</Alert>}
          </form>
        )}

        <p className="mx-auto mt-6 max-w-[512px] text-sm leading-relaxed text-navy/80 md:text-base">
          {newsletterContent.description}
        </p>
      </div>
      </PageContainer>
    </section>  )
}
