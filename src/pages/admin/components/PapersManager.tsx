import { useState } from 'react'
import { createPaper, deletePaper, updatePaper } from '../../../services/papers'
import type { PaperFiles } from '../../../services/papers'
import { usePapers } from '../../../hooks/usePapers'
import { Button } from '../../../components/ui/Button'
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog'
import type { Paper, PaperInput } from '../../../types/paper'
import { formatPaperDate, getPaperExcerpt, getPaperTags } from '../../../utils/papers'
import { PaperForm } from './PaperForm'

/* ── inline SVG icons ─────────────────────────────────────────────────────── */

function IconCalendar() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
    >
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M2 7h12M5 1v4M11 1v4" />
    </svg>
  )
}

function IconDocument() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
    >
      <path d="M9 2H4a1.5 1.5 0 00-1.5 1.5v9A1.5 1.5 0 004 14h8a1.5 1.5 0 001.5-1.5V7L9 2z" />
      <path d="M9 2v5h4.5" />
    </svg>
  )
}

function IconImage() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
    >
      <rect x="2" y="2" width="12" height="12" rx="1.5" />
      <circle cx="6" cy="6" r="1.5" />
      <path d="M14 10.5l-3.5-3.5-3 3.5-1.5-1.5L2 13" />
    </svg>
  )
}

function IconClip() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
    >
      <path d="M13 7l-5.5 5.5a3 3 0 01-4.24-4.24l5.5-5.5a1.5 1.5 0 012.12 2.12L5.38 10.38a.75.75 0 01-1.06-1.06L9.5 4.13" />
    </svg>
  )
}

/* ── stats bar ────────────────────────────────────────────────────────────── */

function StatsBar({ papers }: { papers: Paper[] }) {
  const publicCount = papers.filter((p) => p.access === 'Public').length
  return (
    <div className="mt-6 flex gap-px overflow-hidden rounded-xl border border-navy/10 bg-navy/10">
      <div className="flex flex-1 flex-col bg-white px-5 py-4">
        <span className="text-2xl font-semibold text-navy">{papers.length}</span>
        <span className="mt-0.5 text-xs text-navy/50">Total papers</span>
      </div>
      <div className="flex flex-1 flex-col bg-white px-5 py-4">
        <span className="text-2xl font-semibold text-navy">{publicCount}</span>
        <span className="mt-0.5 text-xs text-navy/50">Public access</span>
      </div>
      <div className="flex flex-1 flex-col bg-white px-5 py-4">
        <span className="text-2xl font-semibold text-navy">{papers.length - publicCount}</span>
        <span className="mt-0.5 text-xs text-navy/50">Restricted</span>
      </div>
    </div>
  )
}

/* ── manager ──────────────────────────────────────────────────────────────── */

export function PapersManager() {
  const { data: papers, refetch } = usePapers()
  const [showForm, setShowForm] = useState(false)
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null)
  const [paperToDelete, setPaperToDelete] = useState<Paper | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  function closeForm() {
    setShowForm(false)
    setEditingPaper(null)
  }

  async function handleAdd(input: PaperInput, files: PaperFiles) {
    console.log('[Papers] Adding paper…', input.title)
    await createPaper(input, files)
    console.log('[Papers] ✓ Paper added:', input.title)
    await refetch()
    closeForm()
  }

  async function handleUpdate(input: PaperInput, files: PaperFiles) {
    if (!editingPaper) return
    console.log('[Papers] Updating paper…', editingPaper.id, input.title)
    await updatePaper(editingPaper.id, input, files)
    console.log('[Papers] ✓ Paper updated:', input.title)
    await refetch()
    closeForm()
  }

  async function confirmDelete() {
    if (!paperToDelete) return
    setIsDeleting(true)
    try {
      console.log('[Papers] Deleting paper…', paperToDelete.id, paperToDelete.title)
      await deletePaper(paperToDelete.id)
      console.log('[Papers] ✓ Paper deleted:', paperToDelete.title)
      await refetch()
      if (editingPaper?.id === paperToDelete.id) closeForm()
      setPaperToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section className="px-4 py-12 md:px-11 md:py-16">
      <div className="mx-auto max-w-[1154px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

        <StatsBar papers={papers} />

        {showForm && (
          <div className="mt-8">
            <PaperForm
              key={editingPaper?.id ?? 'new'}
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
                    className="flex flex-col gap-4 px-6 py-6 transition hover:bg-navy/[0.025] md:flex-row md:items-start md:justify-between"
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
                          <IconCalendar />
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
                          <IconClip />
                          {paper.fileSize ?? '—'}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                            paper.pdfUrl ? 'text-green-700' : 'text-navy/40'
                          }`}
                        >
                          <IconDocument />
                          {paper.pdfUrl ? 'PDF attached' : 'No PDF'}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                            paper.thumbnailUrl ? 'text-green-700' : 'text-navy/40'
                          }`}
                        >
                          <IconImage />
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
                        onClick={() => setPaperToDelete(paper)}
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

      <ConfirmDialog
        open={paperToDelete !== null}
        title="Delete paper?"
        description={
          paperToDelete ? (
            <>
              Delete <strong>&ldquo;{paperToDelete.title}&rdquo;</strong>? This cannot be undone.
            </>
          ) : (
            ''
          )
        }
        confirmLabel="Delete"
        variant="danger"
        isLoading={isDeleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => {
          if (!isDeleting) setPaperToDelete(null)
        }}
      />
    </section>
  )
}
