import type { ReactNode } from 'react'

export type DetailPageHeroProps = {
  imageSrc: string
  imageAlt: string
  badges: ReactNode
  title: string
  description?: string
  meta?: ReactNode
}

export function DetailPageHero({
  imageSrc,
  imageAlt,
  badges,
  title,
  description,
  meta,
}: DetailPageHeroProps) {
  return (
    <section className="px-4 pb-2 pt-3 sm:pb-4 sm:pt-5 md:px-11 md:pb-6 md:pt-8">
      <div className="relative mx-auto max-w-[1296px] overflow-hidden rounded-[16px] sm:rounded-[28px] md:rounded-[32px]">
        {/* Mobile: image band + text panel (avoids overlay overflow) */}
        <div className="md:hidden">
          <div className="relative aspect-[16/10] w-full">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-navy/35" />
            <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-2">
              {badges}
            </div>
          </div>
          <div className="bg-navy px-4 py-5 sm:px-6 sm:py-6">
            <h1 className="break-words font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-3 break-words text-sm leading-relaxed text-white/90 sm:text-base">
                {description}
              </p>
            ) : null}
            {meta ? (
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-white">
                {meta}
              </div>
            ) : null}
          </div>
        </div>

        {/* Tablet/desktop: overlay layout */}
        <div className="relative hidden md:block">
          <div className="relative overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="aspect-[16/9] w-full object-cover object-center lg:aspect-[1296/609]"
            />
            <div className="absolute inset-0 bg-navy/35" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-between px-8 py-8 lg:px-[72px] lg:py-10">
            <div className="flex max-w-full flex-wrap items-center gap-3">{badges}</div>

            <div className="min-w-0 max-w-[857px]">
              <h1 className="break-words font-serif text-4xl font-bold leading-tight text-white lg:text-[50px] lg:leading-[1.2]">
                {title}
              </h1>
              {description ? (
                <p className="mt-4 max-w-[802px] break-words text-base leading-relaxed text-white/90 lg:text-lg">
                  {description}
                </p>
              ) : null}
              {meta ? (
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-base font-semibold text-white">
                  {meta}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
