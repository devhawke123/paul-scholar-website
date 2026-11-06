/** Document formats accepted for Document Library uploads. */

const PDF_EXTENSIONS = ['pdf'] as const

const IMAGE_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'webp',
  'tif',
  'tiff',
  'svg',
  'ico',
  'heic',
  'heif',
  'avif',
] as const

/** Microsoft Office + related formats commonly used from Word 6 / Office 95 era onward. */
const OFFICE_EXTENSIONS = [
  // Word
  'doc',
  'dot',
  'docx',
  'dotx',
  'docm',
  'dotm',
  'rtf',
  // Excel
  'xls',
  'xlt',
  'xlm',
  'xlw',
  'xlsx',
  'xltx',
  'xlsm',
  'xltm',
  'xlsb',
  'csv',
  // PowerPoint
  'ppt',
  'pot',
  'pps',
  'pptx',
  'potx',
  'ppsx',
  'pptm',
  'potm',
  'ppsm',
  // Access
  'mdb',
  'accdb',
  'accde',
  'accdt',
  'mde',
  // Publisher / Visio / Project / OneNote / Outlook
  'pub',
  'vsd',
  'vss',
  'vst',
  'vsdx',
  'vssx',
  'vstx',
  'mpp',
  'mpt',
  'one',
  'onepkg',
  'msg',
  'oft',
  'eml',
] as const

export const DOCUMENT_EXTENSIONS = [
  ...PDF_EXTENSIONS,
  ...OFFICE_EXTENSIONS,
  ...IMAGE_EXTENSIONS,
] as const

const DOCUMENT_MIME_TYPES = [
  'application/pdf',
  // Legacy Office
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  'application/vnd.ms-access',
  'application/msaccess',
  'application/x-msaccess',
  'application/vnd.ms-publisher',
  'application/vnd.ms-project',
  'application/vnd.ms-visio',
  'application/vnd.ms-visio.drawing',
  'application/vnd.visio',
  'application/rtf',
  'text/rtf',
  'text/csv',
  'application/csv',
  'message/rfc822',
  'application/vnd.ms-outlook',
  // Office Open XML
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.presentationml.template',
  'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
  // Macro-enabled OOXML
  'application/vnd.ms-word.document.macroEnabled.12',
  'application/vnd.ms-word.template.macroEnabled.12',
  'application/vnd.ms-excel.sheet.macroEnabled.12',
  'application/vnd.ms-excel.template.macroEnabled.12',
  'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
  'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
  'application/vnd.ms-powerpoint.template.macroEnabled.12',
  'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
  // Access / Visio modern
  'application/vnd.ms-access.database',
  'application/vnd.ms-access.template',
  'application/vnd.ms-access.execute',
  'application/vnd.ms-visio.drawing.main+xml',
  'application/vnd.ms-visio.template.main+xml',
  'application/vnd.ms-visio.stencil.main+xml',
  // Images
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/webp',
  'image/tiff',
  'image/svg+xml',
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'image/heic',
  'image/heif',
  'image/avif',
] as const

const extensionSet = new Set<string>(DOCUMENT_EXTENSIONS)
const mimeSet = new Set<string>(DOCUMENT_MIME_TYPES.map((type) => type.toLowerCase()))
const imageExtensionSet = new Set<string>(IMAGE_EXTENSIONS)
const pdfExtensionSet = new Set<string>(PDF_EXTENSIONS)

export const DOCUMENT_FILE_ACCEPT = [
  ...DOCUMENT_MIME_TYPES,
  ...DOCUMENT_EXTENSIONS.map((ext) => `.${ext}`),
].join(',')

export const DOCUMENT_FORMAT_HINT =
  'PDF, Microsoft Office (Word, Excel, PowerPoint, Access, and related), and common images (JPG, PNG, GIF, WEBP, TIFF, SVG, …)'

export function getFileExtension(name: string): string {
  const lastDot = name.lastIndexOf('.')
  if (lastDot < 0) return ''
  return name.slice(lastDot + 1).toLowerCase()
}

export function isAllowedDocumentFile(file: File): boolean {
  const extension = getFileExtension(file.name)
  if (extension && extensionSet.has(extension)) return true
  const mime = file.type.trim().toLowerCase()
  if (mime && mimeSet.has(mime)) return true
  if (mime.startsWith('image/')) return true
  return false
}

export function isBrowserViewableFileName(name?: string): boolean {
  if (!name) return false
  const extension = getFileExtension(name)
  return pdfExtensionSet.has(extension) || imageExtensionSet.has(extension)
}

export function getDownloadButtonLabel(fileName?: string): string {
  const extension = fileName ? getFileExtension(fileName) : ''
  if (extension === 'pdf') return 'Download PDF'
  if (extension && imageExtensionSet.has(extension)) return 'Download image'
  return 'Download document'
}

export function getExtensionFromNameOrUrl(nameOrUrl?: string): string {
  if (!nameOrUrl) return ''
  try {
    const path = nameOrUrl.includes('://') ? new URL(nameOrUrl).pathname : nameOrUrl
    return getFileExtension(path.split('?')[0] ?? '')
  } catch {
    return getFileExtension(nameOrUrl)
  }
}

/** Browser download name based on the paper title + original file extension. */
export function buildDownloadFileName(title: string, sourceNameOrUrl?: string): string {
  const extension = getExtensionFromNameOrUrl(sourceNameOrUrl)
  const base =
    title
      .replace(/[<>:"/\\|?*\u0000-\u001f]+/g, '')
      .replace(/\s+/g, ' ')
      .trim() || 'document'
  return extension ? `${base}.${extension}` : base
}

/** Force a named download (needed for cross-origin storage URLs). */
export async function downloadFromUrl(url: string, fileName: string) {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Download failed')
  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = objectUrl
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(objectUrl)
}
