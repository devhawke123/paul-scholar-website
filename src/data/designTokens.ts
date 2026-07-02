/** Figma-aligned design tokens — prefer Tailwind classes in components. */
export const colors = {
  navy: '#0b1f3a',
  accent: '#ffa947',
  peach: '#ffc889',
  cream: '#fdf8f3',
  surface: '#f5f5f5',
} as const

export const gradients = {
  /** Figma background gradient: accent → peach 90% → peach 80% */
  warm: 'linear-gradient(to bottom right, #ffa947 0%, rgb(255 200 137 / 0.9) 50%, rgb(255 200 137 / 0.8) 100%)',
  /** Buttons / CTAs: peach → accent */
  accent: 'linear-gradient(to right, #ffc889 0%, #ffa947 100%)',
} as const
