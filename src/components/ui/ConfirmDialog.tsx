import { useEffect, type ReactNode } from 'react'
import { Button } from './Button'

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'danger'
  isLoading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !isLoading) onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, isLoading, onCancel])

  if (!open) return null

  const confirmClassName =
    variant === 'danger'
      ? 'bg-red-600 text-white hover:bg-red-700'
      : 'bg-navy text-white hover:bg-navy/90'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onCancel()
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="w-full max-w-md rounded-2xl bg-cream p-6 shadow-xl md:p-8"
      >
        <h2 id="confirm-dialog-title" className="text-lg font-bold text-navy">
          {title}
        </h2>
        <div
          id="confirm-dialog-description"
          className="mt-2 text-sm leading-relaxed text-navy/70"
        >
          {description}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            disabled={isLoading}
            onClick={onCancel}
            className="px-5"
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`px-6 ${confirmClassName}`}
          >
            {isLoading ? 'Working…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
