import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PaperRequestModal } from '../../../components/papers/PaperRequestModal'
import { DetailPageHero } from '../../../components/sections/DetailPageHero'
import { StructuredArticleContent } from '../../../components/sections/StructuredArticleContent'
import { Button } from '../../../components/ui/Button'
import { usePdfPrefetch } from '../../../hooks/usePdfPrefetch'
import { libraryPath } from '../../../routes'
import type { ContentSection } from '../../../types/contentSection'
import type { Paper } from '../../../types/paper'
import {
  formatPaperDate,
  getPaperCategoryLabel,
  getPaperExcerpt,
  getPaperThumbnail,
} from '../../../utils/papers'

type PaperDownloadActionsProps = {
  paper: Paper
  className?: string
}

export function PaperDownloadActions({ paper, className = '' }: PaperDownloadActionsProps) {
  const [showModal, setShowModal] = useState(false)
  usePdfPrefetch(paper.access === 'Public' ? paper.pdfUrl : undefined)

  return (
    <>
      {showModal && <PaperRequestModal paper={paper} onClose={() => setShowModal(false)} />}

      <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
        {paper.pdfUrl && paper.access === 'Public' ? (
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={paper.pdfFileName}
            className="w-full sm:w-auto"
          >
            <Button className="w-full rounded-full px-8 sm:w-auto">Download PDF</Button>
          </a>
        ) : paper.pdfUrl && paper.access === 'Restricted' ? (
          <Button className="w-full rounded-full px-8 sm:w-auto" onClick={() => setShowModal(true)}>
            Request Access
          </Button>
        ) : (
          <Button className="w-full rounded-full px-8 sm:w-auto" disabled>
            PDF Unavailable
          </Button>
        )}

        {paper.pdfUrl && paper.access === 'Public' && (
          <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full rounded-full px-8 sm:w-auto">
              Open in Browser
            </Button>
          </a>
        )}
      </div>

      <p className="mt-6 text-sm text-navy/60">
        {paper.access === 'Public'
          ? 'This document is publicly available for download.'
          : 'This document is restricted. Submit a request and we will review your access.'}
      </p>
    </>
  )
}

type PaperDetailHeroProps = {
  paper: Paper
}

export function PaperDetailHero({ paper }: PaperDetailHeroProps) {
  const heroTitle = paper.heroTitle?.trim() || paper.title
  const badge = paper.heroBadge?.trim() || getPaperCategoryLabel(paper.category)
  const heroSummary = paper.excerpt?.trim() || getPaperExcerpt(paper)

  return (
    <DetailPageHero
      imageSrc={getPaperThumbnail(paper)}
      imageAlt={paper.title}
      badges={
        <>
          <span className="inline-flex w-fit rounded-[10px] bg-accent px-3 py-1.5 text-xs font-medium text-navy sm:px-4 sm:text-sm">
            {badge}
          </span>
          <span
            className={`rounded-[10px] px-3 py-1.5 text-xs font-medium sm:px-4 sm:text-sm ${
              paper.access === 'Public'
                ? 'bg-white/95 text-green-700'
                : 'bg-white/95 text-amber-700'
            }`}
          >
            {paper.access}
          </span>
        </>
      }
      title={heroTitle}
      description={heroSummary}
      meta={
        <>
          <span>{formatPaperDate(paper.date)}</span>
          {paper.citations ? (
            <span>{paper.citations}</span>
          ) : (
            paper.fileSize && <span>{paper.fileSize}</span>
          )}
        </>
      }
    />
  )
}

type PaperDetailContentProps = {
  paper: Paper
  sections: ContentSection[]
}

export function PaperDetailContent({ paper, sections }: PaperDetailContentProps) {
  return (
    <StructuredArticleContent
      title={paper.title}
      author={paper.author}
      authorTitle={paper.authorTitle}
      sections={sections}
      footer={<PaperDownloadActions paper={paper} className="mt-10" />}
    />
  )
}

type PaperRelatedSectionProps = {
  papers: Paper[]
  currentId: string
}

export function PaperRelatedSection({ papers, currentId }: PaperRelatedSectionProps) {
  const related = papers.filter((paper) => paper.id !== currentId).slice(0, 3)
  if (related.length === 0) return null

  return (
    <section className="border-t border-navy/10 bg-white px-4 py-14 md:px-11 md:py-16">
      <div className="mx-auto max-w-[1154px]">
        <h2 className="text-2xl font-bold text-navy md:text-3xl">More from the library</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {related.map((paper) => (
            <article
              key={paper.id}
              className="overflow-hidden rounded-2xl border border-navy/10 bg-cream shadow-sm"
            >
              <img
                src={getPaperThumbnail(paper)}
                alt={paper.title}
                className="aspect-[369/228] w-full object-cover"
                loading="lazy"
              />
              <div className="space-y-4 p-5">
                <h3 className="line-clamp-2 text-lg font-semibold text-navy">{paper.title}</h3>
                <p className="line-clamp-2 text-sm text-navy/70">{getPaperExcerpt(paper)}</p>
                <Link to={libraryPath(paper.id)}>
                  <Button variant="outline" className="rounded-full px-6">
                    View Details
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
