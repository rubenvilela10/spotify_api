import type { User } from '../types/user'
import { useNavigate } from 'react-router-dom'
import SearchBar from './searchbar'

interface NavbarProps {
  user: User | null
  onLogout: () => void
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    fetch('http://localhost:3000/api/logout', { method: 'POST', credentials: 'include' }).catch(() => {})
    localStorage.removeItem('jwt')
    onLogout()
    navigate('/')
  }

  return (
    <nav className="w-full bg-neutral-900 border-b border-neutral-800 px-6 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
          alt="Spotify"
          className="w-10 h-10"
        />
      </div>

      {/* Search */}
      <div className="flex-1 mx-4 hidden md:flex justify-center">
        <div className="w-full max-w-lg">
          <SearchBar />
        </div>
      </div>

      {/* User + Logout */}
      {user ? (
        <div className="relative group">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-neutral-700 cursor-pointer transition">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-white">{user.name}</span>
          </div>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-37 bg-neutral-800 rounded-lg shadow-lg overflow-hidden opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <a
          href="http://localhost:3000/api/auth/spotify"
          className="bg-green-500 text-black px-5 py-2 rounded-full font-semibold hover:bg-green-400 transition"
        >
          Login with Spotify
        </a>
      )}
    </nav>
  )
}