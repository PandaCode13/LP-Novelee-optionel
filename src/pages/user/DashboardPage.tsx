import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { clearCurrentUser } from '../../features/auth/authService'
import { readPageSession } from '../../lib/pageSession'
import '../styles/DashboardPage.css'

function UserDashboardPage() {
  const [session] = useState(readPageSession)
  const navigate = useNavigate()

  if (session.error) {
    return (
      <main className="dashboard-page" id="main-content">
        <div className="dashboard-message" role="alert">
          <h1>Session indisponible</h1>
          <p>{session.error}</p>
          <Link className="button button-primary" to="/connexion">Se reconnecter</Link>
        </div>
      </main>
    )
  }
  if (!session.user) return <Navigate to="/connexion" replace />
  if (session.user.role !== 'user') return <Navigate to="/admin/dashboard" replace />

  function signOut() {
    clearCurrentUser()
    navigate('/connexion', { replace: true })
  }

  return (
    <main className="dashboard-page" id="main-content">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Ton espace lecture</p>
            <h1>Bonjour, lecteur·rice.</h1>
            <p className="dashboard-subtitle">Retrouve ta communauté et fais vivre tes prochaines lectures.</p>
          </div>
          <div className="dashboard-account">
            <span className="dashboard-role">Membre</span>
            <span className="dashboard-email">{session.user.email}</span>
            <button className="dashboard-signout" type="button" onClick={signOut}>Se déconnecter</button>
          </div>
        </header>
        <section className="dashboard-welcome" aria-labelledby="member-welcome-title">
          <div>
            <p className="dashboard-kicker">Ta prochaine belle histoire</p>
            <h2 id="member-welcome-title">La lecture est encore meilleure à plusieurs.</h2>
            <p>Découvre les solutions Novelee et commence à échanger avec des lecteurs proches de toi.</p>
            <Link className="button button-primary" to="/#solutions">
              Découvrir Novelee <span aria-hidden="true">→</span>
            </Link>
          </div>
          <span className="dashboard-book" aria-hidden="true">✧</span>
        </section>
        <section aria-labelledby="member-activity-title">
          <h2 className="dashboard-section-title" id="member-activity-title">Ton espace</h2>
          <div className="dashboard-stats">
            <article className="dashboard-stat"><span>Livres dans ta bibliothèque</span><strong>0</strong></article>
            <article className="dashboard-stat"><span>Groupes rejoints</span><strong>0</strong></article>
            <article className="dashboard-stat"><span>Messages non lus</span><strong>0</strong></article>
          </div>
          <p className="dashboard-demo-note">
            Les fonctionnalités de lecture et de messagerie seront disponibles avec le service Novelee.
          </p>
        </section>
        <p className="dashboard-demo-warning">
          Mode démonstration local : les comptes et les rôles sont stockés dans ce navigateur et ne constituent pas une authentification sécurisée.
        </p>
      </div>
    </main>
  )
}

export default UserDashboardPage
