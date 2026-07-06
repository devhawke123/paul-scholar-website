import { useState, type FormEvent } from 'react'
import { Button } from '../../../components/ui/Button'
import { paperCategories, type Paper, type PaperInput } from '../../../types/paper'
import type { ContentSection, ContentSectionVariant } from '../../../types/contentSection'
import {
  blocksToText,
  defaultPaperSections,
  excerptToSections,
  parseSectionBlocks,
} from '../../../utils/contentSections'
import { formatFileSize, formatTagsInput, parseTagsInput } from '../../../utils/papers'

type PaperFormProps = {
  initial?: Paper
  onSubmit: (
    input: PaperInput,
    files: { thumbnailFile?: File; pdfFile?: File },
  ) => Promise<void>
  onCancel: () => void
}

type SectionFormState = {
  title: string
  variant: ContentSectionVariant
  blocksText: string
}

const inputClassName =
  'w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-accent'

function createSectionState(section?: ContentSection): SectionFormState {
  return {
    title: section?.title ?? '',
    variant: section?.variant ?? 'section',
    blocksText: section ? blocksToText(section.blocks) : '',
  }
}

function sectionsFromPaper(initial: Paper): SectionFormState[] {
  if (initial.sections.length > 0) {
    return initial.sections.map((section) => createSectionState(section))
  }
  if (initial.excerpt) {
    return excerptToSections(initial.excerpt).map((section) => createSectionState(section))
  }
  return defaultPaperSections().map((section) => createSectionState(section))
}

export function PaperForm({ initial, onSubmit, onCancel }: PaperFormProps) {
  const [form, setForm] = useState(() =>
    initial
      ? {
          title: initial.title,
          heroTitle: initial.heroTitle ?? '',
          excerpt: initial.excerpt ?? '',
          author: initial.author ?? 'Dr. Paul A. Stokes',
          authorTitle:
            initial.authorTitle ??
            'Department of Computer Science & Climate Systems Engineering',
          heroBadge: initial.heroBadge ?? '',
          citations: initial.citations ?? '',
          date: initial.date,
          category: initial.category,
          access: initial.access,
          fileSize: initial.fileSize,
          thumbnailUrl: initial.thumbnailUrl,
          thumbnailFileName: initial.thumbnailFileName,
          pdfUrl: initial.pdfUrl,
          pdfFileName: initial.pdfFileName,
          sections: sectionsFromPaper(initial),
        }
      : {
          title: '',
          heroTitle: '',
          excerpt: '',
          author: 'Dr. Paul A. Stokes',
          authorTitle: 'Department of Computer Science & Climate Systems Engineering',
          heroBadge: 'Peer-reviewed',
          citations: '',
          date: new Date().toISOString().slice(0, 10),
          category: 'Research Paper' as PaperInput['category'],
          access: 'Public' as PaperInput['access'],
          sections: defaultPaperSections().map((section) => createSectionState(section)),
        },
  )
  const [tagsInput, setTagsInput] = useState(() => formatTagsInput(initial?.tags))
  const [thumbnailFile, setThumbnailFile] = useState<File | undefined>()
  const [thumbnailPreview, setThumbnailPreview] = useState<string | undefined>(
    initial?.thumbnailUrl,
  )
  const [pdfFile, setPdfFile] = useState<File | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [pdfError, setPdfError] = useState('')
  const [tagsError, setTagsError] = useState('')

  function updateSection(index: number, patch: Partial<SectionFormState>) {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...patch } : section,
      ),
    }))
  }

  function addSection() {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, createSectionState()],
    }))
  }

  function removeSection(index: number) {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, sectionIndex) => sectionIndex !== index),
    }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!form.title.trim() || !form.excerpt.trim()) return

    if (!pdfFile && !form.pdfUrl) {
      setPdfError('A PDF file is required.')
      return
    }
    setPdfError('')

    if (parseTagsInput(tagsInput).length === 0) {
      setTagsError('At least one tag is required.')
      return
    }
    setTagsError('')

    const sections = form.sections
      .map((section) => ({
        title: section.title.trim(),
        variant: section.variant,
        blocks: parseSectionBlocks(section.blocksText),
      }))
      .filter((section) => section.title && section.blocks.length > 0)

    if (sections.length === 0) return

    const input: PaperInput = {
      title: form.title.trim(),
      heroTitle: form.heroTitle.trim() || undefined,
      excerpt: form.excerpt.trim(),
      sections,
      author: form.author.trim(),
      authorTitle: form.authorTitle.trim() || undefined,
      heroBadge: form.heroBadge.trim() || undefined,
      citations: form.citations.trim() || undefined,
      date: form.date,
      category: form.category,
      access: form.access,
      tags: parseTagsInput(tagsInput),
      fileSize: form.fileSize?.trim() || undefined,
      thumbnailUrl: thumbnailFile ? undefined : form.thumbnailUrl,
      thumbnailFileName: thumbnailFile ? thumbnailFile.name : form.thumbnailFileName,
      pdfUrl: pdfFile ? undefined : form.pdfUrl,
      pdfFileName: pdfFile ? pdfFile.name : form.pdfFileName,
    }

    setIsSubmitting(true)
    setSubmitError('')
    try {
      await onSubmit(input, { thumbnailFile, pdfFile })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
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
      onSubmit={(event) => void handleSubmit(event)}
      className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-lg font-semibold text-navy">
        {initial ? 'Edit Paper' : 'Add New Paper'}
      </h3>
      <p className="mt-1 text-sm text-navy/60">
        Fill in the hero, article header, and content sections to match the library detail page
        layout.
      </p>

      <div className="mt-8 space-y-8">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-navy/70">Hero section</h4>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-navy">Full document title</span>
              <input
                type="text"
                required
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Machine Learning Applications in Climate Science: A Comprehensive Review"
                className={inputClassName}
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-navy">Hero title (optional)</span>
              <input
                type="text"
                value={form.heroTitle}
                onChange={(event) => setForm((prev) => ({ ...prev, heroTitle: event.target.value }))}
                placeholder="Shorter title shown on the hero image"
                className={inputClassName}
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-navy">Hero summary</span>
              <textarea
                required
                rows={3}
                value={form.excerpt}
                onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))}
                placeholder="Short summary shown on the hero and library cards"
                className={`${inputClassName} resize-none`}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy">Hero badge</span>
              <input
                type="text"
                value={form.heroBadge}
                onChange={(event) => setForm((prev) => ({ ...prev, heroBadge: event.target.value }))}
                placeholder="Peer-reviewed"
                className={inputClassName}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy">Citations (optional)</span>
              <input
                type="text"
                value={form.citations}
                onChange={(event) => setForm((prev) => ({ ...prev, citations: event.target.value }))}
                placeholder="247 citations"
                className={inputClassName}
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-navy">
                Cover thumbnail <span className="font-normal text-navy/40">(optional)</span>
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleThumbnailSelect(event.target.files?.[0] ?? null)}
                className={inputClassName}
              />
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-navy/60">
                <span>
                  {displayThumbnailName
                    ? `Attached: ${displayThumbnailName}`
                    : 'No thumbnail attached yet'}
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
            </label>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-navy/70">
            Article header
          </h4>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy">Author</span>
              <input
                type="text"
                required
                value={form.author}
                onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
                className={inputClassName}
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-navy">Author affiliation</span>
              <input
                type="text"
                value={form.authorTitle}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, authorTitle: event.target.value }))
                }
                placeholder="Department of Computer Science & Climate Systems Engineering"
                className={inputClassName}
              />
            </label>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-navy/70">
              Content sections
            </h4>
            <Button type="button" variant="outline" className="rounded-full px-5" onClick={addSection}>
              + Add section
            </Button>
          </div>

          <div className="mt-4 space-y-5">
            {form.sections.map((section, index) => (
              <div
                key={`section-${index}`}
                className="rounded-2xl border border-navy/10 bg-cream/40 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-navy">Section {index + 1}</p>
                  {form.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="text-sm font-medium text-navy/60 transition hover:text-navy"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-medium text-navy">Section title</span>
                    <input
                      type="text"
                      required
                      value={section.title}
                      onChange={(event) => updateSection(index, { title: event.target.value })}
                      placeholder="Abstract, Introduction, Theoretical Framework…"
                      className={inputClassName}
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-medium text-navy">Heading style</span>
                    <select
                      value={section.variant}
                      onChange={(event) =>
                        updateSection(index, {
                          variant: event.target.value as ContentSectionVariant,
                        })
                      }
                      className={inputClassName}
                    >
                      <option value="section">Section heading (Abstract, Introduction)</option>
                      <option value="major">
                        Major heading (Theoretical Framework, Core Applications)
                      </option>
                    </select>
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-medium text-navy">Section content</span>
                    <textarea
                      required
                      rows={7}
                      value={section.blocksText}
                      onChange={(event) =>
                        updateSection(index, { blocksText: event.target.value })
                      }
                      placeholder={`Write paragraphs separated by a blank line.\n\n### A. Sub-Grid Scale Parameterization\nUse lines starting with ### for subheadings.`}
                      className={`${inputClassName} resize-y font-mono text-[13px]`}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-navy/70">
            Publishing & download
          </h4>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
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
              <span className="mb-2 block text-sm font-medium text-navy">
                Tags <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                value={tagsInput}
                onChange={(event) => {
                  setTagsInput(event.target.value)
                  if (event.target.value.trim()) setTagsError('')
                }}
                placeholder="Machine Learning, Climate Science"
                className={inputClassName}
              />
              {tagsError && <p className="mt-1 text-xs text-red-600">{tagsError}</p>}
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-navy">
                Paper PDF <span className="text-red-500">*</span>
              </span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(event) => {
                  handlePdfSelect(event.target.files?.[0] ?? null)
                  if (event.target.files?.[0]) setPdfError('')
                }}
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
              {pdfError && <p className="mt-1.5 text-xs text-red-600">{pdfError}</p>}
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {submitError && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
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
      </div>
    </form>
  )
}
