import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AboutPage } from './pages/about/AboutPage'
import { AdminPage } from './pages/admin/AdminPage'
import { BlogPostPage } from './pages/blogs/BlogPostPage'
import { BlogsPage } from './pages/blogs/BlogsPage'
import { ContactPage } from './pages/contact/ContactPage'
import { HomePage } from './pages/home/HomePage'
import { LibraryPage } from './pages/library/LibraryPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
