import { supabase } from '../lib/supabase'
import { formatFileSize } from '../utils/papers'

const BUCKET = "Paul's papers and thumbnails"

/** Safe object key segment for Supabase Storage (no spaces / unicode dashes / etc.). */
function safeStorageName(name: string) {
  const lastDot = name.lastIndexOf('.')
  const ext = lastDot >= 0 ? name.slice(lastDot).toLowerCase() : ''
  const base = lastDot >= 0 ? name.slice(0, lastDot) : name
  const safeBase =
    base
      .normalize('NFKD')
      .replace(/[^\w.-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase() || 'file'
  return `${safeBase}${ext}`
}

export async function uploadPaperPdf(file: File, paperId: string) {
  const path = `pdfs/${paperId}/${safeStorageName(file.name)}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, fileName: file.name, fileSize: formatFileSize(file.size) }
}

export async function uploadPaperThumbnail(file: File, paperId: string) {
  const path = `thumbnails/${paperId}/${safeStorageName(file.name)}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, fileName: file.name }
}

export async function uploadBlogCover(file: File, blogId: string) {
  const path = `blogs/${blogId}/cover/${safeStorageName(file.name)}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true })
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
  const path = `blogs/${blogId}/sections/${sectionIndex}/${kind}/${safeStorageName(file.name)}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, fileName: file.name }
}

export async function removeStorageFile(path: string) {
  await supabase.storage.from(BUCKET).remove([path])
}
