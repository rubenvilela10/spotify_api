import { useEffect, useState } from 'react'
import Navbar from './navbar'
import type { HomeResponse, User } from '../types/user'
import type { Artists } from '../types/artists'
import type { Tracks } from '../types/tracks'

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [artists, setArtists] = useState<Artists[]>([])
  const [tracks, setTracks] = useState<Tracks[]>([])

  useEffect(() => {
    const fetchHome = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) return;
  
      try {
        const res = await fetch('http://localhost:3000/api/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          console.error("Unauthorized");
          return;
        }
  
        const data: HomeResponse = await res.json();
        setUser(data.user);
        setArtists(data.top_artists);
        setTracks(data.top_tracks);
      } catch (e) {
        console.error(e);
      }
    };
  
    fetchHome();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('jwt')
    setUser(null)
  }

  if (!user) return <p>Loading...</p>

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="p-8">
        <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>

        <section className="mt-6">
          <h3 className="font-semibold text-xl">Top 5 Artists</h3>
          <ul>
            {artists.map(artist => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold text-xl">Top 5 Tracks</h3>
          <ul>
            {tracks.map(track => (
              <li key={track.id}>
                {track.name} - {track.artists.map(a => a.name).join(', ')}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}