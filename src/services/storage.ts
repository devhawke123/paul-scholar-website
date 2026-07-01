import { supabase } from '../lib/supabase'
import { formatFileSize } from '../utils/papers'

const BUCKET = "Paul's papers and thumbnails"

export async function uploadPaperPdf(file: File, paperId: string) {
  const path = `pdfs/${paperId}/${file.name}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, fileName: file.name, fileSize: formatFileSize(file.size) }
}

export async function uploadPaperThumbnail(file: File, paperId: string) {
  const path = `thumbnails/${paperId}/${file.name}`
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
