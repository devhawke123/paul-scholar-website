import { blogImages } from './blogAssets'
import { formatBlogDate } from '../services/blogs'
import { blogPostCategories } from '../types/blog'
import type { BlogContentBlock, BlogContentSection, BlogImageKey, BlogPost } from '../types/blog'

export const blogCategories = ['All', ...blogPostCategories] as const

export function getBlogImage(imageKey: BlogImageKey): string {
  return blogImages[imageKey]
}

export function getBlogCoverImage(
  post: Pick<BlogPost, 'coverImageUrl' | 'imageKey'>,
): string {
  return post.coverImageUrl ?? blogImages[post.imageKey]
}

export function resolveBlogBlockImage(block: Extract<BlogContentBlock, { type: 'image' }>): string {
  if (block.url) return block.url
  if (block.imageKey) return blogImages[block.imageKey]
  return blogImages.cybernetic1
}

export function resolveBlogSectionSideImage(section: BlogContentSection): string | undefined {
  if (section.sideImageUrl) return section.sideImageUrl
  if (section.sideImageKey) return blogImages[section.sideImageKey]
  return undefined
}

export { formatBlogDate }
