import type { ReactNode } from 'react'

type AlertVariant = 'error' | 'success' | 'info'

const variantClasses: Record<AlertVariant, string> = {
  error: 'border-red-200 bg-red-50 text-red-700',
  success: 'border-green-200 bg-green-50 text-green-700',
  info: 'border-navy/15 bg-navy/5 text-navy/80',
}

type AlertProps = {
  variant?: AlertVariant
  children: ReactNode
  onDismiss?: () => void
  className?: string
}

export function Alert({
  variant = 'error',
  children,
  onDismiss,
  className = '',
}: AlertProps) {
  return (
    <div
      role="alert"
      className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${variantClasses[variant]} ${className}`}
    >
      <p className="min-w-0 flex-1 leading-relaxed">{children}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 leading-none opacity-60 transition hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  )
}
