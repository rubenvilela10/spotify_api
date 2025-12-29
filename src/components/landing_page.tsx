export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Discover your music
          </h1>

          <a
            href="http://localhost:3000/api/auth/spotify"
            className="inline-block bg-green-500 text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-400 transition"
          >
            Login with Spotify
          </a>
        </div>
      </main>
    </div>
  )
}