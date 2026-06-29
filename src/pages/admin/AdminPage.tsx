import { AdminNavbar } from './components/AdminNavbar'
import { PapersManager } from './components/PapersManager'

export function AdminPage() {
  return (
    <div className="min-h-screen bg-cream text-navy">
      <AdminNavbar />
      <main>
        <PapersManager />
      </main>
    </div>
  )
}
