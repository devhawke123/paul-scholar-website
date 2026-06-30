import { useState, type FormEvent } from 'react'
import { blogImages } from '../../../data/blogAssets'
import { slugifyTitle } from '../../../data/blogsStore'
import { Button } from '../../../components/ui/Button'
import { blogPostCategories, type BlogInput, type BlogPost } from '../../../types/blog'

type BlogFormProps = {
  initial?: BlogPost
  onSubmit: (input: BlogInput) => void
  onCancel: () => void
}

const emptyInput: BlogInput = {
  slug: '',
  title: '',
  excerpt: '',
  body: [],
  author: 'Dr. Paul A. Stokes',
  readTime: '5 min read',
  date: new Date().toISOString().slice(0, 10),
  category: 'Managerial Cybernetics',
  imageKey: 'cybernetic1',
}

const inputClassName =
  'w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-accent'

const imageOptions = Object.keys(blogImages) as (keyof typeof blogImages)[]

export function BlogForm({ initial, onSubmit, onCancel }: BlogFormProps) {
  const [form, setForm] = useState(() =>
    initial
      ? {
          slug: initial.slug,
          title: initial.title,
          excerpt: initial.excerpt,
          bodyText: initial.body.join('\n\n'),
          author: initial.author,
          readTime: initial.readTime,
          date: initial.date,
          category: initial.category,
          imageKey: initial.imageKey,
        }
      : {
          ...emptyInput,
          bodyText: '',
        },
  )

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!form.title.trim() || !form.excerpt.trim()) return

    const body = form.bodyText
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)

    if (body.length === 0) return

    onSubmit({
      slug: form.slug.trim() || slugifyTitle(form.title),
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      body,
      author: form.author.trim(),
      readTime: form.readTime.trim(),
      date: form.date,
      category: form.category,
      imageKey: form.imageKey,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-lg font-semibold text-navy">
        {initial ? 'Edit Blog Post' : 'Add New Blog Post'}
      </h3>
      <p className="mt-1 text-sm text-navy/60">
        Posts added here will appear on the blogs page and homepage section.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-navy">Title</span>
          <input
            type="text"
            required
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="Article title"
            className={inputClassName}
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-navy">URL slug</span>
          <input
            type="text"
            value={form.slug}
            onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
            placeholder={slugifyTitle(form.title) || 'auto-generated-from-title'}
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
            placeholder="Short summary for cards and listings"
            className={`${inputClassName} resize-none`}
          />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-navy">Article body</span>
          <textarea
            required
            rows={8}
            value={form.bodyText}
            onChange={(event) => setForm((prev) => ({ ...prev, bodyText: event.target.value }))}
            placeholder="Write paragraphs separated by a blank line"
            className={`${inputClassName} resize-y`}
          />
        </label>

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

        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-medium text-navy">Cover image</span>
          <select
            value={form.imageKey}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                imageKey: event.target.value as BlogInput['imageKey'],
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

      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="submit" className="rounded-full px-8">
          {initial ? 'Save Changes' : 'Publish Post'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} className="rounded-full px-6">
          Cancel
        </Button>
      </div>
    </form>
  )
}
