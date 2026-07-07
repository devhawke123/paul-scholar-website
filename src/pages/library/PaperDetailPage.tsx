import { Link, Navigate, useParams } from 'react-router-dom'
import { Navbar } from '../../components/layout/Navbar'
import { SiteClosing } from '../../components/layout/SiteClosing'
import { routes } from '../../routes'
import { usePaper } from '../../hooks/usePaper'
import { usePapers } from '../../hooks/usePapers'
import { getPaperSections } from '../../utils/paperContent'
import {
  PaperDetailContent,
  PaperDetailHero,
  PaperRelatedSection,
} from './components/PaperDetailSections'

export function PaperDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: paper, isLoading } = usePaper(id)
  const { data: papers } = usePapers()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream text-navy">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-navy/40">Loading document…</p>
        </div>
      </div>
    )
  }

  if (!paper) {
    return <Navigate to={routes.library} replace />
  }

  const sections = getPaperSections(paper)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fdf7f3] text-navy">
      <Navbar />
      <main>
        <div className="px-4 pt-4 md:px-11">
          <Link
            to={routes.library}
            className="mx-auto inline-flex max-w-[1296px] items-center gap-2 text-sm font-medium text-navy/70 transition-colors hover:text-accent"
          >
            ← Back to document library
          </Link>
        </div>

        <PaperDetailHero paper={paper} />
        <PaperDetailContent paper={paper} sections={sections} />
        <PaperRelatedSection papers={papers} currentId={paper.id} />
      </main>
      <SiteClosing />
    </div>
  )
}
