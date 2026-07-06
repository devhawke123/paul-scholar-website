import type { BlogContentBlock, BlogContentSection, BlogImageKey, BlogPost } from '../types/blog'

export function bodyToSections(body: string[]): BlogContentSection[] {
  if (body.length === 0) return []

  return [
    {
      title: 'Article',
      variant: 'section',
      blocks: body.map((text) => ({ type: 'paragraph', text }) as BlogContentBlock),
    },
  ]
}

export function getBlogSections(post: BlogPost): BlogContentSection[] {
  if (post.sections.length > 0) return post.sections
  return bodyToSections(post.body)
}

export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export function blocksToText(blocks: BlogContentBlock[]): string {
  return blocks
    .filter((block) => !(block.type === 'image' && block.url))
    .map((block) => {
      if (block.type === 'paragraph' || block.type === 'subheading') return block.text
      if (block.type !== 'image' || !block.imageKey) return ''
      if (block.layout === 'full') return `[image:${block.imageKey}:full]`
      return `[image:${block.imageKey}:side]`
    })
    .filter(Boolean)
    .join('\n\n')
}

export function parseSectionBlocks(text: string): BlogContentBlock[] {
  const chunks = splitParagraphs(text)
  const blocks: BlogContentBlock[] = []

  for (const chunk of chunks) {
    const imageMatch = chunk.match(/^\[image:([a-zA-Z0-9]+):(full|side)\]$/)
    if (imageMatch) {
      blocks.push({
        type: 'image',
        imageKey: imageMatch[1] as BlogImageKey,
        layout: imageMatch[2] as 'full' | 'side',
      })
      continue
    }

    if (chunk.startsWith('### ')) {
      blocks.push({ type: 'subheading', text: chunk.replace(/^###\s+/, '').trim() })
      continue
    }

    blocks.push({ type: 'paragraph', text: chunk })
  }

  return blocks
}
