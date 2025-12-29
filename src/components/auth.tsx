import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('jwt', token);
      navigate('/home');
    } else {
        console.error("No token found");
    }
    navigate('/home')
  }, [navigate])

  return <p>Logging in...</p>
}