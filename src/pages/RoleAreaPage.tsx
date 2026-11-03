import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import {
  getCurrentUser,
  listLocalUsers,
  type AuthUser,
  type UserRole,
} from '../features/auth/authService'
import './RoleAreaPage.css'

type AreaContent = {
  title: string
  description: string
  section: string
  empty: string
}

const userPages: Record<string, AreaContent> = {
  '/bibliotheques': {
    title: 'Mes bibliothèques',
    description: 'Retrouve les livres que tu souhaites lire et ceux qui t’ont accompagné.',
    section: 'Ta collection',
    empty: 'Ta bibliothèque est prête à accueillir tes prochaines lectures.',
  },
  '/archives': {
    title: 'Mes archives',
    description: 'Retrouve ici les lectures et les échanges que tu as archivés.',
    section: 'Tes archives',
    empty: 'Aucun élément archivé pour le moment.',
  },
  '/profil': {
    title: 'Mon profil',
    description: 'Consulte les informations associées à ton compte Novelee.',
    section: 'Informations du compte',
    empty: '',
  },
  '/profil/parametres': {
    title: 'Paramètres du profil',
    description: 'Gère les préférences de ton espace membre.',
    section: 'Préférences',
    empty: 'Les réglages du profil seront disponibles lorsque les préférences du compte seront connectées.',
  },
  '/profil/historique': {
    title: 'Mon historique',
    description: 'Retrouve l’activité récente de ton compte.',
    section: 'Activité récente',
    empty: 'Aucune activité à afficher pour le moment.',
  },
}

const adminPages: Record<string, AreaContent> = {
  '/admin/utilisateurs': {
    title: 'Gestion des utilisateurs',
    description: 'Consulte les comptes connus de cette démonstration.',
    section: 'Comptes enregistrés',
    empty: 'Aucun compte enregistré pour le moment.',
  },
  '/admin/historique': {
    title: 'Historique admin',
    description: 'Consulte les événements d’administration.',
    section: 'Activité administrative',
    empty: 'Aucun événement administratif à afficher.',
  },
  '/admin/profil': {
    title: 'Profil administrateur',
    description: 'Consulte les informations associées à ton compte administrateur.',
    section: 'Informations du compte',
    empty: '',
  },
  '/admin/parametres': {
    title: 'Paramètres administrateur',
    description: 'Gère les préférences de ton espace d’administration.',
    section: 'Préférences',
    empty: 'Les réglages administrateur seront disponibles lorsque les préférences du compte seront connectées.',
  },
}

function readSession() {
  try {
    return { user: getCurrentUser(), error: '' }
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : 'Impossible de lire la session locale.',
    }
  }
}

function RoleAreaPage({ requiredRole }: { requiredRole: UserRole }) {
  const { pathname } = useLocation()
  const [session] = useState(readSession)
  const [accounts] = useState(() => {
    if (requiredRole !== 'admin') return { users: [] as AuthUser[], error: '' }

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
  if (session.user.role !== requiredRole) {
    return <Navigate to={session.user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />
  }

  const page = (requiredRole === 'admin' ? adminPages : userPages)[pathname]
  if (!page) return <Navigate to={requiredRole === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />

  return (
    <main className="role-area" id="main-content">
      <div className="role-area-shell">
        <p className="eyebrow">{requiredRole === 'admin' ? 'Espace administration' : 'Espace membre'}</p>
        <h1>{page.title}</h1>
        <p className="role-area-intro">{page.description}</p>
        <section className="role-area-panel" aria-labelledby="role-area-section">
          <div className="role-area-panel-heading">
            <h2 id="role-area-section">{page.section}</h2>
            <span className="role-area-account">
              {session.user.email} · {session.user.role}
            </span>
          </div>
          {page.empty ? (
            <p className="role-area-empty">{page.empty}</p>
          ) : (
            <dl className="role-area-profile">
              <div><dt>Adresse e-mail</dt><dd>{session.user.email}</dd></div>
              <div><dt>Rôle</dt><dd>{session.user.role}</dd></div>
              <div><dt>Membre depuis</dt><dd>{new Date(session.user.createdAt).toLocaleDateString('fr-FR')}</dd></div>
            </dl>
          )}
          {requiredRole === 'admin' && pathname === '/admin/utilisateurs' && (
            accounts.error ? (
              <p className="role-area-error" role="alert">{accounts.error}</p>
            ) : accounts.users.length ? (
              <div className="role-area-table-wrap">
                <table className="role-area-table">
                  <thead><tr><th scope="col">Adresse e-mail</th><th scope="col">Rôle</th><th scope="col">Inscription</th></tr></thead>
                  <tbody>
                    {accounts.users.map((account) => (
                      <tr key={account.email}>
                        <td>{account.email}</td>
                        <td><span className={`role-area-role role-${account.role}`}>{account.role}</span></td>
                        <td>{new Date(account.createdAt).toLocaleDateString('fr-FR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="role-area-empty">{page.empty}</p>
          )}
        </section>
        <p className="role-area-note">
          Mode démonstration : ces pages affichent les données disponibles localement. Les changements de profil et l’historique seront reliés à un service ultérieurement.
        </p>
      </div>
    </main>
  )
}

export default RoleAreaPage
