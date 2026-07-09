import { PAGE_GUTTER, PageContainer, SECTION_PY } from '../../../components/layout/PageContainer'
import { Link } from 'react-router-dom'
import { PaperListItem } from '../../../components/papers/PaperListItem'
import { Button } from '../../../components/ui/Button'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { routes } from '../../../routes'
import { usePapers } from '../../../hooks/usePapers'

const HOME_PREVIEW_COUNT = 5

export function DocumentLibrarySection() {
  // Fetch one extra row so we know whether "Explore More" should show, without a second count query.
  const { data: papers, isLoading } = usePapers(HOME_PREVIEW_COUNT + 1)
  const previewPapers = papers.slice(0, HOME_PREVIEW_COUNT)
  const hasMore = papers.length > HOME_PREVIEW_COUNT

  return (
    <section id="library" className={`bg-cream ${SECTION_PY} ${PAGE_GUTTER}`}>
      <PageContainer>
        <SectionBadge label="Publications & Papers" />
        <h2 className="mt-6 text-3xl font-bold text-navy md:text-4xl">Document Library</h2>
        <p className="mt-2 text-base text-navy/70">
          Browse research papers, articles, and reports
        </p>

        <ul className="mt-8 divide-y divide-navy/10 rounded-2xl bg-white shadow-sm">
          {previewPapers.length === 0
            ? !isLoading && (
                <li className="px-6 py-12 text-center text-sm text-navy/60">
                  No documents available yet.
                </li>
              )
            : previewPapers.map((paper) => <PaperListItem key={paper.id} paper={paper} />)}
        </ul>

        {hasMore && (
          <div className="mt-10 text-center">
            <Link to={routes.library}>
              <Button className="rounded-full p-10">Explore More</Button>
            </Link>
          </div>
        )}
      </PageContainer>
    </section>
  )
}
