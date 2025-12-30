import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/landing_page'
import AuthCallback from './components/auth'
import HomePage from './components/home'
import Artist from './components/artists'
import Track from './components/tracks'
import MainLayout from './layouts/MainLayout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/artists/:id" element={<Artist />} />
        <Route path="/tracks/:id" element={<Track />} />
      </Route>
    </Routes>
  )
}