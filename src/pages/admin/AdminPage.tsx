import { AdminNavbar } from './components/AdminNavbar'
import { BlogsManager } from './components/BlogsManager'
import { PapersManager } from './components/PapersManager'
import { useState } from 'react'

export function AdminPage() {
  const [activeSection, setActiveSection] = useState<'papers' | 'blogs'>('papers')

  return (
    <div className="min-h-screen bg-cream text-navy">
      <AdminNavbar />
      <main>
        <section className="px-4 pt-8 md:px-11">
          <div className="mx-auto flex max-w-[1154px] gap-3">
            <button
              type="button"
              onClick={() => setActiveSection('papers')}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeSection === 'papers'
                  ? 'bg-navy text-white'
                  : 'bg-white text-navy shadow-sm hover:bg-navy/5'
              }`}
            >
              Papers
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('blogs')}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeSection === 'blogs'
                  ? 'bg-navy text-white'
                  : 'bg-white text-navy shadow-sm hover:bg-navy/5'
              }`}
            >
              Blogs
            </button>
          </div>
        </section>
        {activeSection === 'papers' ? <PapersManager /> : <BlogsManager />}
      </main>
    </div>
  )
}
