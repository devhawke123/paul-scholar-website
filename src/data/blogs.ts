import { blogImages } from './blogAssets'
import { formatBlogDate } from '../services/blogs'
import { blogPostCategories } from '../types/blog'
import type { BlogImageKey } from '../types/blog'

export const blogCategories = ['All', ...blogPostCategories] as const

export function getBlogImage(imageKey: BlogImageKey): string {
  return blogImages[imageKey]
}

export { formatBlogDate }
