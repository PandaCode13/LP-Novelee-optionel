import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  clearCurrentUser,
  getCurrentUser,
  listLocalUsers,
  type AuthUser,
  type UserRole,
} from '../features/auth/authService'
import './DashboardPage.css'

function readDashboardState() {
  try {
    return { user: getCurrentUser(), error: '' }
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : 'Impossible de lire la session locale.',
    }
  }
}

function DashboardPage({ requiredRole }: { requiredRole: UserRole }) {
  const [session] = useState(readDashboardState)
  const [accounts] = useState(() => {
    if (requiredRole !== 'admin') return { users: [] as AuthUser[], error: '' }

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
  if (session.user.role !== requiredRole) {
    return <Navigate to={session.user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />
  }

  const user = session.user
  const isAdmin = requiredRole === 'admin'
  const regularUsers = accounts.users.filter((account) => account.role === 'user')

  function signOut() {
    clearCurrentUser()
    navigate('/connexion', { replace: true })
  }

  return (
    <main className="dashboard-page" id="main-content">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">{isAdmin ? 'Espace administration' : 'Ton espace lecture'}</p>
            <h1>{isAdmin ? 'Tableau de bord admin' : 'Bonjour, lecteur·rice.'}</h1>
            <p className="dashboard-subtitle">
              {isAdmin
                ? 'Vue d’ensemble des comptes enregistrés sur cette démo.'
                : 'Retrouve ta communauté et fais vivre tes prochaines lectures.'}
            </p>
          </div>
          <div className="dashboard-account">
            <span className="dashboard-role">{isAdmin ? 'Administrateur' : 'Membre'}</span>
            <span className="dashboard-email">{user.email}</span>
            <button className="dashboard-signout" type="button" onClick={signOut}>
              Se déconnecter
            </button>
          </div>
        </header>

        {isAdmin ? (
          <section aria-labelledby="admin-overview-title">
            <h2 className="dashboard-section-title" id="admin-overview-title">Vue d’ensemble</h2>
            <div className="dashboard-stats">
              <article className="dashboard-stat">
                <span>Comptes inscrits</span>
                <strong>{accounts.users.length}</strong>
              </article>
              <article className="dashboard-stat">
                <span>Membres</span>
                <strong>{regularUsers.length}</strong>
              </article>
              <article className="dashboard-stat">
                <span>Administrateurs</span>
                <strong>{accounts.users.length - regularUsers.length}</strong>
              </article>
            </div>

            <section className="dashboard-panel" aria-labelledby="account-list-title">
              <div className="dashboard-panel-heading">
                <div>
                  <h2 id="account-list-title">Comptes locaux</h2>
                  <p>Les inscriptions classiques reçoivent toujours le rôle « user ».</p>
                </div>
                <span className="dashboard-count">{accounts.users.length} compte{accounts.users.length > 1 ? 's' : ''}</span>
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
        ) : (
          <>
            <section className="dashboard-welcome" aria-labelledby="member-welcome-title">
              <div>
                <p className="dashboard-kicker">Ta prochaine belle histoire</p>
                <h2 id="member-welcome-title">La lecture est encore meilleure à plusieurs.</h2>
                <p>Découvre les services Novelee et commence à échanger avec des lecteurs proches de toi.</p>
                <Link className="button button-primary" to="/#services">Explorer les services <span aria-hidden="true">→</span></Link>
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
          </>
        )}

        <p className="dashboard-demo-warning">
          Mode démonstration local : les comptes et les rôles sont stockés dans ce navigateur et ne constituent pas une authentification sécurisée.
        </p>
      </div>
    </main>
  )
}

export default DashboardPage
