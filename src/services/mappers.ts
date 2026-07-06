import type { BlogInput, BlogPost, BlogContentSection } from '../types/blog'
import type { ContentSection } from '../types/contentSection'
import type { Paper, PaperInput } from '../types/paper'
import type { PaperRequest, RequestStatus } from '../types/paperRequest'

export type BlogRow = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string[]
  sections: BlogContentSection[] | null
  hero_title: string | null
  author_title: string | null
  hero_badge: string | null
  citations: string | null
  author: string
  read_time: string
  date: string
  category: string
  image_key: string
  cover_image_url: string | null
  cover_image_file_name: string | null
  created_at: string
  updated_at: string
}

export type PaperRow = {
  id: string
  title: string
  excerpt: string | null
  sections: ContentSection[] | null
  hero_title: string | null
  hero_badge: string | null
  citations: string | null
  author: string | null
  author_title: string | null
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
    sections: (row.sections ?? []) as BlogContentSection[],
    heroTitle: row.hero_title ?? undefined,
    authorTitle: row.author_title ?? undefined,
    heroBadge: row.hero_badge ?? undefined,
    citations: row.citations ?? undefined,
    author: row.author,
    readTime: row.read_time,
    date: row.date,
    category: row.category as BlogPost['category'],
    imageKey: row.image_key as BlogPost['imageKey'],
    coverImageUrl: row.cover_image_url ?? undefined,
    coverImageFileName: row.cover_image_file_name ?? undefined,
  }
}

export function mapPaperRow(row: PaperRow): Paper {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt ?? undefined,
    sections: (row.sections ?? []) as ContentSection[],
    heroTitle: row.hero_title ?? undefined,
    heroBadge: row.hero_badge ?? undefined,
    citations: row.citations ?? undefined,
    author: row.author ?? undefined,
    authorTitle: row.author_title ?? undefined,
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
    sections: input.sections,
    hero_title: input.heroTitle ?? null,
    author_title: input.authorTitle ?? null,
    hero_badge: input.heroBadge ?? null,
    citations: input.citations ?? null,
    author: input.author,
    read_time: input.readTime,
    date: input.date,
    category: input.category,
    image_key: input.imageKey,
    cover_image_url: input.coverImageUrl ?? null,
    cover_image_file_name: input.coverImageFileName ?? null,
  }
}

export function mapPaperInput(input: PaperInput): Record<string, unknown> {
  return {
    title: input.title,
    excerpt: input.excerpt ?? null,
    sections: input.sections,
    hero_title: input.heroTitle ?? null,
    hero_badge: input.heroBadge ?? null,
    citations: input.citations ?? null,
    author: input.author ?? null,
    author_title: input.authorTitle ?? null,
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

export type PaperRequestRow = {
  id: string
  full_name: string
  email: string
  paper_id: string
  reason: string
  status: string
  created_at: string
  papers: { title: string } | null
}

export function mapPaperRequestRow(row: PaperRequestRow): PaperRequest {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    paperId: row.paper_id,
    paperTitle: row.papers?.title ?? 'Unknown paper',
    reason: row.reason,
    status: row.status as RequestStatus,
    createdAt: row.created_at,
  }
}
