import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import type { HomeResponse, User } from '../types/user'

export default function MainLayout() {
  const [user, setUser] = useState<User | null>(null)


  useEffect(() => {
    const fetchHome = async () => {
      const token = localStorage.getItem('jwt')
      if (!token) return

      try {
        const res = await fetch('http://localhost:3000/api/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          console.error("Unauthorized")
          return
        }

        const data: HomeResponse = await res.json()
        setUser(data.user)
      } catch (e) {
        console.error(e)
      }
    }

    fetchHome()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {user && <Navbar user={user} onLogout={handleLogout} />}
      <Outlet />
    </div>
  )
}