import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Albums } from '../types/albums'
import type { Tracks } from '../types/tracks'
import type { Artists } from '../types/artists'

export default function Artists() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchArtist = async () => {
      const token = localStorage.getItem('jwt')
      if (!token) return

      const res = await fetch(`http://localhost:3000/api/artists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const json = await res.json()
      setData(json)
    }

    fetchArtist()
  }, [id])

  if (!data) return <p className="text-center mt-20">Loading artist...</p>

  const { artist, top_tracks, top_albums } = data

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <ArtistHero artist={artist} />
      <TopTracks tracks={top_tracks} />
      <Albums albums={top_albums} />
    </div>
  )
}

function ArtistHero({ artist }: { artist: Artists }) {
  return (
    <div className="relative h-[420px] flex items-end p-8 bg-gradient-to-b from-black/30 to-neutral-900">
      <img
        src={artist.images?.[0]?.url}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="relative flex items-end gap-6">
        <img
          src={artist.images?.[0]?.url}
          className="w-48 h-48 rounded-full object-cover shadow-xl"
        />

        <div>
          <p className="uppercase text-sm text-neutral-300">Artist</p>
          <h1 className="text-6xl font-bold">{artist.name}</h1>

          <div className="flex items-center gap-4 mt-4 text-neutral-300 text-sm">
            <span>{artist.followers?.total?.toLocaleString() || '0'} followers</span>
            <span>•</span>
            <span>Popularity {artist.popularity ?? 0}%</span>
            <span>•</span>
            <span>Genres {artist.genres?.join(', ')}%</span>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="bg-green-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-green-400">
              Play
            </button>
            <button className="border border-neutral-600 px-6 py-2 rounded-full">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


function TopTracks({ tracks }: { tracks: Tracks[] }) {
  return (
    <section className="px-8 mt-10">
      <h2 className="text-2xl font-bold mb-4">Popular</h2>

      <div className="space-y-3">
        {tracks.map((track, i) => (
          <div
            key={track.id}
            className="flex items-center gap-4 px-4 py-2 rounded-md hover:bg-neutral-800"
          >
            <span className="w-6 text-neutral-400">{i + 1}</span>

            {track.album?.images?.[0]?.url ? (
              <img
                src={track.album.images[0].url}
                className="w-12 h-12 rounded"
                alt={track.name}
              />
            ) : (
              <div className="w-12 h-12 bg-neutral-700 rounded" />
            )}

            <div className="flex-1">
              <p className="font-medium">{track.name || 'Unknown track'}</p>
            </div>

            <span className="text-neutral-400 text-sm">
              {track.duration_ms ? msToTime(track.duration_ms) : '0:00'}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function msToTime(ms: number) {
    const min = Math.floor(ms / 60000)
    const sec = ((ms % 60000) / 1000).toFixed(0)
    return `${min}:${+sec < 10 ? '0' : ''}${sec}`
}


function Albums({ albums }: { albums: Albums[] }) {
  return (
    <section className="px-8 mt-12 pb-20">
      <h2 className="text-2xl font-bold mb-4">Albums</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {albums.map(album => (
          <Link
          to={`/albums/${album.id}`}
            key={album.id}
            className="bg-neutral-800 p-4 rounded-lg hover:bg-neutral-700 transition"
          >
            {album.images?.[0]?.url ? (
              <img
                src={album.images[0].url}
                className="rounded mb-3"
                alt={album.name}
              />
            ) : (
              <div className="w-full h-40 bg-neutral-700 rounded mb-3" />
            )}

            <p className="font-semibold truncate">{album.name || 'Unknown Album'}</p>
            <p className="text-sm text-neutral-400">
              {album.release_date ? album.release_date.slice(0, 4) : '----'}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}