import type { Paper } from '../types/paper'
import type { ContentSection } from '../types/contentSection'
import { excerptToSections } from './contentSections'

export function getPaperSections(paper: Paper): ContentSection[] {
  if (paper.sections.length > 0) return paper.sections
  return excerptToSections(paper.excerpt ?? '')
}
