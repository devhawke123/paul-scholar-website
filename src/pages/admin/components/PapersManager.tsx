import { useState } from 'react'
import { addPaper, deletePaper, updatePaper } from '../../../data/papersStore'
import { usePapers } from '../../../hooks/usePapers'
import { Button } from '../../../components/ui/Button'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import type { Paper, PaperInput } from '../../../types/paper'
import { PaperForm } from './PaperForm'

function formatPaperDate(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function PapersManager() {
  const papers = usePapers()
  const [showForm, setShowForm] = useState(false)
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null)

  function closeForm() {
    setShowForm(false)
    setEditingPaper(null)
  }

  function handleAdd(input: PaperInput) {
    addPaper(input)
    closeForm()
  }

  function handleUpdate(input: PaperInput) {
    if (!editingPaper) return
    updatePaper(editingPaper.id, input)
    closeForm()
  }

  function handleDelete(paper: Paper) {
    if (!window.confirm(`Delete "${paper.title}"?`)) return
    deletePaper(paper.id)
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
              Add, update, or remove research papers and publications. Changes are saved locally
              for now and will power the library and other pages later.
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
              {papers.map((paper) => (
                <li
                  key={paper.id}
                  className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex gap-4">
                    <span className="mt-1 text-navy/40" aria-hidden>
                      📄
                    </span>
                    <div>
                      <h3 className="font-medium text-navy">{paper.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-navy/60">
                        <span>{formatPaperDate(paper.date)}</span>
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
                      </div>
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
                      onClick={() => handleDelete(paper)}
                      className="h-10 rounded-full px-5 text-sm text-red-700 hover:text-red-800"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
