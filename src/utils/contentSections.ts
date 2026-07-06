import type { ContentBlock, ContentSection } from '../types/contentSection'

export function excerptToSections(excerpt: string, title = 'Abstract'): ContentSection[] {
  if (!excerpt.trim()) return []

  return [
    {
      title,
      variant: 'section',
      blocks: [{ type: 'paragraph', text: excerpt.trim() }],
    },
  ]
}

export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export function blocksToText(blocks: ContentBlock[]): string {
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

export function parseSectionBlocks(text: string): ContentBlock[] {
  const chunks = splitParagraphs(text)
  const blocks: ContentBlock[] = []

  for (const chunk of chunks) {
    const imageMatch = chunk.match(/^\[image:([a-zA-Z0-9]+):(full|side)\]$/)
    if (imageMatch) {
      blocks.push({
        type: 'image',
        imageKey: imageMatch[1],
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

export function defaultPaperSections(): ContentSection[] {
  return [
    { title: 'Abstract', variant: 'section', blocks: [] },
    { title: 'Introduction', variant: 'section', blocks: [] },
  ]
}
