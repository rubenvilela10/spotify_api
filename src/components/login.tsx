import { useState, useEffect } from 'react'
import type { User, MeResponse } from '../types/user'

export function Login() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/me', { credentials: 'include' })
        if (!res.ok) return setUser(null)

        const data: MeResponse = await res.json()
        setUser(data.user)
      } catch {
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  const login = () => {
    window.location.href = 'http://localhost:3000/api/auth/spotify'
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {user ? (
        <p>Welcome, {user.name}</p>
      ) : (
        <button onClick={login} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Login with Spotify
        </button>
      )}
    </div>
  )
}