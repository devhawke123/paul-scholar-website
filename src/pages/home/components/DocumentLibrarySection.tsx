import { useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { SectionBadge } from '../../../components/ui/SectionBadge'
import { documentTabs, documents } from '../data/homeContent'

export function DocumentLibrarySection() {
  const [activeTab, setActiveTab] = useState<string>('All')

  return (
    <section id="library" className="bg-cream px-4 py-20 md:px-11">
      <div className="mx-auto max-w-[1154px]">
        <SectionBadge label="Publications & Papers" />
        <h2 className="mt-6 text-3xl font-bold text-navy md:text-4xl">Document Library</h2>
        <p className="mt-2 text-base text-navy/70">
          Browse research papers, articles, and reports
        </p>

        <div className="relative mt-8">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/40">
            ⌕
          </span>
          <input
            type="search"
            placeholder="Search documents by title or category…"
            className="w-full rounded-xl border border-navy/15 bg-white py-3.5 pl-12 pr-4 text-sm text-navy outline-none focus:border-accent"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-b border-navy/10">
          {documentTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-accent text-navy'
                  : 'border-transparent text-navy/60 hover:text-navy'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <ul className="mt-4 divide-y divide-navy/10 rounded-2xl bg-white shadow-sm">
          {documents.map((doc) => (
            <li
              key={`${doc.title}-${doc.date}`}
              className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex gap-4">
                <span className="mt-1 text-navy/40" aria-hidden>
                  📄
                </span>
                <div>
                  <h3 className="font-medium text-navy">{doc.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-navy/60">
                    <span>{doc.date}</span>
                    <span className="rounded-full bg-navy/5 px-3 py-0.5 text-xs">
                      {doc.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 md:shrink-0">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    doc.access === 'Public'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {doc.access}
                </span>
                <button
                  type="button"
                  aria-label={`Download ${doc.title}`}
                  className="flex size-10 items-center justify-center rounded-lg border border-navy/10 text-navy transition hover:border-accent hover:text-accent"
                >
                  ↓
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Button className="rounded-full px-10">Explore More</Button>
        </div>
      </div>
    </section>
  )
}
