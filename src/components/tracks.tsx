import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from './navbar'
import type { User } from '../types/user'
import type { Tracks } from '../types/tracks'


export default function Tracks() {
  const { id } = useParams<{ id: string }>()
  const [track, setTrack] = useState<Tracks | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchTrack = async () => {
      const token = localStorage.getItem('jwt')
      if (!token) return

      try {
        const res = await fetch(`http://localhost:3000/api/tracks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) return

        const data: Tracks = await res.json()
        setTrack(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchTrack()
  }, [id])

  if (!track) return <p className="text-center mt-20 text-lg">Loading track...</p>

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <main className="p-8 max-w-4xl mx-auto">
        <div className="flex gap-6">
          <img
            src={track.album.images[0]?.url}
            alt={track.name}
            className="w-64 h-64 object-cover rounded-md"
          />
          <div className="flex-1 flex flex-col justify-between">
            <h1 className="text-3xl font-bold">{track.name}</h1>
            <p className="text-lg text-neutral-400">
              Album: {track.album.name}
            </p>
            <p className="text-lg text-neutral-400">
              Artists:{' '}
              {track.artists.map((a) => (
                <Link key={a.id} to={`/artists/${a.id}`} className="hover:underline">
                  {a.name}
                </Link>
              )).reduce((prev, curr) => [prev, ', ', curr] as any)}
            </p>
            <p className="text-lg text-neutral-400">
              Duration: {Math.floor(track.duration_ms / 60000)}:
              {Math.floor((track.duration_ms % 60000) / 1000)
                .toString()
                .padStart(2, '0')}
            </p>
            <p className="text-lg text-neutral-400">Popularity: {track.popularity}</p>

            {track.preview_url && (
              <audio controls className="mt-4 w-full">
                <source src={track.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}