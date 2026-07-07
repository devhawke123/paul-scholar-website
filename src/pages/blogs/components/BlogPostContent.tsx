import {
  resolveBlogBlockImage,
  resolveBlogSectionSideImage,
} from '../../../data/blogs'
import type { BlogContentBlock, BlogContentSection } from '../../../types/blog'

type BlogPostContentProps = {
  title: string
  author: string
  authorTitle?: string
  sections: BlogContentSection[]
}

function SectionHeading({ title, variant }: { title: string; variant: BlogContentSection['variant'] }) {
  if (variant === 'major') {
    return (
      <h2 className="break-words text-xl font-medium leading-snug text-navy sm:text-2xl sm:leading-tight md:text-[28px] md:leading-[1.35]">
        {title}
      </h2>
    )
  }

  return (
    <h3 className="break-words text-lg font-semibold leading-snug text-navy sm:text-xl sm:leading-tight md:text-[25px] md:leading-[1.35]">
      {title}
    </h3>
  )
}

function BlockRenderer({ block }: { block: BlogContentBlock }) {
  if (block.type === 'subheading') {
    return (
      <p className="break-words text-base font-bold leading-relaxed text-navy">
        {block.text}
      </p>
    )
  }

  if (block.type === 'image') {
    return (
      <figure className={block.layout === 'full' ? 'my-6 md:my-10' : 'my-4 md:my-6'}>
        <img
          src={resolveBlogBlockImage(block)}
          alt=""
          className={
            block.layout === 'full'
              ? 'aspect-[16/10] w-full max-w-full rounded-2xl object-cover sm:aspect-[1289/422]'
              : 'w-full max-w-full rounded-xl object-cover'
          }
        />
      </figure>
    )
  }

  return (
    <p className="break-words text-base leading-6 tracking-[0.32px] text-navy/90">{block.text}</p>
  )
}

function SectionBlocks({
  blocks,
  section,
}: {
  blocks: BlogContentBlock[]
  section: BlogContentSection
}) {
  const sideImageIndex = blocks.findIndex(
    (block) => block.type === 'image' && block.layout === 'side',
  )
  const resolvedSideImage = resolveBlogSectionSideImage(section)
  const hasSideLayout = Boolean(resolvedSideImage) || sideImageIndex >= 0

  if (!hasSideLayout) {
    return (
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <BlockRenderer key={`${block.type}-${index}`} block={block} />
        ))}
      </div>
    )
  }

  const sideImage =
    resolvedSideImage ??
    (sideImageIndex >= 0 && blocks[sideImageIndex].type === 'image'
      ? resolveBlogBlockImage(blocks[sideImageIndex])
      : undefined)
  const contentBlocks =
    sideImageIndex >= 0 ? blocks.filter((_, index) => index !== sideImageIndex) : blocks

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_328px] lg:items-start">
      <div className="space-y-4">
        {contentBlocks.map((block, index) => (
          <BlockRenderer key={`${block.type}-${index}`} block={block} />
        ))}
      </div>
      {sideImage && (
        <img
          src={sideImage}
          alt=""
          className="h-auto w-full rounded-xl object-cover lg:sticky lg:top-28"
        />
      )}
    </div>
  )
}

export function BlogPostContent({ title, author, authorTitle, sections }: BlogPostContentProps) {
  return (
    <article className="overflow-x-hidden px-4 py-8 sm:py-10 md:px-11 md:py-14">
      <div className="mx-auto min-w-0 max-w-[1304px]">
        <h1 className="break-words text-2xl font-medium leading-tight text-navy sm:text-3xl md:text-[48px] md:leading-[1.1]">
          {title}
        </h1>

        <p className="mt-3 break-words text-sm font-medium leading-relaxed text-navy/80 sm:mt-4 sm:text-base">
          {author}
          {authorTitle ? ` ${authorTitle}` : ''}
        </p>

        <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10 md:mt-12 md:space-y-12">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <SectionHeading title={section.title} variant={section.variant} />
              <SectionBlocks blocks={section.blocks} section={section} />
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
