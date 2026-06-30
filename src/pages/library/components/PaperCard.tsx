import type { Paper } from '../../../types/paper'
import {
  formatPaperDate,
  getPaperExcerpt,
  getPaperTags,
  getPaperThumbnail,
} from '../../../utils/papers'

function shortCategoryLabel(category: Paper['category']) {
  if (category === 'Journal Article' || category === 'Article') return 'Article'
  if (category === 'Research Paper' || category === 'Conference Paper') return 'Research paper'
  if (category === 'Report') return 'Blog'
  return category
}

type PaperCardProps = {
  paper: Paper
}

export function PaperCard({ paper }: PaperCardProps) {
  const tags = getPaperTags(paper)
  const visibleTags = tags.slice(0, 2)
  const hiddenTagCount = tags.length - visibleTags.length

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/5">
      <div className="relative">
        <img
          src={getPaperThumbnail(paper)}
          alt={paper.title}
          className="aspect-[369/228] w-full object-cover"
          loading="lazy"
        />

        <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1 text-xs font-medium text-navy shadow-sm">
          {shortCategoryLabel(paper.category)}
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

      <div className="space-y-4 p-4 md:p-5">
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

        <div className="flex items-center justify-between text-xs text-navy/60">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden>📅</span>
              {formatPaperDate(paper.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden>📎</span>
              {paper.fileSize ?? '—'}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 font-medium text-navy/70">
            <span aria-hidden>📄</span>
            PDF
          </span>
        </div>
      </div>
    </article>
  )
}
