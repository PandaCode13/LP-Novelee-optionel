import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { readPageSession } from '../../lib/pageSession'
import '../styles/AccountPages.css'

function AdminNotificationsPage() {
  const [session] = useState(readPageSession)

  if (session.error) {
    return (
      <main className="role-area" id="main-content">
        <div className="role-area-panel" role="alert">
          <h1>Session indisponible</h1>
          <p>{session.error}</p>
          <Link className="button button-primary" to="/connexion">Se reconnecter</Link>
        </div>
      </main>
    )
  }
  if (!session.user) return <Navigate to="/connexion" replace />
  if (session.user.role !== 'admin') return <Navigate to="/dashboard" replace />

  return (
    <main className="role-area" id="main-content">
      <div className="role-area-shell">
        <p className="eyebrow">Espace administration</p>
        <h1>Notifications administrateur</h1>
        <p className="role-area-intro">Retrouve les notifications liées à l’administration.</p>
        <section className="role-area-panel" aria-labelledby="admin-notifications-title">
          <div className="role-area-panel-heading">
            <h2 id="admin-notifications-title">Notifications récentes</h2>
            <span className="role-area-account">{session.user.email}</span>
          </div>
          <p className="role-area-empty">Aucune notification à afficher pour le moment.</p>
        </section>
        <p className="role-area-note">
          Les notifications seront disponibles lorsqu’un service d’administration sera connecté.
        </p>
      </div>
    </main>
  )
}

export default AdminNotificationsPage
