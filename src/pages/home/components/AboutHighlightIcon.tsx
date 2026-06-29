type AboutHighlightIconProps = {
  variant: 'academic' | 'strategic'
  className?: string
}

export function AboutHighlightIcon({ variant, className = '' }: AboutHighlightIconProps) {
  if (variant === 'academic') {
    return (
      <svg
        className={className}
        viewBox="0 0 45 45"
        fill="none"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 14h22v24H8V14z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M12 14V11a4 4 0 014-4h13v7" stroke="white" strokeWidth="1.5" />
        <path d="M14 22h10M14 27h14M14 32h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="32" cy="12" r="5" stroke="white" strokeWidth="1.5" />
        <path d="M30 12h4M32 10v4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg
      className={className}
      viewBox="0 0 34 45"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="8" width="7" height="32" rx="1" stroke="white" strokeWidth="1.5" />
      <rect x="13.5" y="4" width="7" height="36" rx="1" stroke="white" strokeWidth="1.5" />
      <rect x="24" y="12" width="7" height="28" rx="1" stroke="white" strokeWidth="1.5" />
      <path d="M5 14h3M5 19h3M5 24h3M15.5 12h3M15.5 17h3M15.5 22h3M26 18h3M26 23h3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
