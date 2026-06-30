export const paperCategories = [
  'Research Paper',
  'Journal Article',
  'Conference Paper',
  'Report',
  'Article',
] as const

export type PaperCategory = (typeof paperCategories)[number]

export type PaperAccess = 'Public' | 'Restricted'

export type Paper = {
  id: string
  title: string
  date: string
  category: PaperCategory
  access: PaperAccess
  excerpt?: string
  tags?: string[]
  fileSize?: string
  thumbnailDataUrl?: string
  thumbnailFileName?: string
  pdfDataUrl?: string
  pdfFileName?: string
}

export type PaperInput = Omit<Paper, 'id'>
