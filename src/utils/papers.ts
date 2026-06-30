import type { Paper } from '../types/paper'
import { defaultPaperThumbnails } from '../data/paperAssets'

export function formatPaperDate(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function sortPapersByDate(papers: Paper[]) {
  return [...papers].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export function matchesHomeTab(paper: Paper, tab: string) {
  if (tab === 'All') return true
  if (tab === 'Research Papers') {
    return paper.category === 'Research Paper' || paper.category === 'Conference Paper'
  }
  if (tab === 'Articles') {
    return paper.category === 'Journal Article' || paper.category === 'Article'
  }
  if (tab === 'Reports') return paper.category === 'Report'
  return true
}

export type LibraryTabId = 'all' | 'research' | 'article' | 'blog'

export const libraryTabs: { id: LibraryTabId; label: string }[] = [
  { id: 'all', label: 'All Document' },
  { id: 'research', label: 'Research paper' },
  { id: 'article', label: 'Article' },
  { id: 'blog', label: 'Blog' },
]

export function matchesLibraryTab(paper: Paper, tab: LibraryTabId) {
  if (tab === 'all') return true
  if (tab === 'research') {
    return paper.category === 'Research Paper' || paper.category === 'Conference Paper'
  }
  if (tab === 'article') {
    return paper.category === 'Journal Article' || paper.category === 'Article'
  }
  if (tab === 'blog') return paper.category === 'Report'
  return true
}

export function getLibraryTabCounts(papers: Paper[]) {
  return {
    all: papers.length,
    research: papers.filter((p) => matchesLibraryTab(p, 'research')).length,
    article: papers.filter((p) => matchesLibraryTab(p, 'article')).length,
    blog: papers.filter((p) => matchesLibraryTab(p, 'blog')).length,
  }
}

export function getPaperExcerpt(paper: Paper) {
  return (
    paper.excerpt ??
    'Research and publications exploring organizational systems, strategy, and applied science.'
  )
}

export function getPaperTags(paper: Paper): string[] {
  if (paper.tags?.length) return paper.tags
  return [paper.category]
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function parseTagsInput(value: string): string[] {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

export function formatTagsInput(tags?: string[]): string {
  return tags?.join(', ') ?? ''
}

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

export function getPaperThumbnail(paper: Paper): string {
  if (paper.thumbnailDataUrl) return paper.thumbnailDataUrl
  const key = `${paper.id}:${paper.title}`
  const index = hashString(key) % defaultPaperThumbnails.length
  return defaultPaperThumbnails[index]
}
