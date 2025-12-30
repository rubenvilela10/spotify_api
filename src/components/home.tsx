import { useEffect, useState } from 'react'
import type { HomeResponse, User } from '../types/user'
import type { Artists } from '../types/artists'
import type { Tracks } from '../types/tracks'
import { Link } from 'react-router-dom'
import type { Albums } from '../types/albums'

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [artists, setArtists] = useState<Artists[]>([])
  const [tracks, setTracks] = useState<Tracks[]>([])
  const [albums, setAlbums] = useState<Albums[]>([])

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
        setArtists(data.top_artists)
        setTracks(data.top_tracks)
        setAlbums(data.top_albums)
      } catch (e) {
        console.error(e)
      }
    }

    fetchHome()
  }, [])

  if (!user) return <p className="text-center mt-20 text-lg">Loading...</p>

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <main className="p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Welcome, {user.name}</h2>

        {/* Top Artists */}
        <section className="mt-8">
          <h3 className="font-semibold text-2xl mb-4">Top 5 Artists</h3>
          <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800">
            {artists.map(artist => (
              <Link
                to={`/artists/${artist.id}`}
                key={artist.id}
                className="flex-none w-40 bg-neutral-800 p-4 rounded-lg shadow hover:scale-105 transition-transform duration-200"
              >
                {artist.images?.[0]?.url && (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                )}
                <h4 className="text-lg font-semibold">{artist.name}</h4>
                <p className="text-sm text-neutral-400 truncate">{artist.genres?.join(', ')}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Tracks */}
        <section className="mt-12">
          <h3 className="font-semibold text-2xl mb-4">Top 5 Tracks</h3>
          <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800">
            {tracks.map(track => (
              <Link
                to={`/tracks/${track.id}`}
                key={track.id}
                className="flex-none w-40 bg-neutral-800 p-4 rounded-lg shadow hover:scale-105 transition-transform duration-200"
              >
                {track.album?.images?.[0]?.url && (
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                )}
                <h4 className="text-lg font-semibold truncate">{track.name}</h4>
                <p className="text-sm text-neutral-400 truncate">
                  {track.artists.map(a => a.name).join(', ')}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Albums */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-2xl">Saved Albums</h3>
            <span className="text-sm text-neutral-400">{albums.length} albums</span>
          </div>

          <div className="flex space-x-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-800">
            {albums.map(album => (
              <Link
                to={`/albums/${album.id}`}
                key={album.id}
                className="flex-none w-48 bg-neutral-800 rounded-lg shadow hover:bg-neutral-700 transition"
              >
                {/* Cover */}
                <div className="relative">
                  {album.images?.[0]?.url ? (
                    <img
                      src={album.images[0].url}
                      alt={album.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-neutral-700 rounded-t-lg" />
                  )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-1">
                  <p className="font-semibold truncate">{album.name}</p>

                  <p className="text-sm text-neutral-400 truncate">
                    {album.artists.map(a => a.name).join(', ')}
                  </p>

                  <div className="flex items-center justify-between text-xs text-neutral-500 pt-2">
                    <span>{album.release_date?.slice(0, 4) || '—'}</span>
                    {album.total_tracks && (
                      <span>{album.total_tracks} tracks</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}