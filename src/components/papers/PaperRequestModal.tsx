import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '../ui/Button'
import { sendPaperRequest } from '../../services/email'

type Props = {
  paper: { id: string; title: string }
  onClose: () => void
}

export function PaperRequestModal({ paper, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      await sendPaperRequest({
        paperTitle: paper.title,
        requesterEmail: email.trim(),
        reason: reason.trim(),
      })
      setStatus('success')
    } catch {
      setErrorMsg('Failed to send request. Please try again.')
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-accent'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-cream p-6 shadow-xl md:p-8">
        {status === 'success' ? (
          <div className="py-4 text-center">
            <p className="text-4xl" aria-hidden>
              ✉️
            </p>
            <h2 className="mt-4 text-xl font-bold text-navy">Request sent!</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy/70">
              We&apos;ll review your request and send{' '}
              <span className="font-medium text-navy">&ldquo;{paper.title}&rdquo;</span> to{' '}
              <strong>{email}</strong> shortly.
            </p>
            <Button onClick={onClose} className="mt-6 px-10">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-navy">Request Paper Access</h2>
                <p className="mt-1 line-clamp-2 text-sm text-navy/60">{paper.title}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 text-lg leading-none text-navy/40 transition hover:text-navy"
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => void handleSubmit(e)} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-navy">Your email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={fieldClass}
                />
                <p className="mt-1 text-xs text-navy/50">
                  The paper will be sent to this address.
                </p>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-navy">
                  Reason for access
                </span>
                <textarea
                  required
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly explain why you need access to this paper…"
                  className={`${fieldClass} resize-none`}
                />
              </label>

              {status === 'error' && (
                <p className="text-sm text-red-600">{errorMsg}</p>
              )}

              <div className="flex items-center gap-3 pt-1">
                <Button type="submit" disabled={status === 'sending'} className="px-8">
                  {status === 'sending' ? 'Sending…' : 'Submit Request'}
                </Button>
                <Button type="button" variant="ghost" onClick={onClose} className="px-4">
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
