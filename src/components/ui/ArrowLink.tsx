type ArrowLinkProps = {
  label: string
  href?: string
  className?: string
}

export function ArrowLink({ label, href = '#', className = '' }: ArrowLinkProps) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-medium text-navy transition-colors hover:text-accent ${className}`}
    >
      {label}
      <svg
        className="size-4 transition-transform group-hover:translate-x-0.5"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}
