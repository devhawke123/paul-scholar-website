import type { ReactNode } from 'react'
import type { ContentBlock, ContentSection } from '../../types/contentSection'

type StructuredArticleContentProps = {
  title: string
  author?: string
  authorTitle?: string
  sections: ContentSection[]
  footer?: ReactNode
}

function SectionHeading({ title, variant }: { title: string; variant: ContentSection['variant'] }) {
  if (variant === 'major') {
    return (
      <h2 className="text-2xl font-medium leading-tight text-navy md:text-[28px] md:leading-[48px]">
        {title}
      </h2>
    )
  }

  return (
    <h3 className="text-xl font-semibold leading-tight text-navy md:text-[25px] md:leading-[48px]">
      {title}
    </h3>
  )
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === 'subheading') {
    return (
      <p className="text-base font-bold leading-relaxed text-navy md:leading-[48px]">
        {block.text}
      </p>
    )
  }

  if (block.type === 'image') {
    const src = block.url
    if (!src) return null

    return (
      <figure className={block.layout === 'full' ? 'my-8 md:my-10' : 'my-6'}>
        <img
          src={src}
          alt=""
          className={
            block.layout === 'full'
              ? 'aspect-[1289/422] w-full rounded-2xl object-cover'
              : 'w-full rounded-xl object-cover'
          }
        />
      </figure>
    )
  }

  return (
    <p className="text-base leading-6 tracking-[0.32px] text-navy/90">{block.text}</p>
  )
}

function SectionBlocks({ blocks, section }: { blocks: ContentBlock[]; section: ContentSection }) {
  const sideImage = section.sideImageUrl
  const contentBlocks = blocks.filter((block) => !(block.type === 'image' && block.layout === 'side'))

  if (!sideImage) {
    return (
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <BlockRenderer key={`${block.type}-${index}`} block={block} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_328px] lg:items-start">
      <div className="space-y-4">
        {contentBlocks.map((block, index) => (
          <BlockRenderer key={`${block.type}-${index}`} block={block} />
        ))}
      </div>
      <img
        src={sideImage}
        alt=""
        className="h-auto w-full rounded-xl object-cover lg:sticky lg:top-28"
      />
    </div>
  )
}

export function StructuredArticleContent({
  title,
  author,
  authorTitle,
  sections,
  footer,
}: StructuredArticleContentProps) {
  return (
    <article className="px-4 py-10 md:px-11 md:py-14">
      <div className="mx-auto max-w-[1304px]">
        <h1 className="text-3xl font-medium leading-tight text-navy md:text-[48px] md:leading-[48px]">
          {title}
        </h1>

        {(author || authorTitle) && (
          <p className="mt-4 text-base font-medium text-navy/80 md:leading-[48px]">
            {author}
            {authorTitle ? ` ${authorTitle}` : ''}
          </p>
        )}

        <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <SectionHeading title={section.title} variant={section.variant} />
              <SectionBlocks blocks={section.blocks} section={section} />
            </section>
          ))}
        </div>

        {footer}
      </div>
    </article>
  )
}
