import { useMemo, useState } from 'react'
import { usePapers } from '../../../hooks/usePapers'
import type { LibraryTabId } from '../../../utils/papers'
import {
  getLibraryTabCounts,
  libraryTabs,
  matchesLibraryTab,
  sortPapersByDate,
} from '../../../utils/papers'
import { libraryContent } from '../data/libraryContent'
import { PaperCard } from './PaperCard'

export function LibraryGridSection() {
  const { data: papers, isLoading } = usePapers()
  const [activeTab, setActiveTab] = useState<LibraryTabId>('all')
  const [search, setSearch] = useState('')

  const tabCounts = useMemo(() => getLibraryTabCounts(papers), [papers])

  const filteredPapers = useMemo(() => {
    const query = search.trim().toLowerCase()
    return sortPapersByDate(papers).filter((paper) => {
      if (!matchesLibraryTab(paper, activeTab)) return false
      if (!query) return true
      return (
        paper.title.toLowerCase().includes(query) ||
        paper.category.toLowerCase().includes(query) ||
        (paper.excerpt?.toLowerCase().includes(query) ?? false)
      )
    })
  }, [papers, activeTab, search])

  return (
    <section className="px-4 py-16 md:px-11 md:py-20">
      <div className="mx-auto max-w-[1351px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              {libraryContent.sectionTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy/70 md:text-lg">
              {libraryContent.description}
            </p>
          </div>

          <div className="relative w-full lg:max-w-[633px] lg:shrink-0">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/40">
              ⌕
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={libraryContent.searchPlaceholder}
              className="w-full rounded-xl border border-navy/15 bg-white py-3.5 pl-12 pr-4 text-sm text-navy outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="relative mt-10 border-b border-navy/10">
          <div className="flex flex-wrap gap-6 md:gap-10">
            {libraryTabs.map((tab) => {
              const count = tabCounts[tab.id]
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-4 text-sm font-medium transition-colors md:text-base ${
                    isActive ? 'text-navy' : 'text-navy/60 hover:text-navy'
                  }`}
                >
                  {tab.label} {count}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-accent" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {isLoading ? (
          <p className="mt-12 text-center text-sm text-navy/40">Loading documents…</p>
        ) : filteredPapers.length === 0 ? (
          <p className="mt-12 text-center text-sm text-navy/60">
            No documents match your search.
          </p>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredPapers.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
