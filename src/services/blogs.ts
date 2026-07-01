import { supabase } from '../lib/supabase'
import type { BlogInput, BlogPost } from '../types/blog'
import { mapBlogInput, mapBlogRow, type BlogRow } from './mappers'

export async function fetchBlogs(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return (data as BlogRow[]).map(mapBlogRow)
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
