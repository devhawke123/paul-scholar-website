import { AdminNavbar } from './components/AdminNavbar'
import { BlogsManager } from './components/BlogsManager'
import { PapersManager } from './components/PapersManager'
import { RequestsManager } from './components/RequestsManager'
import { useState } from 'react'

const tabs = [
  { id: 'papers', label: 'Papers' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'access', label: 'Access Request' },
] as const

type Tab = (typeof tabs)[number]['id']

export function AdminPage() {
  const [activeSection, setActiveSection] = useState<Tab>('papers')

  return (
    <div className="min-h-screen bg-cream text-navy">
      <AdminNavbar />
      <main>
        {/* Tab bar */}
        <div className="border-b border-navy/10 px-4 md:px-11">
          <div className="mx-auto flex max-w-[1154px] gap-1">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id)}
                className={`relative px-5 py-3.5 text-sm font-medium transition-colors ${
                  activeSection === id ? 'text-navy' : 'text-navy/50 hover:text-navy/80'
                }`}
              >
                {label}
                {activeSection === id && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        {activeSection === 'papers' && <PapersManager />}
        {activeSection === 'blogs' && <BlogsManager />}
        {activeSection === 'access' && <RequestsManager />}
      </main>
    </div>
  )
}
