import { useState, type FormEvent } from 'react'
import { Button } from '../../../components/ui/Button'
import { paperCategories, type Paper, type PaperInput } from '../../../types/paper'
import {
  formatFileSize,
  formatTagsInput,
  parseTagsInput,
} from '../../../utils/papers'

type PaperFormProps = {
  initial?: Paper
  onSubmit: (
    input: PaperInput,
    files: { thumbnailFile?: File; pdfFile?: File },
  ) => Promise<void>
  onCancel: () => void
}

type FormFields = {
  title: string
  excerpt: string
  date: string
  category: PaperInput['category']
  access: PaperInput['access']
  fileSize?: string
  thumbnailUrl?: string
  thumbnailFileName?: string
  pdfUrl?: string
  pdfFileName?: string
}

const inputClassName =
  'w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-accent'

export function PaperForm({ initial, onSubmit, onCancel }: PaperFormProps) {
  const [form, setForm] = useState<FormFields>(() =>
    initial
      ? {
          title: initial.title,
          excerpt: initial.excerpt ?? '',
          date: initial.date,
          category: initial.category,
          access: initial.access,
          fileSize: initial.fileSize,
          thumbnailUrl: initial.thumbnailUrl,
          thumbnailFileName: initial.thumbnailFileName,
          pdfUrl: initial.pdfUrl,
          pdfFileName: initial.pdfFileName,
        }
      : {
          title: '',
          excerpt: '',
          date: new Date().toISOString().slice(0, 10),
          category: 'Research Paper',
          access: 'Public',
        },
  )
  const [tagsInput, setTagsInput] = useState(() => formatTagsInput(initial?.tags))
  const [thumbnailFile, setThumbnailFile] = useState<File | undefined>()
  const [thumbnailPreview, setThumbnailPreview] = useState<string | undefined>(
    initial?.thumbnailUrl,
  )
  const [pdfFile, setPdfFile] = useState<File | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!form.title.trim() || !form.excerpt?.trim()) return

    const tags = parseTagsInput(tagsInput)
    const input: PaperInput = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      date: form.date,
      category: form.category,
      access: form.access,
      tags: tags.length > 0 ? tags : undefined,
      fileSize: form.fileSize?.trim() || undefined,
      thumbnailUrl: thumbnailFile ? undefined : form.thumbnailUrl,
      thumbnailFileName: thumbnailFile ? thumbnailFile.name : form.thumbnailFileName,
      pdfUrl: pdfFile ? undefined : form.pdfUrl,
      pdfFileName: pdfFile ? pdfFile.name : form.pdfFileName,
    }

    setIsSubmitting(true)
    try {
      await onSubmit(input, { thumbnailFile, pdfFile })
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleThumbnailSelect(file: File | null) {
    if (!file || !file.type.startsWith('image/')) return
    setThumbnailFile(file)
    setThumbnailPreview(URL.createObjectURL(file))
    setForm((prev) => ({ ...prev, thumbnailUrl: undefined, thumbnailFileName: file.name }))
  }

  function handleRemoveThumbnail() {
    setThumbnailFile(undefined)
    setThumbnailPreview(undefined)
    setForm((prev) => ({ ...prev, thumbnailUrl: undefined, thumbnailFileName: undefined }))
  }

  function handlePdfSelect(file: File | null) {
    if (!file || file.type !== 'application/pdf') return
    setPdfFile(file)
    setForm((prev) => ({
      ...prev,
      pdfUrl: undefined,
      pdfFileName: file.name,
      fileSize: formatFileSize(file.size),
    }))
  }

  function handleRemovePdf() {
    setPdfFile(undefined)
    setForm((prev) => ({
      ...prev,
      pdfUrl: undefined,
      pdfFileName: undefined,
      fileSize: undefined,
    }))
  }

  const hasThumbnail = !!(thumbnailFile || form.thumbnailUrl)
  const hasPdf = !!(pdfFile || form.pdfUrl)
  const displayPdfName = pdfFile?.name ?? form.pdfFileName
  const displayThumbnailName = thumbnailFile?.name ?? form.thumbnailFileName

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-lg font-semibold text-navy">
        {initial ? 'Edit Paper' : 'Add New Paper'}
      </h3>
      <p className="mt-1 text-sm text-navy/60">
        Fields below match how papers appear in the document library cards.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-navy">Title</span>
          <input
            type="text"
            required
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Enter paper title"
            className={inputClassName}
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-navy">Excerpt</span>
          <textarea
            required
            rows={3}
            value={form.excerpt}
            onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))}
            placeholder="Short summary shown under the title on library cards"
            className={`${inputClassName} resize-y`}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-navy">Category</span>
          <select
            value={form.category}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                category: event.target.value as PaperInput['category'],
              }))
            }
            className={inputClassName}
          >
            {paperCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-navy/50">
            Reports appear under the Blog tab on the library page.
          </p>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-navy">Publish date</span>
          <input
            type="date"
            required
            value={form.date}
            onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
            className={inputClassName}
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-navy">Access</span>
          <div className="flex flex-wrap gap-3">
            {(['Public', 'Restricted'] as const).map((access) => (
              <label
                key={access}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                  form.access === access
                    ? 'border-accent bg-accent/10 text-navy'
                    : 'border-navy/15 text-navy/70 hover:border-navy/30'
                }`}
              >
                <input
                  type="radio"
                  name="access"
                  value={access}
                  checked={form.access === access}
                  onChange={() => setForm((prev) => ({ ...prev, access }))}
                  className="sr-only"
                />
                {access}
              </label>
            ))}
          </div>
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-navy">Tags</span>
          <input
            type="text"
            value={tagsInput}
            onChange={(event) => setTagsInput(event.target.value)}
            placeholder="Machine Learning, Climate Science"
            className={inputClassName}
          />
          <p className="mt-1.5 text-xs text-navy/50">
            Comma-separated. Up to two tags show on library cards, with a +N indicator for more.
          </p>
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-navy">Thumbnail image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => handleThumbnailSelect(event.target.files?.[0] ?? null)}
            className={inputClassName}
          />
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-navy/60">
            <span>
              {displayThumbnailName ? `Attached: ${displayThumbnailName}` : 'No thumbnail attached yet'}
            </span>
            {hasThumbnail && (
              <button
                type="button"
                onClick={handleRemoveThumbnail}
                className="rounded-full border border-navy/15 px-3 py-1 text-xs text-navy transition hover:border-navy/30"
              >
                Remove thumbnail
              </button>
            )}
          </div>
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Paper thumbnail preview"
              className="mt-3 h-32 w-48 rounded-lg border border-navy/10 object-cover"
            />
          )}
          <p className="mt-1.5 text-xs text-navy/50">
            This image appears at the top of library cards.
          </p>
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-navy">Paper PDF</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={(event) => handlePdfSelect(event.target.files?.[0] ?? null)}
            className={inputClassName}
          />
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-navy/60">
            <span>
              {displayPdfName ? `Attached: ${displayPdfName}` : 'No PDF attached yet'}
            </span>
            {form.fileSize && <span>File size: {form.fileSize}</span>}
            {hasPdf && (
              <button
                type="button"
                onClick={handleRemovePdf}
                className="rounded-full border border-navy/15 px-3 py-1 text-xs text-navy transition hover:border-navy/30"
              >
                Remove PDF
              </button>
            )}
          </div>
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-navy">File size (optional)</span>
          <input
            type="text"
            value={form.fileSize ?? ''}
            onChange={(event) => setForm((prev) => ({ ...prev, fileSize: event.target.value }))}
            placeholder="Auto-filled when you upload a PDF, e.g. 2.4 MB"
            className={inputClassName}
          />
          <p className="mt-1.5 text-xs text-navy/50">
            Shown next to the publish date on library cards.
          </p>
        </label>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="submit" disabled={isSubmitting} className="rounded-full px-8">
          {isSubmitting ? 'Saving…' : initial ? 'Save Changes' : 'Add Paper'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-full px-6"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
