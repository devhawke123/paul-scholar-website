import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PaperRequestModal } from '../../../components/papers/PaperRequestModal'
import { StructuredArticleContent } from '../../../components/sections/StructuredArticleContent'
import {
  HeroWhatsAppCorner,
  heroCornerVarsClass,
  heroImageScoopMaskClass,
} from '../../../components/sections/HeroWhatsAppCorner'
import { Button } from '../../../components/ui/Button'
import { usePdfPrefetch } from '../../../hooks/usePdfPrefetch'
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

      <div className={`flex flex-wrap gap-3 ${className}`}>
        {paper.pdfUrl && paper.access === 'Public' ? (
          <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" download={paper.pdfFileName}>
            <Button className="rounded-full px-8">Download PDF</Button>
          </a>
        ) : paper.pdfUrl && paper.access === 'Restricted' ? (
          <Button className="rounded-full px-8" onClick={() => setShowModal(true)}>
            Request Access
          </Button>
        ) : (
          <Button className="rounded-full px-8" disabled>
            PDF Unavailable
          </Button>
        )}

        {paper.pdfUrl && paper.access === 'Public' && (
          <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-full px-8">
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
    <section className="px-4 pb-2 pt-3 sm:pb-4 sm:pt-5 md:px-11 md:pb-6 md:pt-8">
      <div
        className={`relative mx-auto max-w-[1296px] overflow-visible rounded-[16px] sm:rounded-[28px] md:rounded-[32px] ${heroCornerVarsClass}`}
      >
        <div
          className={`relative overflow-hidden rounded-[16px] sm:rounded-[28px] md:rounded-[32px] ${heroImageScoopMaskClass}`}
        >
          <img
            src={getPaperThumbnail(paper)}
            alt={paper.title}
            className="aspect-[4/3] w-full object-cover object-center sm:aspect-[16/9] md:aspect-[1296/609]"
          />
          <div className="absolute inset-0 bg-navy/35" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 md:px-[72px] md:py-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex w-fit rounded-[10px] bg-accent px-4 py-1.5 text-sm font-medium text-navy">
              {badge}
            </span>
            <span
              className={`rounded-[10px] px-4 py-1.5 text-sm font-medium ${
                paper.access === 'Public'
                  ? 'bg-white/95 text-green-700'
                  : 'bg-white/95 text-amber-700'
              }`}
            >
              {paper.access}
            </span>
          </div>

          <div className="max-w-[857px]">
            <h1 className="font-serif text-[26px] font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-[50px] lg:leading-[1.2]">
              {heroTitle}
            </h1>
            <p className="mt-4 max-w-[802px] text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
              {heroSummary}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-white sm:text-base">
              <span>{formatPaperDate(paper.date)}</span>
              {paper.citations ? (
                <span>{paper.citations}</span>
              ) : (
                paper.fileSize && <span>{paper.fileSize}</span>
              )}
            </div>
          </div>
        </div>

        <HeroWhatsAppCorner />
      </div>
    </section>
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
                <Link to={`/library/${paper.id}`}>
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
