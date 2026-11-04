import type { UserRole } from '../features/auth/authService'

export type NavLink = {
  label: string
  to: string
}

export type NavItem = NavLink & {
  children?: NavItem[]
  action?: 'logout'
}

export type Role = UserRole

export const navByRole: Record<Role, NavItem[]> = {
  user: [
    { label: 'Accueil', to: '/accueil' },
    { label: 'Bibliothèques', to: '/bibliotheques' },
    { label: 'Archives', to: '/archives' },
    { label: 'Conversations', to: '/conversations' },
    { label: 'Notifications', to: '/notifications' },
    {
      label: 'Profil',
      to: '/profil',
      children: [
        { label: 'Voir son profil', to: '/profil' },
        { label: 'Paramètres', to: '/profil/parametres' },
        { label: 'Historique', to: '/profil/historique' },
        { label: 'Déconnexion', to: '/deconnexion', action: 'logout' },
      ],
    },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin/dashboard' },
    { label: 'Gestion des users', to: '/admin/utilisateurs' },
    { label: 'Historique', to: '/admin/historique' },
    {
      label: 'Notifications',
      to: '/admin/notifications',
    },
    {
      label: 'Profil',
      to: '/admin/profil',
      children: [
        { label: 'Voir son profil', to: '/admin/profil' },
        { label: 'Paramètres', to: '/admin/parametres' },
        { label: 'Déconnexion', to: '/deconnexion', action: 'logout' },
      ],
    },
  ],
}
