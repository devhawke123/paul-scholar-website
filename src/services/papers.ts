import { supabase } from '../lib/supabase'
import type { Paper, PaperInput } from '../types/paper'
import { mapPaperInput, mapPaperRow, type PaperRow } from './mappers'
import { uploadPaperPdf, uploadPaperThumbnail } from './storage'

export type PaperFiles = {
  thumbnailFile?: File
  pdfFile?: File
}

export async function fetchPapers(): Promise<Paper[]> {
  const { data, error } = await supabase
    .from('papers')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return (data as PaperRow[]).map(mapPaperRow)
}

export async function createPaper(input: PaperInput, files?: PaperFiles): Promise<Paper> {
  const id = crypto.randomUUID()
  let { thumbnailUrl, thumbnailFileName, pdfUrl, pdfFileName, fileSize } = input

  if (files?.thumbnailFile) {
    const r = await uploadPaperThumbnail(files.thumbnailFile, id)
    thumbnailUrl = r.url
    thumbnailFileName = r.fileName
  }
  if (files?.pdfFile) {
    const r = await uploadPaperPdf(files.pdfFile, id)
    pdfUrl = r.url
    pdfFileName = r.fileName
    fileSize = r.fileSize
  }

  const payload = mapPaperInput({
    ...input,
    thumbnailUrl,
    thumbnailFileName,
    pdfUrl,
    pdfFileName,
    fileSize,
  })
  const { data, error } = await supabase
    .from('papers')
    .insert({ id, ...payload })
    .select()
    .single()
  if (error) throw error
  return mapPaperRow(data as PaperRow)
}

export async function updatePaper(
  id: string,
  input: PaperInput,
  files?: PaperFiles,
): Promise<Paper> {
  let { thumbnailUrl, thumbnailFileName, pdfUrl, pdfFileName, fileSize } = input

  if (files?.thumbnailFile) {
    const r = await uploadPaperThumbnail(files.thumbnailFile, id)
    thumbnailUrl = r.url
    thumbnailFileName = r.fileName
  }
  if (files?.pdfFile) {
    const r = await uploadPaperPdf(files.pdfFile, id)
    pdfUrl = r.url
    pdfFileName = r.fileName
    fileSize = r.fileSize
  }

  const payload = mapPaperInput({
    ...input,
    thumbnailUrl,
    thumbnailFileName,
    pdfUrl,
    pdfFileName,
    fileSize,
  })
  const { data, error } = await supabase
    .from('papers')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return mapPaperRow(data as PaperRow)
}

export async function deletePaper(id: string): Promise<void> {
  const { error } = await supabase.from('papers').delete().eq('id', id)
  if (error) throw error
}
