import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Tracks } from '../types/tracks'
import { usePlayer } from '../context/PlayerContext'

export default function Tracks() {
  const { id } = useParams<{ id: string }>()
  const [track, setTrack] = useState<Tracks | null>(null)
  const { currentTrack, isPlaying, play, toggle } = usePlayer()

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

  if (!track)
    return <p className="text-center mt-20 text-lg text-neutral-400">Loading track...</p>

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header / Hero */}
      <div className="bg-gradient-to-b from-neutral-700/40 to-neutral-900">
        <div className="max-w-6xl mx-auto px-8 py-16 flex gap-8 items-end">
          <img
            src={track.album.images[0]?.url}
            alt={track.name}
            className="w-60 h-60 object-cover rounded shadow-2xl"
          />

          <div>
            <p className="uppercase text-sm tracking-wide text-neutral-300 mb-2">
              Track
            </p>

            <h1 className="text-5xl font-extrabold leading-tight mb-4">
              {track.name}
            </h1>

            <div className="flex items-center gap-2 text-neutral-300 text-sm">
              <span className="font-semibold text-white">
                {track.artists[0].name}
              </span>
              <span>•</span>
              <span>{track.album.name}</span>
              <span>•</span>
              <span>
                {Math.floor(track.duration_ms / 60000)}:
                {Math.floor((track.duration_ms % 60000) / 1000)
                  .toString()
                  .padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex flex-col gap-6">
          {/* Actions */}
          {track.preview_url ? (
            <button
              onClick={() =>
                currentTrack?.id === track.id && isPlaying ? toggle() : play(track)
              }
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              {currentTrack?.id === track.id && isPlaying ? 'Pause' : 'Play'}
            </button>
          ) : (
            <span className='text-neutral-500'>No preview available</span>
          )}

          {/* Info */}
          <div className="text-neutral-300 space-y-2">
            <p>
              <span className="text-neutral-500">Artists:</span>{' '}
              {track.artists.map((artist, index) => (
                <span key={artist.id}>
                  <Link
                    to={`/artists/${artist.id}`}
                    className="hover:underline text-white"
                  >
                    {artist.name}
                  </Link>
                  {index < track.artists.length - 1 && ', '}
                </span>
              ))}
            </p>

            <p>
              <span className="text-neutral-500">Popularity:</span>{' '}
              {track.popularity}/100
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}