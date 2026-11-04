import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { readPageSession } from '../../lib/pageSession'
import '../styles/AccountPages.css'

function NotificationsPage() {
  const [session] = useState(readPageSession)
  if (session.error) {
    return <main className="role-area" id="main-content"><div className="role-area-panel" role="alert"><h1>Session indisponible</h1><p>{session.error}</p><Link className="button button-primary" to="/connexion">Se reconnecter</Link></div></main>
  }
  if (!session.user) return <Navigate to="/connexion" replace />
  if (session.user.role !== 'user') return <Navigate to="/admin/dashboard" replace />

  return (
    <main className="role-area" id="main-content">
      <div className="role-area-shell">
        <p className="eyebrow">Espace membre</p>
        <h1>Mes notifications</h1>
        <p className="role-area-intro">Retrouve les nouvelles liées à ton compte et à ta communauté.</p>
        <section className="role-area-panel" aria-labelledby="notifications-title">
          <div className="role-area-panel-heading">
            <h2 id="notifications-title">Activité récente</h2>
            <span className="role-area-account">{session.user.email}</span>
          </div>
          <p className="role-area-empty">Tu n’as pas de nouvelle notification pour le moment.</p>
        </section>
      </div>
    </main>
  )
}

export default NotificationsPage
