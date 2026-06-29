import { documents } from '../pages/home/data/homeContent'
import type { Paper, PaperCategory, PaperInput } from '../types/paper'

const STORAGE_KEY = 'paul-scholar-papers'
const PAPERS_UPDATED_EVENT = 'papers-updated'

function toIsoDate(date: string): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toISOString().slice(0, 10)
}

function seedPapers(): Paper[] {
  return documents.map((doc, index) => ({
    id: `paper-${index + 1}`,
    title: doc.title,
    date: toIsoDate(doc.date),
    category: doc.category as PaperCategory,
    access: doc.access,
  }))
}

function notifyPapersUpdated() {
  window.dispatchEvent(new Event(PAPERS_UPDATED_EVENT))
}

export function loadPapers(): Paper[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    const seeded = seedPapers()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
    return seeded
  }

  try {
    return JSON.parse(stored) as Paper[]
  } catch {
    const seeded = seedPapers()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
    return seeded
  }
}

function savePapers(papers: Paper[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(papers))
  notifyPapersUpdated()
}

export function addPaper(input: PaperInput): Paper {
  const papers = loadPapers()
  const paper: Paper = {
    id: crypto.randomUUID(),
    ...input,
  }
  savePapers([paper, ...papers])
  return paper
}

export function updatePaper(id: string, input: PaperInput): Paper | null {
  const papers = loadPapers()
  const index = papers.findIndex((paper) => paper.id === id)
  if (index === -1) return null

  const updated: Paper = { id, ...input }
  const next = [...papers]
  next[index] = updated
  savePapers(next)
  return updated
}

export function deletePaper(id: string): boolean {
  const papers = loadPapers()
  const next = papers.filter((paper) => paper.id !== id)
  if (next.length === papers.length) return false
  savePapers(next)
  return true
}

export function subscribeToPapers(callback: () => void) {
  const handler = () => callback()
  window.addEventListener(PAPERS_UPDATED_EVENT, handler)
  return () => window.removeEventListener(PAPERS_UPDATED_EVENT, handler)
}
