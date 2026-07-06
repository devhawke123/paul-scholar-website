import { useState, type FormEvent } from 'react'
import { blogImages } from '../../../data/blogAssets'
import { slugifyTitle } from '../../../services/blogs'
import type { BlogFiles, BlogSectionFiles } from '../../../services/blogs'
import { Button } from '../../../components/ui/Button'
import {
  blogPostCategories,
  type BlogContentSection,
  type BlogImageKey,
  type BlogInput,
  type BlogPost,
  type BlogSectionVariant,
} from '../../../types/blog'
import {
  blocksToText,
  bodyToSections,
  parseSectionBlocks,
} from '../../../utils/blogContent'

type BlogFormProps = {
  initial?: BlogPost
  onSubmit: (input: BlogInput, files: BlogFiles) => Promise<void>
  onCancel: () => void
}

type SectionFormState = {
  title: string
  variant: BlogSectionVariant
  sideImageKey: BlogImageKey | ''
  sideImageUrl?: string
  sideImageFile?: File
  sideImagePreview?: string
  fullWidthImageUrl?: string
  fullWidthImageFile?: File
  fullWidthImagePreview?: string
  blocksText: string
}

const emptyInput: BlogInput = {
  slug: '',
  title: '',
  excerpt: '',
  body: [],
  sections: [],
  author: 'Dr. Paul A. Stokes',
  authorTitle: 'Department of Managerial Cybernetics & Strategic Systems',
  heroBadge: '',
  citations: '',
  readTime: '5 min read',
  date: new Date().toISOString().slice(0, 10),
  category: 'Managerial Cybernetics',
  imageKey: 'cybernetic1',
}

const inputClassName =
  'w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-accent'

const imageOptions = Object.keys(blogImages) as BlogImageKey[]

function createSectionState(section?: BlogContentSection): SectionFormState {
  const fullWidthBlock = section?.blocks.find(
    (block) => block.type === 'image' && block.layout === 'full' && block.url,
  )

  return {
    title: section?.title ?? '',
    variant: section?.variant ?? 'section',
    sideImageKey: section?.sideImageKey ?? '',
    sideImageUrl: section?.sideImageUrl,
    sideImagePreview: section?.sideImageUrl,
    fullWidthImageUrl:
      fullWidthBlock?.type === 'image' ? fullWidthBlock.url : undefined,
    fullWidthImagePreview:
      fullWidthBlock?.type === 'image' ? fullWidthBlock.url : undefined,
    blocksText: section ? blocksToText(section.blocks) : '',
  }
}

function defaultSectionsFromBody(body: string[]): SectionFormState[] {
  if (body.length === 0) {
    return [createSectionState({ title: 'Abstract', variant: 'section', blocks: [] })]
  }

  return bodyToSections(body).map((section) => createSectionState(section))
}

function sectionsFromPost(initial: BlogPost): SectionFormState[] {
  if (initial.sections.length > 0) {
    return initial.sections.map((section) => createSectionState(section))
  }

  return defaultSectionsFromBody(initial.body)
}

export function BlogForm({ initial, onSubmit, onCancel }: BlogFormProps) {
  const [form, setForm] = useState(() =>
    initial
      ? {
          slug: initial.slug,
          title: initial.title,
          heroTitle: initial.heroTitle ?? '',
          excerpt: initial.excerpt,
          author: initial.author,
          authorTitle: initial.authorTitle ?? '',
          heroBadge: initial.heroBadge ?? '',
          citations: initial.citations ?? '',
          readTime: initial.readTime,
          date: initial.date,
          category: initial.category,
          imageKey: initial.imageKey,
          coverImageUrl: initial.coverImageUrl,
          coverImageFileName: initial.coverImageFileName,
          sections: sectionsFromPost(initial),
        }
      : {
          ...emptyInput,
          heroTitle: '',
          sections: defaultSectionsFromBody([]),
        },
  )
  const [coverFile, setCoverFile] = useState<File | undefined>()
  const [coverPreview, setCoverPreview] = useState<string | undefined>(initial?.coverImageUrl)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

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

  function handleCoverSelect(file: File | null) {
    if (!file || !file.type.startsWith('image/')) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
    setForm((prev) => ({ ...prev, coverImageUrl: undefined, coverImageFileName: file.name }))
  }

  function handleRemoveCover() {
    setCoverFile(undefined)
    setCoverPreview(undefined)
    setForm((prev) => ({ ...prev, coverImageUrl: undefined, coverImageFileName: undefined }))
  }

  function handleSectionImageSelect(
    index: number,
    kind: 'side' | 'full',
    file: File | null,
  ) {
    if (!file || !file.type.startsWith('image/')) return
    const preview = URL.createObjectURL(file)
    if (kind === 'side') {
      updateSection(index, {
        sideImageFile: file,
        sideImagePreview: preview,
        sideImageUrl: undefined,
        sideImageKey: '',
      })
      return
    }
    updateSection(index, {
      fullWidthImageFile: file,
      fullWidthImagePreview: preview,
      fullWidthImageUrl: undefined,
    })
  }

  function handleRemoveSectionImage(index: number, kind: 'side' | 'full') {
    if (kind === 'side') {
      updateSection(index, {
        sideImageFile: undefined,
        sideImagePreview: undefined,
        sideImageUrl: undefined,
        sideImageKey: '',
      })
      return
    }
    updateSection(index, {
      fullWidthImageFile: undefined,
      fullWidthImagePreview: undefined,
      fullWidthImageUrl: undefined,
    })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!form.title.trim() || !form.excerpt.trim()) return

    const sections = form.sections
      .map((section) => {
        const blocks = parseSectionBlocks(section.blocksText)
        if (section.fullWidthImageUrl) {
          blocks.push({ type: 'image', url: section.fullWidthImageUrl, layout: 'full' })
        }

        return {
          title: section.title.trim(),
          variant: section.variant,
          sideImageKey: section.sideImageKey || undefined,
          sideImageUrl: section.sideImageUrl,
          blocks,
        }
      })
      .filter((section) => section.title && section.blocks.length > 0)

    if (sections.length === 0) return

    const body = sections.flatMap((section) =>
      section.blocks
        .filter((block) => block.type === 'paragraph')
        .map((block) => block.text),
    )

    const sectionFiles: BlogSectionFiles[] = form.sections.map((section) => ({
      sideImageFile: section.sideImageFile,
      fullWidthImageFile: section.fullWidthImageFile,
    }))

    const input: BlogInput = {
      slug: form.slug.trim() || slugifyTitle(form.title),
      title: form.title.trim(),
      heroTitle: form.heroTitle.trim() || undefined,
      excerpt: form.excerpt.trim(),
      body,
      sections,
      author: form.author.trim(),
      authorTitle: form.authorTitle?.trim() || undefined,
      heroBadge: form.heroBadge?.trim() || undefined,
      citations: form.citations?.trim() || undefined,
      readTime: form.readTime.trim(),
      date: form.date,
      category: form.category,
      imageKey: form.imageKey,
      coverImageUrl: coverFile ? undefined : form.coverImageUrl,
      coverImageFileName: coverFile ? coverFile.name : form.coverImageFileName,
    }

    setIsSubmitting(true)
    setSubmitError('')
    try {
      await onSubmit(input, { coverFile, sectionFiles })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  const hasCover = !!(coverFile || form.coverImageUrl || coverPreview)
  const displayCoverName = coverFile?.name ?? form.coverImageFileName

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-lg font-semibold text-navy">
        {initial ? 'Edit Blog Post' : 'Add New Blog Post'}
      </h3>
      <p className="mt-1 text-sm text-navy/60">
        Fill in the hero, article header, and content sections to match the blog inner page layout.
      </p>

      <div className="mt-8 space-y-8">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-navy/70">Hero section</h4>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-navy">Full article title</span>
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
                placeholder="Short summary shown on the hero and listing cards"
                className={`${inputClassName} resize-none`}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy">Hero badge</span>
              <input
                type="text"
                value={form.heroBadge}
                onChange={(event) => setForm((prev) => ({ ...prev, heroBadge: event.target.value }))}
                placeholder="Peer-reviewed (defaults to category)"
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
              <span className="mb-2 block text-sm font-medium text-navy">Cover image upload</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleCoverSelect(event.target.files?.[0] ?? null)}
                className={inputClassName}
              />
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-navy/60">
                <span>
                  {displayCoverName
                    ? `Attached: ${displayCoverName}`
                    : 'Upload a hero/cover image to Supabase Storage'}
                </span>
                {hasCover && (
                  <button
                    type="button"
                    onClick={handleRemoveCover}
                    className="rounded-full border border-navy/15 px-3 py-1 text-xs text-navy transition hover:border-navy/30"
                  >
                    Remove cover
                  </button>
                )}
              </div>
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Blog cover preview"
                  className="mt-3 h-40 w-full max-w-md rounded-xl border border-navy/10 object-cover"
                />
              )}
              <p className="mt-1.5 text-xs text-navy/50">
                Uploaded images are stored in Supabase, same bucket as paper thumbnails.
              </p>
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-navy">
                Fallback cover preset <span className="font-normal text-navy/40">(if no upload)</span>
              </span>
              <select
                value={form.imageKey}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    imageKey: event.target.value as BlogImageKey,
                  }))
                }
                className={inputClassName}
              >
                {imageOptions.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
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

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-navy">Heading style</span>
                    <select
                      value={section.variant}
                      onChange={(event) =>
                        updateSection(index, {
                          variant: event.target.value as BlogSectionVariant,
                        })
                      }
                      className={inputClassName}
                    >
                      <option value="section">Section heading (Abstract, Introduction)</option>
                      <option value="major">Major heading (Theoretical Framework)</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-navy">
                      Side image upload <span className="font-normal text-navy/40">(optional)</span>
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleSectionImageSelect(index, 'side', event.target.files?.[0] ?? null)
                      }
                      className={inputClassName}
                    />
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-navy/60">
                      <span>
                        {section.sideImageFile?.name
                          ? `Attached: ${section.sideImageFile.name}`
                          : section.sideImageUrl
                            ? 'Using uploaded side image'
                            : 'No side image attached'}
                      </span>
                      {(section.sideImageFile || section.sideImageUrl || section.sideImagePreview) && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSectionImage(index, 'side')}
                          className="rounded-full border border-navy/15 px-3 py-1 text-xs text-navy transition hover:border-navy/30"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {section.sideImagePreview && (
                      <img
                        src={section.sideImagePreview}
                        alt=""
                        className="mt-3 h-28 w-40 rounded-lg border border-navy/10 object-cover"
                      />
                    )}
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-navy">
                      Side image preset <span className="font-normal text-navy/40">(fallback)</span>
                    </span>
                    <select
                      value={section.sideImageKey}
                      onChange={(event) =>
                        updateSection(index, {
                          sideImageKey: event.target.value as BlogImageKey | '',
                        })
                      }
                      className={inputClassName}
                    >
                      <option value="">None</option>
                      {imageOptions.map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm font-medium text-navy">
                      Full-width image upload <span className="font-normal text-navy/40">(optional)</span>
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleSectionImageSelect(index, 'full', event.target.files?.[0] ?? null)
                      }
                      className={inputClassName}
                    />
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-navy/60">
                      <span>
                        {section.fullWidthImageFile?.name
                          ? `Attached: ${section.fullWidthImageFile.name}`
                          : section.fullWidthImageUrl
                            ? 'Using uploaded full-width image'
                            : 'No full-width image attached'}
                      </span>
                      {(section.fullWidthImageFile ||
                        section.fullWidthImageUrl ||
                        section.fullWidthImagePreview) && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSectionImage(index, 'full')}
                          className="rounded-full border border-navy/15 px-3 py-1 text-xs text-navy transition hover:border-navy/30"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {section.fullWidthImagePreview && (
                      <img
                        src={section.fullWidthImagePreview}
                        alt=""
                        className="mt-3 h-32 w-full rounded-lg border border-navy/10 object-cover"
                      />
                    )}
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
                      placeholder={`Write paragraphs separated by a blank line.\n\n### A. Sub-Grid Scale Parameterization\nUse lines starting with ### for subheadings.\n\n[image:cybernetic2:full] for a full-width image.`}
                      className={`${inputClassName} resize-y font-mono text-[13px]`}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-navy/70">Publishing</h4>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy">URL slug</span>
              <input
                type="text"
                value={form.slug}
                onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
                placeholder={slugifyTitle(form.title) || 'auto-generated-from-title'}
                className={inputClassName}
              />
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

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy">Read time</span>
              <input
                type="text"
                required
                value={form.readTime}
                onChange={(event) => setForm((prev) => ({ ...prev, readTime: event.target.value }))}
                placeholder="5 min read"
                className={inputClassName}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-navy">Category</span>
              <select
                value={form.category}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    category: event.target.value as BlogInput['category'],
                  }))
                }
                className={inputClassName}
              >
                {blogPostCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
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
            {isSubmitting ? 'Saving…' : initial ? 'Save Changes' : 'Publish Post'}
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
