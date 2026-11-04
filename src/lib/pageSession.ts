import { getCurrentUser, type AuthUser } from '../features/auth/authService'

export type PageSession = {
  user: AuthUser | null
  error: string
}

export function readPageSession(): PageSession {
  try {
    return { user: getCurrentUser(), error: '' }
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : 'Impossible de lire la session locale.',
    }
  }
}
