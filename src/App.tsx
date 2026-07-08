import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { routes } from './routes'
import { AboutPage } from './pages/about/AboutPage'
import { AdminPage } from './pages/admin/AdminPage'
import { BlogPostPage } from './pages/blogs/BlogPostPage'
import { BlogsPage } from './pages/blogs/BlogsPage'
import { ContactPage } from './pages/contact/ContactPage'
import { HomePage } from './pages/home/HomePage'
import { LibraryPage } from './pages/library/LibraryPage'
import { PaperDetailPage } from './pages/library/PaperDetailPage'

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.about} element={<AboutPage />} />
        <Route path={routes.library} element={<LibraryPage />} />
        <Route path={`${routes.library}/:id`} element={<PaperDetailPage />} />
        <Route path={routes.blogs} element={<BlogsPage />} />
        <Route path={`${routes.blogs}/:slug`} element={<BlogPostPage />} />
        <Route path={routes.contact} element={<ContactPage />} />
        <Route path={routes.admin} element={<AdminPage />} />
        <Route path="*" element={<Navigate to={routes.home} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
