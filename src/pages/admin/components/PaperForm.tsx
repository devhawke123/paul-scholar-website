import { useState, type FormEvent } from 'react'
import { Button } from '../../../components/ui/Button'
import { paperCategories, type Paper, type PaperInput } from '../../../types/paper'

type PaperFormProps = {
  initial?: Paper
  onSubmit: (input: PaperInput) => void
  onCancel: () => void
}

const emptyInput: PaperInput = {
  title: '',
  date: new Date().toISOString().slice(0, 10),
  category: 'Research Paper',
  access: 'Public',
}

const inputClassName =
  'w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-accent'

export function PaperForm({ initial, onSubmit, onCancel }: PaperFormProps) {
  const [form, setForm] = useState<PaperInput>(() =>
    initial
      ? {
          title: initial.title,
          date: initial.date,
          category: initial.category,
          access: initial.access,
        }
      : emptyInput,
  )

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!form.title.trim()) return
    onSubmit({ ...form, title: form.title.trim() })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm md:p-8"
    >
      <h3 className="text-lg font-semibold text-navy">
        {initial ? 'Edit Paper' : 'Add New Paper'}
      </h3>
      <p className="mt-1 text-sm text-navy/60">
        Papers added here will appear in the document library on the public site.
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

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-navy">Date</span>
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
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="submit" className="rounded-full px-8">
          {initial ? 'Save Changes' : 'Add Paper'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} className="rounded-full px-6">
          Cancel
        </Button>
      </div>
    </form>
  )
}
