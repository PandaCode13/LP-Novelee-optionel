import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { readPageSession } from '../../lib/pageSession'
import '../styles/AccountPages.css'

function ProfilePage() {
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
        <h1>Mon profil</h1>
        <p className="role-area-intro">Consulte les informations associées à ton compte Novelee.</p>
        <section className="role-area-panel" aria-labelledby="profile-title">
          <div className="role-area-panel-heading">
            <h2 id="profile-title">Informations du compte</h2>
            <span className="role-area-account">{session.user.email}</span>
          </div>
          <dl className="role-area-profile">
            <div><dt>Adresse e-mail</dt><dd>{session.user.email}</dd></div>
            <div><dt>Rôle</dt><dd>Membre</dd></div>
            <div><dt>Membre depuis</dt><dd>{new Date(session.user.createdAt).toLocaleDateString('fr-FR')}</dd></div>
          </dl>
        </section>
      </div>
    </main>
  )
}

export default ProfilePage
