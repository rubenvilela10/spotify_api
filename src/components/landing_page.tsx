import { useEffect, useState } from 'react'
import Navbar from './navbar'
import type { User, MeResponse } from '../types/user'

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/me`, {
          credentials: 'include',
        })
        if (!res.ok) return setUser(null)

        const data: MeResponse = await res.json()
        setUser(data.user)
      } catch {
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    await fetch(`http://localhost:3000/api/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    setUser(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-1 flex items-center justify-center px-6">
        {!user ? (
          <div className="text-center max-w-xl">
            <h1 className="text-4xl font-bold mb-4">
              Discover your music
            </h1>

            <a
              href={`http://localhost:3000/api/auth/spotify`}
              className="inline-block bg-green-500 text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-400 transition"
            >
              Login with Spotify
            </a>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">
              Hello, {user.name} 🎧
            </h2>
          </div>
        )}
      </main>
    </div>
  )
}