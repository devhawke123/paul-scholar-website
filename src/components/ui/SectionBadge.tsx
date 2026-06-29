type SectionBadgeProps = {
  label: string
  className?: string
}

export function SectionBadge({ label, className = '' }: SectionBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-navy/10 bg-white/80 px-5 py-2 text-sm text-navy ${className}`}
    >
      <span className="size-2.5 rounded-full bg-accent" aria-hidden />
      <span>{label}</span>
    </div>
  )
}
