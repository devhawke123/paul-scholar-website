import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PaperRequestModal } from '../../../components/papers/PaperRequestModal'
import { Button } from '../../../components/ui/Button'
import { usePdfPrefetch } from '../../../hooks/usePdfPrefetch'
import { libraryPath } from '../../../routes'
import type { Paper } from '../../../types/paper'
import {
  formatPaperDate,
  getPaperCategoryLabel,
  getPaperExcerpt,
  getPaperTags,
  getPaperThumbnail,
} from '../../../utils/papers'

type PaperCardProps = {
  paper: Paper
}

export function PaperCard({ paper }: PaperCardProps) {
  const [showModal, setShowModal] = useState(false)
  usePdfPrefetch(paper.access === 'Public' ? paper.pdfUrl : undefined)
  const tags = getPaperTags(paper)
  const visibleTags = tags.slice(0, 2)
  const hiddenTagCount = tags.length - visibleTags.length

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/5">
      {showModal && (
        <PaperRequestModal paper={paper} onClose={() => setShowModal(false)} />
      )}

      <div className="relative">
        <img
          src={getPaperThumbnail(paper)}
          alt={paper.title}
          className="aspect-[369/228] w-full object-cover"
          loading="lazy"
        />

        <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1 text-xs font-medium text-navy shadow-sm">
          {getPaperCategoryLabel(paper.category)}
        </span>

        <span
          className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium shadow-sm ${
            paper.access === 'Public'
              ? 'bg-white/95 text-green-700'
              : 'bg-white/95 text-amber-700'
          }`}
        >
          {paper.access === 'Public' ? (
            <span aria-hidden>🌐</span>
          ) : (
            <span aria-hidden>🔒</span>
          )}
          {paper.access}
        </span>
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-4 md:p-5">
        <div className="space-y-3">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-navy">
            {paper.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-navy/65">
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

        <div className="mt-auto flex flex-col gap-4 border-t border-navy/10 pt-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-navy/60">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden>📅</span>
              {formatPaperDate(paper.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden>📎</span>
              {paper.fileSize ?? '—'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            {paper.pdfUrl && paper.access === 'Public' ? (
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${paper.title}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-navy/70 transition hover:text-accent"
              >
                <span aria-hidden>📄</span>
                Quick download
              </a>
            ) : paper.pdfUrl && paper.access === 'Restricted' ? (
              <button
                type="button"
                onClick={() => setShowModal(true)}
                aria-label={`Request access to ${paper.title}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 transition hover:text-amber-900"
              >
                <span aria-hidden>✉</span>
                Request access
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-navy/40">
                <span aria-hidden>📄</span>
                No PDF
              </span>
            )}

            <Link to={libraryPath(paper.id)}>
              <Button variant="outline" className="h-10 rounded-full px-6 text-sm">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
