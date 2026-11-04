import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  clearCurrentUser,
  listLocalUsers,
  type AuthUser,
} from '../../features/auth/authService'
import { readPageSession } from '../../lib/pageSession'
import '../styles/DashboardPage.css'

function AdminDashboardPage() {
  const [session] = useState(readPageSession)
  const [accounts] = useState(() => {
    try {
      return { users: listLocalUsers(), error: '' }
    } catch (error) {
      return {
        users: [] as AuthUser[],
        error: error instanceof Error ? error.message : 'Impossible de lire les comptes locaux.',
      }
    }
  })
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
  if (session.user.role !== 'admin') return <Navigate to="/dashboard" replace />

  function signOut() {
    clearCurrentUser()
    navigate('/connexion', { replace: true })
  }

  const members = accounts.users.filter((account) => account.role === 'user')
  const admins = accounts.users.length - members.length

  return (
    <main className="dashboard-page" id="main-content">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Espace administration</p>
            <h1>Tableau de bord admin</h1>
            <p className="dashboard-subtitle">Vue d’ensemble des comptes enregistrés sur cette démo.</p>
          </div>
          <div className="dashboard-account">
            <span className="dashboard-role">Administrateur</span>
            <span className="dashboard-email">{session.user.email}</span>
            <button className="dashboard-signout" type="button" onClick={signOut}>Se déconnecter</button>
          </div>
        </header>
        <section aria-labelledby="admin-overview-title">
          <h2 className="dashboard-section-title" id="admin-overview-title">Vue d’ensemble</h2>
          <div className="dashboard-stats">
            <article className="dashboard-stat"><span>Comptes inscrits</span><strong>{accounts.users.length}</strong></article>
            <article className="dashboard-stat"><span>Membres</span><strong>{members.length}</strong></article>
            <article className="dashboard-stat"><span>Administrateurs</span><strong>{admins}</strong></article>
          </div>
          <section className="dashboard-panel" aria-labelledby="account-list-title">
            <div className="dashboard-panel-heading">
              <div>
                <h2 id="account-list-title">Comptes locaux</h2>
                <p>Les inscriptions classiques reçoivent toujours le rôle « user ».</p>
              </div>
              <span className="dashboard-count">
                {accounts.users.length} compte{accounts.users.length > 1 ? 's' : ''}
              </span>
            </div>
            {accounts.error ? (
              <p className="dashboard-error" role="alert">{accounts.error}</p>
            ) : accounts.users.length ? (
              <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr><th scope="col">Adresse e-mail</th><th scope="col">Rôle</th><th scope="col">Inscription</th></tr>
                  </thead>
                  <tbody>
                    {accounts.users.map((account) => (
                      <tr key={account.email}>
                        <td>{account.email}</td>
                        <td><span className={`dashboard-role-pill role-${account.role}`}>{account.role}</span></td>
                        <td>{new Date(account.createdAt).toLocaleDateString('fr-FR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="dashboard-empty">Aucun compte pour le moment.</p>
            )}
          </section>
        </section>
        <p className="dashboard-demo-warning">
          Mode démonstration local : les comptes et les rôles sont stockés dans ce navigateur et ne constituent pas une authentification sécurisée.
        </p>
      </div>
    </main>
  )
}

export default AdminDashboardPage
