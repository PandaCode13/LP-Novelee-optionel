import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { readPageSession } from '../../lib/pageSession'
import '../styles/AccountPages.css'

function ProfileSettingsPage() {
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
        <h1>Paramètres du profil</h1>
        <p className="role-area-intro">Gère les préférences de ton espace membre.</p>
        <section className="role-area-panel" aria-labelledby="settings-title">
          <div className="role-area-panel-heading">
            <h2 id="settings-title">Préférences</h2>
            <span className="role-area-account">{session.user.email}</span>
          </div>
          <p className="role-area-empty">Les réglages du profil seront disponibles lorsque les préférences du compte seront connectées.</p>
        </section>
      </div>
    </main>
  )
}

export default ProfileSettingsPage
