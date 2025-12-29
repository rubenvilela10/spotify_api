import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/landing_page'
import AuthCallback from './components/auth'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  )
}