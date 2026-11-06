import { supabase } from '../lib/supabase'
import { formatFileSize } from '../utils/papers'

const BUCKET = "Paul's papers and thumbnails"

/**
 * Storage object keys must stay ASCII-safe for Supabase.
 * Display / download names can still use the full paper title.
 */
function safeExtension(name: string): string {
  const lastDot = name.lastIndexOf('.')
  if (lastDot < 0) return ''
  const ext = name
    .slice(lastDot + 1)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
  return ext ? `.${ext}` : ''
}

function safeStorageBase(name: string, fallback = 'file') {
  return (
    name
      .normalize('NFKD')
      .replace(/[^\w.-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()
      .slice(0, 80) || fallback
  )
}

function displayFileName(title: string, file: File) {
  const ext = safeExtension(file.name)
  const base =
    title
      .replace(/[<>:"/\\|?*\u0000-\u001f]+/g, '')
      .replace(/\s+/g, ' ')
      .trim() || file.name.replace(/\.[^.]+$/, '') || 'document'
  return `${base}${ext}`
}

export async function uploadPaperPdf(file: File, paperId: string, title: string) {
  const ext = safeExtension(file.name)
  const path = `documents/${paperId}/${safeStorageBase(title, 'document')}${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
    contentType: file.type || undefined,
  })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return {
    url: data.publicUrl,
    fileName: displayFileName(title, file),
    fileSize: formatFileSize(file.size),
  }
}

export async function uploadPaperThumbnail(file: File, paperId: string) {
  const path = `thumbnails/${paperId}/${safeStorageBase(file.name, 'thumbnail')}${safeExtension(file.name)}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type || undefined })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, fileName: file.name }
}

export async function uploadBlogCover(file: File, blogId: string) {
  const path = `blogs/${blogId}/cover/${safeStorageBase(file.name, 'cover')}${safeExtension(file.name)}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type || undefined })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, fileName: file.name }
}

export async function uploadBlogSectionImage(
  file: File,
  blogId: string,
  sectionIndex: number,
  kind: 'side' | 'full',
) {
  const path = `blogs/${blogId}/sections/${sectionIndex}/${kind}${safeExtension(file.name)}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type || undefined })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, fileName: file.name }
}

export async function removeStorageFile(path: string) {
  await supabase.storage.from(BUCKET).remove([path])
}
