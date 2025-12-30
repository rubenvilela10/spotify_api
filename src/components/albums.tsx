import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Albums } from '../types/albums'
import type { Tracks } from '../types/tracks'

export default function Album() {
  const { id } = useParams()
  const [album, setAlbum] = useState<Albums | null>(null)

  useEffect(() => {
    const fetchAlbum = async () => {
      const token = localStorage.getItem('jwt')
      if (!token) return

      const res = await fetch(`http://localhost:3000/api/albums/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) return
      const json = await res.json()

      const normalizedAlbum = {
        ...json,
        tracks: Array.isArray(json.tracks?.items) ? json.tracks.items : [],
      }

      setAlbum(normalizedAlbum)
    }

    fetchAlbum()
  }, [id])

  if (!album) return <p className="text-center mt-20 text-neutral-400">Loading album...</p>

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Album Hero */}
      <div className="relative flex items-end gap-6 p-8 h-[420px] bg-gradient-to-b from-black/40 to-neutral-900">
        {album.images?.[0]?.url && (
          <img
            src={album.images[0].url}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}

        <img
          src={album.images?.[0]?.url}
          className="relative w-56 h-56 object-cover rounded shadow-xl"
        />

        <div className="relative">
          <p className="uppercase text-sm text-neutral-300">Album</p>
          <h1 className="text-5xl font-bold mt-2">{album.name}</h1>

          <div className="flex items-center gap-2 mt-4 text-sm text-neutral-300">
            <span className="font-medium">
              {album.artists.map(a => a.name).join(', ')}
            </span>
            <span>•</span>
            <span>{album.release_date.slice(0, 4)}</span>
            <span>•</span>
            <span>{album.total_tracks} songs</span>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="bg-green-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-green-400">
              Play
            </button>
            <button className="border border-neutral-600 px-6 py-2 rounded-full text-sm">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Tracklist */}
      <section className="px-8 mt-10 pb-20">
        <div className="grid grid-cols-[40px_1fr_80px] gap-4 text-sm text-neutral-400 border-b border-neutral-800 pb-2 mb-4">
          <span>#</span>
          <span>Title</span>
          <span className="text-right">Time</span>
        </div>

        <div className="space-y-2">
          {album.tracks.map((track: Tracks) => (
            <div
              key={track.id}
              className="grid grid-cols-[40px_1fr_80px] gap-4 items-center px-2 py-2 rounded hover:bg-neutral-800"
            >
              <span className="text-neutral-400">{track.track_number}</span>
              <span className="truncate">{track.name}</span>
              <span className="text-right text-neutral-400">
                {msToTime(track.duration_ms)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function msToTime(ms: number) {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  return `${min}:${sec < 10 ? '0' : ''}${sec}`
}