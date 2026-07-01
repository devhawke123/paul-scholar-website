import { useState } from 'react'
import { createPaper, deletePaper, updatePaper } from '../../../services/papers'
import type { PaperFiles } from '../../../services/papers'
import { usePapers } from '../../../hooks/usePapers'
import { Button } from '../../../components/ui/Button'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import type { Paper, PaperInput } from '../../../types/paper'
import {
  formatPaperDate,
  getPaperExcerpt,
  getPaperTags,
} from '../../../utils/papers'
import { PaperForm } from './PaperForm'

export function PapersManager() {
  const { data: papers, refetch } = usePapers()
  const [showForm, setShowForm] = useState(false)
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null)

  function closeForm() {
    setShowForm(false)
    setEditingPaper(null)
  }

  async function handleAdd(input: PaperInput, files: PaperFiles) {
    await createPaper(input, files)
    await refetch()
    closeForm()
  }

  async function handleUpdate(input: PaperInput, files: PaperFiles) {
    if (!editingPaper) return
    await updatePaper(editingPaper.id, input, files)
    await refetch()
    closeForm()
  }

  async function handleDelete(paper: Paper) {
    if (!window.confirm(`Delete "${paper.title}"?`)) return
    await deletePaper(paper.id)
    await refetch()
    if (editingPaper?.id === paper.id) closeForm()
  }

  return (
    <section className="px-4 py-12 md:px-11 md:py-16">
      <div className="mx-auto max-w-[1154px]">
        <SectionBadge label="Doctor Dashboard" />
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy md:text-4xl">Manage Papers</h1>
            <p className="mt-2 max-w-2xl text-base text-navy/70">
              Add, update, or remove research papers and publications. Changes appear on the
              document library page.
            </p>
          </div>
          {!showForm && (
            <Button
              onClick={() => {
                setEditingPaper(null)
                setShowForm(true)
              }}
              className="h-12 shrink-0 rounded-full px-8"
            >
              + Add Paper
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mt-8">
            <PaperForm
              initial={editingPaper ?? undefined}
              onSubmit={editingPaper ? handleUpdate : handleAdd}
              onCancel={closeForm}
            />
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-navy/10 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-navy/10 px-6 py-4">
            <h2 className="font-semibold text-navy">Your Papers</h2>
            <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy/70">
              {papers.length} total
            </span>
          </div>

          {papers.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-navy/60">No papers yet. Add your first publication above.</p>
            </div>
          ) : (
            <ul className="divide-y divide-navy/10">
              {papers.map((paper) => {
                const tags = getPaperTags(paper)
                const visibleTags = tags.slice(0, 2)
                const hiddenTagCount = tags.length - visibleTags.length

                return (
                  <li
                    key={paper.id}
                    className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-start md:justify-between"
                  >
                    <div className="min-w-0 flex-1 space-y-3">
                      <div>
                        <h3 className="font-medium text-navy">{paper.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy/65">
                          {getPaperExcerpt(paper)}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {visibleTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-navy/5 px-2.5 py-1 text-xs font-medium text-navy/80"
                          >
                            {tag}
                          </span>
                        ))}
                        {hiddenTagCount > 0 && (
                          <span className="rounded-md bg-navy/5 px-2.5 py-1 text-xs font-medium text-navy/80">
                            +{hiddenTagCount}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-navy/60">
                        <span className="inline-flex items-center gap-1.5">
                          <span aria-hidden>📅</span>
                          {formatPaperDate(paper.date)}
                        </span>
                        <span className="rounded-full bg-navy/5 px-3 py-0.5 text-xs">
                          {paper.category}
                        </span>
                        <span
                          className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                            paper.access === 'Public'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {paper.access}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <span aria-hidden>📎</span>
                          {paper.fileSize ?? '—'}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                            paper.pdfUrl ? 'text-green-700' : 'text-navy/40'
                          }`}
                        >
                          <span aria-hidden>📄</span>
                          {paper.pdfUrl ? 'PDF attached' : 'No PDF'}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                            paper.thumbnailUrl ? 'text-green-700' : 'text-navy/40'
                          }`}
                        >
                          <span aria-hidden>🖼️</span>
                          {paper.thumbnailUrl ? 'Thumbnail attached' : 'No thumbnail'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:shrink-0">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingPaper(paper)
                          setShowForm(true)
                        }}
                        className="h-10 rounded-full px-5 text-sm"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => void handleDelete(paper)}
                        className="h-10 rounded-full px-5 text-sm text-red-700 hover:text-red-800"
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
