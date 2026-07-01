import type { BlogInput, BlogPost } from '../types/blog'
import type { Paper, PaperInput } from '../types/paper'

export type BlogRow = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string[]
  author: string
  read_time: string
  date: string
  category: string
  image_key: string
  created_at: string
  updated_at: string
}

export type PaperRow = {
  id: string
  title: string
  excerpt: string | null
  date: string
  category: string
  access: string
  tags: string[] | null
  file_size: string | null
  thumbnail_url: string | null
  pdf_url: string | null
  thumbnail_file_name: string | null
  pdf_file_name: string | null
  created_at: string
  updated_at: string
}

export function mapBlogRow(row: BlogRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    author: row.author,
    readTime: row.read_time,
    date: row.date,
    category: row.category as BlogPost['category'],
    imageKey: row.image_key as BlogPost['imageKey'],
  }
}

export function mapPaperRow(row: PaperRow): Paper {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt ?? undefined,
    date: row.date,
    category: row.category as Paper['category'],
    access: row.access as Paper['access'],
    tags: row.tags ?? undefined,
    fileSize: row.file_size ?? undefined,
    thumbnailUrl: row.thumbnail_url ?? undefined,
    pdfUrl: row.pdf_url ?? undefined,
    thumbnailFileName: row.thumbnail_file_name ?? undefined,
    pdfFileName: row.pdf_file_name ?? undefined,
  }
}

export function mapBlogInput(input: BlogInput): Record<string, unknown> {
  return {
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    body: input.body,
    author: input.author,
    read_time: input.readTime,
    date: input.date,
    category: input.category,
    image_key: input.imageKey,
  }
}

export function mapPaperInput(input: PaperInput): Record<string, unknown> {
  return {
    title: input.title,
    excerpt: input.excerpt ?? null,
    date: input.date,
    category: input.category,
    access: input.access,
    tags: input.tags ?? null,
    file_size: input.fileSize ?? null,
    thumbnail_url: input.thumbnailUrl ?? null,
    pdf_url: input.pdfUrl ?? null,
    thumbnail_file_name: input.thumbnailFileName ?? null,
    pdf_file_name: input.pdfFileName ?? null,
  }
}
