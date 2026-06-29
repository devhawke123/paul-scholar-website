type ContactChannelCardProps = {
  title: string
  description: string
  actionLabel: string
  icon: 'phone' | 'chat'
  onAction?: () => void
}

function ChannelIcon({ icon }: { icon: ContactChannelCardProps['icon'] }) {
  if (icon === 'phone') {
    return (
      <svg className="size-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M2.5 1.5h2.2l1 2.4-1.3 1.3a7.5 7.5 0 003.6 3.6l1.3-1.3 2.4 1v2.2a1 1 0 01-1 1A10.5 10.5 0 011.5 2.5a1 1 0 011-1z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg className="size-4" viewBox="0 0 18 14" fill="none" aria-hidden>
      <path
        d="M1 1h16v8H5l-4 4V1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ContactChannelCard({
  title,
  description,
  actionLabel,
  icon,
  onAction,
}: ContactChannelCardProps) {
  return (
    <div className="rounded-2xl bg-[#ffc896]/45 px-6 py-7">
      <h3 className="text-base font-bold text-navy">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-navy/75">{description}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-5 inline-flex items-center gap-3 text-sm font-medium text-navy transition-colors hover:text-navy/80"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-white text-navy shadow-sm">
          <ChannelIcon icon={icon} />
        </span>
        {actionLabel}
      </button>
    </div>
  )
}
