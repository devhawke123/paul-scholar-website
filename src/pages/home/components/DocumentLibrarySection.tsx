// import { Link } from 'react-router-dom'
import { PaperListItem } from '../../../components/papers/PaperListItem'
import { Button } from '../../../components/ui/Button'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { usePapers } from '../../../hooks/usePapers'
import { sortPapersByDate } from '../../../utils/papers'

const HOME_PREVIEW_COUNT = 5

export function DocumentLibrarySection() {
  const { data: papers } = usePapers()
  const previewPapers = sortPapersByDate(papers).slice(0, HOME_PREVIEW_COUNT)

  return (
    <section id="library" className="bg-cream px-4 py-20 md:px-11">
      <div className="mx-auto max-w-[1154px]">
        <SectionBadge label="Publications & Papers" />
        <h2 className="mt-6 text-3xl font-bold text-navy md:text-4xl">Document Library</h2>
        <p className="mt-2 text-base text-navy/70">
          Browse research papers, articles, and reports
        </p>

        <ul className="mt-8 divide-y divide-navy/10 rounded-2xl bg-white shadow-sm">
          {previewPapers.length === 0 ? (
            <li className="px-6 py-12 text-center text-sm text-navy/60">
              No documents available yet.
            </li>
          ) : (
            previewPapers.map((paper) => <PaperListItem key={paper.id} paper={paper} />)
          )}
        </ul>

        {papers.length > HOME_PREVIEW_COUNT && (
          <div className="mt-10 text-center">
            {/* <Link to="/library"> */}
              <Button className="rounded-full px-10">Explore More</Button>
            {/* </Link> */}
          </div>
        )}
      </div>
    </section>
  )
}
