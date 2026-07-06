export type ContentSectionVariant = 'section' | 'major'

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'image'; layout: 'side' | 'full'; url?: string; imageKey?: string }

export type ContentSection = {
  title: string
  variant: ContentSectionVariant
  blocks: ContentBlock[]
  sideImageUrl?: string
  sideImageKey?: string
}
