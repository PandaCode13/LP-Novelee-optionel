import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { readPageSession } from '../../lib/pageSession'
import '../styles/AccountPages.css'

function LibrariesPage() {
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
        <h1>Mes bibliothèques</h1>
        <p className="role-area-intro">Retrouve les livres que tu souhaites lire et ceux qui t’ont accompagné.</p>
        <section className="role-area-panel" aria-labelledby="libraries-title">
          <div className="role-area-panel-heading">
            <h2 id="libraries-title">Ta collection</h2>
            <span className="role-area-account">{session.user.email}</span>
          </div>
          <p className="role-area-empty">Ta bibliothèque est prête à accueillir tes prochaines lectures.</p>
        </section>
        <p className="role-area-note">Ta bibliothèque sera synchronisée lorsque le service de données sera connecté.</p>
      </div>
    </main>
  )
}

export default LibrariesPage
