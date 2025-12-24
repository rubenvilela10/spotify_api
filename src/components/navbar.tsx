import type { User } from '../types/user'

interface NavbarProps {
  user: User | null
  onLogout: () => void
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="w-full bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-green-500">
        Spotify App
      </div>

      {/* Right side */}
      {user ? (
        <div className="flex items-center gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search songs, artists..."
            className="px-4 py-2 rounded-full bg-neutral-800 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* User */}
          <div className="flex items-center gap-2">
            <img
              src="https://avatars.githubusercontent.com/u/1?v=4"
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">{user.name}</span>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="text-sm text-neutral-300 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <a
          href={`http://localhost:3000/api/auth/spotify`}
          className="bg-green-500 text-black px-5 py-2 rounded-full font-semibold hover:bg-green-400 transition"
        >
          Login with Spotify
        </a>
      )}
    </nav>
  )
}