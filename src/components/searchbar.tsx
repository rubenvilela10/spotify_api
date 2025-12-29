import React, { useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', query)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search songs, artists ..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="px-4 py-2 rounded-full bg-neutral-800 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button type="submit" className="ml-2 bg-blue-500 px-2 py-1 rounded">
        Search
      </button>
    </form>
  )
}