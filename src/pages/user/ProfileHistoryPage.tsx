import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { readPageSession } from '../../lib/pageSession'
import '../styles/AccountPages.css'

function ProfileHistoryPage() {
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
        <h1>Mon historique</h1>
        <p className="role-area-intro">Retrouve l’activité récente de ton compte.</p>
        <section className="role-area-panel" aria-labelledby="history-title">
          <div className="role-area-panel-heading">
            <h2 id="history-title">Activité récente</h2>
            <span className="role-area-account">{session.user.email}</span>
          </div>
          <p className="role-area-empty">Aucune activité à afficher pour le moment.</p>
        </section>
      </div>
    </main>
  )
}

export default ProfileHistoryPage
