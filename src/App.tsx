import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminPage } from './pages/admin/AdminPage'
import { HomePage } from './pages/home/HomePage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}
