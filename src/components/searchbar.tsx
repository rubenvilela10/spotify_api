import React, { useState, useRef, useEffect } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<any[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setResult([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return

    const token = localStorage.getItem('jwt')
    if (!token) return

    try {
      const res = await fetch(
        `http://localhost:3000/api/search?q=${encodeURIComponent(query)}&type=track,artist,album`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (!res.ok) return console.error('Search failed')

      const data = await res.json()
      setResult(
        data.tracks?.items ||
        data.artists?.items ||
        data.albums?.items ||
        []
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          type="text"
          placeholder="Search songs, artists..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-4 pr-10 py-2 rounded-full bg-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition"
          aria-label="Search"
        >
          {/* SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {result.length > 0 && (
        <div className="absolute mt-1 w-full bg-neutral-900 border border-neutral-700 rounded-lg max-h-120 overflow-y-auto z-50">
          {result.map(item => (
            <div
              key={item.id}
              className="px-4 py-2 hover:bg-neutral-800 cursor-pointer flex items-center gap-3"
            >
              {item.images?.[0]?.url && (
                <img
                  src={item.images[0].url}
                  alt={item.name}
                  className="w-10 h-10 object-cover rounded"
                />
              )}
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}