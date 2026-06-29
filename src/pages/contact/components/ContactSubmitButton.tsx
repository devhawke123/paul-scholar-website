function SubmitArrowIcon() {
  return (
    <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type ContactSubmitButtonProps = {
  disabled?: boolean
}

export function ContactSubmitButton({ disabled }: ContactSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="inline-flex h-11 items-center gap-3 rounded-full bg-accent pl-6 pr-1.5 text-sm font-medium text-navy transition hover:bg-accent/90 disabled:opacity-60"
    >
      Submit
      <span className="flex size-8 items-center justify-center rounded-full bg-white text-navy">
        <SubmitArrowIcon />
      </span>
    </button>
  )
}
