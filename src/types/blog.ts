import type { blogImages } from '../data/blogAssets'

export const blogPostCategories = [
  'Managerial Cybernetics',
  'Systems Thinking',
  'Corporate Strategy',
  'Research',
] as const

export type BlogPostCategory = (typeof blogPostCategories)[number]

export type BlogImageKey = keyof typeof blogImages

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string[]
  author: string
  readTime: string
  date: string
  category: BlogPostCategory
  imageKey: BlogImageKey
}

export type BlogInput = {
  slug: string
  title: string
  excerpt: string
  body: string[]
  author: string
  readTime: string
  date: string
  category: BlogPostCategory
  imageKey: BlogImageKey
}
