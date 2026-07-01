import { useState } from 'react'
import type { Paper } from '../../types/paper'
import { formatPaperDate } from '../../utils/papers'
import { PaperRequestModal } from './PaperRequestModal'

type PaperListItemProps = {
  paper: Paper
}

export function PaperListItem({ paper }: PaperListItemProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <li className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
      {showModal && (
        <PaperRequestModal paper={paper} onClose={() => setShowModal(false)} />
      )}

      <div className="flex gap-4">
        <span className="mt-1 text-navy/40" aria-hidden>
          📄
        </span>
        <div>
          <h3 className="font-medium text-navy">{paper.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-navy/60">
            <span>{formatPaperDate(paper.date)}</span>
            <span className="rounded-full bg-navy/5 px-3 py-0.5 text-xs">{paper.category}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:shrink-0">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            paper.access === 'Public'
              ? 'bg-green-50 text-green-700'
              : 'bg-amber-50 text-amber-700'
          }`}
        >
          {paper.access}
        </span>

        {!paper.pdfUrl ? (
          <button
            type="button"
            aria-label={`No PDF uploaded for ${paper.title}`}
            title="No PDF uploaded yet"
            disabled
            className="flex size-10 cursor-not-allowed items-center justify-center rounded-lg border border-navy/10 text-navy/40"
          >
            ↓
          </button>
        ) : paper.access === 'Public' ? (
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${paper.title}`}
            title="Download PDF"
            className="flex size-10 items-center justify-center rounded-lg border border-navy/10 text-navy transition hover:border-accent hover:text-accent"
          >
            ↓
          </a>
        ) : (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            aria-label={`Request access to ${paper.title}`}
            title="Request access to this restricted paper"
            className="flex size-10 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700 transition hover:border-amber-400 hover:bg-amber-100"
          >
            ✉
          </button>
        )}
      </div>
    </li>
  )
}
