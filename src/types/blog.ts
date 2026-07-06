import type { blogImages } from '../data/blogAssets'

export const blogPostCategories = [
  'Managerial Cybernetics',
  'Systems Thinking',
  'Corporate Strategy',
  'Research',
] as const

export type BlogPostCategory = (typeof blogPostCategories)[number]

export type BlogImageKey = keyof typeof blogImages

export type BlogSectionVariant = 'section' | 'major'

export type BlogContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'image'; layout: 'side' | 'full'; imageKey?: BlogImageKey; url?: string }

export type BlogContentSection = {
  title: string
  variant: BlogSectionVariant
  blocks: BlogContentBlock[]
  sideImageKey?: BlogImageKey
  sideImageUrl?: string
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string[]
  sections: BlogContentSection[]
  heroTitle?: string
  authorTitle?: string
  heroBadge?: string
  citations?: string
  author: string
  readTime: string
  date: string
  category: BlogPostCategory
  imageKey: BlogImageKey
  coverImageUrl?: string
  coverImageFileName?: string
}

export type BlogInput = {
  slug: string
  title: string
  excerpt: string
  body: string[]
  sections: BlogContentSection[]
  heroTitle?: string
  authorTitle?: string
  heroBadge?: string
  citations?: string
  author: string
  readTime: string
  date: string
  category: BlogPostCategory
  imageKey: BlogImageKey
  coverImageUrl?: string
  coverImageFileName?: string
}
