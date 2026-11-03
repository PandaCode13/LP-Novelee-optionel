import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearCurrentUser } from '../features/auth/authService'

function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    clearCurrentUser()
    navigate('/connexion', { replace: true })
  }, [navigate])

  return <main className="role-area" id="main-content">Déconnexion…</main>
}

export default LogoutPage
