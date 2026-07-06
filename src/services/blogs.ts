import { supabase } from '../lib/supabase'
import type { BlogContentSection, BlogInput, BlogPost } from '../types/blog'
import { mapBlogInput, mapBlogRow, type BlogRow } from './mappers'
import { uploadBlogCover, uploadBlogSectionImage } from './storage'

const LIST_COLUMNS: string =
  'id, slug, title, excerpt, author, read_time, date, category, image_key, cover_image_url, created_at, updated_at'

type FetchBlogsOptions = {
  limit?: number
  full?: boolean
}

export type BlogSectionFiles = {
  sideImageFile?: File
  fullWidthImageFile?: File
}

export type BlogFiles = {
  coverFile?: File
  sectionFiles?: BlogSectionFiles[]
}

function normalizeBlogRow(
  row: Partial<BlogRow> & Pick<BlogRow, 'id' | 'slug' | 'title' | 'excerpt' | 'author' | 'read_time' | 'date' | 'category' | 'image_key' | 'created_at' | 'updated_at'>,
): BlogRow {
  return {
    ...row,
    body: row.body ?? [],
    sections: row.sections ?? [],
    hero_title: row.hero_title ?? null,
    author_title: row.author_title ?? null,
    hero_badge: row.hero_badge ?? null,
    citations: row.citations ?? null,
    cover_image_url: row.cover_image_url ?? null,
    cover_image_file_name: row.cover_image_file_name ?? null,
  }
}

async function applyBlogUploads(
  blogId: string,
  input: BlogInput,
  files?: BlogFiles,
): Promise<BlogInput> {
  let coverImageUrl = input.coverImageUrl
  let coverImageFileName = input.coverImageFileName

  if (files?.coverFile) {
    const uploaded = await uploadBlogCover(files.coverFile, blogId)
    coverImageUrl = uploaded.url
    coverImageFileName = uploaded.fileName
  }

  const sections = await Promise.all(
    input.sections.map(async (section, index) => {
      const sectionFiles = files?.sectionFiles?.[index]
      let sideImageUrl = section.sideImageUrl
      let sideImageKey = section.sideImageKey
      const blocks = [...section.blocks]

      if (sectionFiles?.sideImageFile) {
        const uploaded = await uploadBlogSectionImage(
          sectionFiles.sideImageFile,
          blogId,
          index,
          'side',
        )
        sideImageUrl = uploaded.url
        sideImageKey = undefined
      }

      if (sectionFiles?.fullWidthImageFile) {
        const uploaded = await uploadBlogSectionImage(
          sectionFiles.fullWidthImageFile,
          blogId,
          index,
          'full',
        )
        const withoutOldFull = blocks.filter(
          (block) => !(block.type === 'image' && block.layout === 'full'),
        )
        blocks.length = 0
        blocks.push(...withoutOldFull, { type: 'image', url: uploaded.url, layout: 'full' })
      }

      return {
        ...section,
        blocks,
        sideImageUrl,
        sideImageKey,
      } satisfies BlogContentSection
    }),
  )

  return {
    ...input,
    coverImageUrl,
    coverImageFileName,
    sections,
  }
}

export async function fetchBlogs(options: FetchBlogsOptions = {}): Promise<BlogPost[]> {
  const { limit, full } = options
  const columns: string = full ? '*' : LIST_COLUMNS
  let query = supabase.from('blog_posts').select(columns).order('date', { ascending: false })
  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error) throw error
  return (data as unknown as Partial<BlogRow>[]).map((row) =>
    mapBlogRow(normalizeBlogRow(row as BlogRow)),
  )
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return mapBlogRow(normalizeBlogRow(data as BlogRow))
}

export async function createBlog(input: BlogInput, files?: BlogFiles): Promise<BlogPost> {
  const id = crypto.randomUUID()
  const prepared = await applyBlogUploads(id, input, files)
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({ id, ...mapBlogInput(prepared) })
    .select()
    .single()
  if (error) throw error
  return mapBlogRow(normalizeBlogRow(data as BlogRow))
}

export async function updateBlog(
  id: string,
  input: BlogInput,
  files?: BlogFiles,
): Promise<BlogPost> {
  const prepared = await applyBlogUploads(id, input, files)
  const { data, error } = await supabase
    .from('blog_posts')
    .update(mapBlogInput(prepared))
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return mapBlogRow(normalizeBlogRow(data as BlogRow))
}

export async function deleteBlog(id: string): Promise<void> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) throw error
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function formatBlogDate(date: string): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
