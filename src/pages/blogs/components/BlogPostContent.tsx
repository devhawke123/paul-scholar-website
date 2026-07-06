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

function BlockRenderer({ block }: { block: BlogContentBlock }) {
  if (block.type === 'subheading') {
    return (
      <p className="text-base font-bold leading-relaxed text-navy md:leading-[48px]">
        {block.text}
      </p>
    )
  }

  if (block.type === 'image') {
    return (
      <figure className={block.layout === 'full' ? 'my-8 md:my-10' : 'my-6'}>
        <img
          src={resolveBlogBlockImage(block)}
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
    <article className="px-4 py-10 md:px-11 md:py-14">
      <div className="mx-auto max-w-[1304px]">
        <h1 className="text-3xl font-medium leading-tight text-navy md:text-[48px] md:leading-[48px]">
          {title}
        </h1>

        <p className="mt-4 text-base font-medium text-navy/80 md:leading-[48px]">
          {author}
          {authorTitle ? ` ${authorTitle}` : ''}
        </p>

        <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">
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
