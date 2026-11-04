import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { listLocalUsers, type AuthUser } from '../../features/auth/authService'
import { readPageSession } from '../../lib/pageSession'
import '../styles/AccountPages.css'

function UsersPage() {
  const [session] = useState(readPageSession)
  const [accounts] = useState(() => {
    try {
      return { users: listLocalUsers(), error: '' }
    } catch (error) {
      return {
        users: [] as AuthUser[],
        error: error instanceof Error ? error.message : 'Impossible de lire les comptes.',
      }
    }
  })

  if (session.error) {
    return <main className="role-area" id="main-content"><div className="role-area-panel" role="alert"><h1>Session indisponible</h1><p>{session.error}</p><Link className="button button-primary" to="/connexion">Se reconnecter</Link></div></main>
  }
  if (!session.user) return <Navigate to="/connexion" replace />
  if (session.user.role !== 'admin') return <Navigate to="/dashboard" replace />

  return (
    <main className="role-area" id="main-content">
      <div className="role-area-shell">
        <p className="eyebrow">Espace administration</p>
        <h1>Gestion des utilisateurs</h1>
        <p className="role-area-intro">Consulte les comptes connus de cette démonstration.</p>
        <section className="role-area-panel" aria-labelledby="users-title">
          <div className="role-area-panel-heading">
            <h2 id="users-title">Comptes enregistrés</h2>
            <span className="role-area-account">{session.user.email}</span>
          </div>
          {accounts.error ? (
            <p className="role-area-error" role="alert">{accounts.error}</p>
          ) : accounts.users.length ? (
            <div className="role-area-table-wrap">
              <table className="role-area-table">
                <thead>
                  <tr>
                    <th scope="col">Adresse e-mail</th>
                    <th scope="col">Rôle</th>
                    <th scope="col">Inscription</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.users.map((account) => (
                    <tr key={account.email}>
                      <td>{account.email}</td>
                      <td><span className={`role-area-role role-${account.role}`}>{account.role}</span></td>
                      <td>{new Date(account.createdAt).toLocaleDateString('fr-FR')}</td>
                      <td className="user-actions">
                        <Link className="button button-secondary" to={`/admin/utilisateurs/${encodeURIComponent(account.email)}`}>
                          Modifier
                        </Link>
                        <Link className="button button-secondary" to={`/admin/utilisateurs/${encodeURIComponent(account.email)}`}>
                          Supprimer
                        </Link>
                        <Link className="button button-secondary" to={`/admin/utilisateurs/${encodeURIComponent(account.email)}`}>
                          Voir son profil
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="role-area-empty">Aucun compte enregistré pour le moment.</p>
          )}
        </section>
        <p className="role-area-note">
          Mode démonstration : ces comptes sont enregistrés dans le navigateur et ne représentent pas une liste de comptes de production.
        </p>
      </div>
    </main>
  )
}

export default UsersPage
