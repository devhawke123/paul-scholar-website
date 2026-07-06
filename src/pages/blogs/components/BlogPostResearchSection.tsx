import { Link } from 'react-router-dom'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { Button } from '../../../components/ui/Button'
import { usePapers } from '../../../hooks/usePapers'
import { getPaperExcerpt, getPaperThumbnail } from '../../../utils/papers'

export function BlogPostResearchSection() {
  const { data: papers, isLoading } = usePapers(3)

  if (isLoading || papers.length === 0) return null

  return (
    <section className="border-t border-navy/10 bg-cream px-4 py-14 md:px-11 md:py-16">
      <div className="mx-auto max-w-[1296px]">
        <div className="text-center">
          <SectionBadge label="Research Papers" className="mx-auto" />
          <h2 className="mt-4 text-3xl font-semibold text-navy">Explore the Research</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {papers.map((paper) => (
            <article
              key={paper.id}
              className="flex h-full flex-col gap-4 bg-white p-4 shadow-sm"
            >
              <img
                src={getPaperThumbnail(paper)}
                alt={paper.title}
                loading="lazy"
                className="aspect-[416/292] w-full object-cover"
              />
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="text-xl font-bold leading-7 text-navy">{paper.title}</h3>
                <p className="flex-1 text-sm leading-6 tracking-[0.28px] text-navy/75">
                  {getPaperExcerpt(paper)}
                </p>
                <Link to={`/library/${paper.id}`}>
                  <Button variant="outline" className="rounded-full px-6">
                    View Details
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/library"
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-navy transition hover:bg-accent/90"
          >
            View Document Library
          </Link>
        </div>
      </div>
    </section>
  )
}
