function App() {
  const login = () => {
    window.location.href = 'http://localhost:3000/api/auth/spotify'
  }

  return (
    <div>
      <h1>Spotify App</h1>
      <button onClick={login}>
        Login com Spotify
      </button>
    </div>
  )
}

export default App