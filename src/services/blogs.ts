import { supabase } from '../lib/supabase'
import type { BlogInput, BlogPost } from '../types/blog'
import { mapBlogInput, mapBlogRow, type BlogRow } from './mappers'

const LIST_COLUMNS: string =
  'id, slug, title, excerpt, author, read_time, date, category, image_key, created_at, updated_at'

type FetchBlogsOptions = {
  /** Cap the number of rows (DB-level, not client-side slicing). */
  limit?: number
  /** Include the heavy `body` column. Only the admin edit flow needs this. */
  full?: boolean
}

export async function fetchBlogs(options: FetchBlogsOptions = {}): Promise<BlogPost[]> {
  const { limit, full } = options
  const columns: string = full ? '*' : LIST_COLUMNS
  let query = supabase.from('blog_posts').select(columns).order('date', { ascending: false })
  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error) throw error
  return (data as unknown as (BlogRow | Omit<BlogRow, 'body'>)[]).map((row) =>
    mapBlogRow('body' in row ? row : { ...row, body: [] }),
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
  return mapBlogRow(data as BlogRow)
}

export async function createBlog(input: BlogInput): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(mapBlogInput(input))
    .select()
    .single()
  if (error) throw error
  return mapBlogRow(data as BlogRow)
}

export async function updateBlog(id: string, input: BlogInput): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(mapBlogInput(input))
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return mapBlogRow(data as BlogRow)
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
