import type { ReactNode } from 'react'

/** Shared horizontal gutters and content width for site pages. */
export const PAGE_GUTTER = 'px-4 md:px-11'
export const PAGE_CONTAINER = 'mx-auto w-full max-w-[1440px]'

/** Consistent vertical rhythm between page sections. */
export const SECTION_PY = 'py-16 md:py-20'

type PageContainerProps = {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return <div className={`${PAGE_CONTAINER} ${className}`}>{children}</div>
}
