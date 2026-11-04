import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  isValidUserRole,
  loginLocalAccount,
  registerLocalAccount,
  startUserSession,
  type AuthUser,
} from './authService'
import { siteConfig } from '../../lib/siteConfig'

type AuthenticationMode = 'login' | 'register' | 'reset'

const pageContent: Record<
  AuthenticationMode,
  { eyebrow: string; title: string; description: string; submit: string }
> = {
  login: {
    eyebrow: 'Heureux de te revoir',
    title: 'Retrouve ta communauté.',
    description: 'Connecte-toi pour retrouver tes échanges et tes prochaines lectures.',
    submit: 'Me connecter',
  },
  register: {
    eyebrow: 'Bienvenue chez Novelee',
    title: 'Chaque belle histoire commence quelque part.',
    description: 'Crée ton compte et rencontre des lecteurs qui te ressemblent.',
    submit: 'Créer mon compte',
  },
  reset: {
    eyebrow: 'Un petit oubli ?',
    title: 'On t’aide à revenir.',
    description: 'Indique ton e-mail et nous t’enverrons les instructions pour choisir un nouveau mot de passe.',
    submit: 'Envoyer les instructions',
  },
}

function AuthenticationPage({ mode }: { mode: AuthenticationMode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [consent, setConsent] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const content = pageContent[mode]
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback('')
    setSuccess(false)

    setSubmitting(true)
    try {
      if (!siteConfig.authApiUrl) {
        if (mode === 'reset') {
          throw new Error('La réinitialisation par e-mail nécessite un service d’authentification configuré.')
        }

        const user = mode === 'register'
          ? await registerLocalAccount(email, password)
          : await loginLocalAccount(email, password)
        navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard', { replace: true })
        return
      }

      const response = await fetch(siteConfig.authApiUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: mode,
          email,
          ...(mode !== 'reset' ? { password } : {}),
          ...(mode === 'register' ? { consent } : {}),
        }),
      })

      if (!response.ok) {
        throw new Error(
          mode === 'reset'
            ? 'Impossible d’envoyer les instructions pour le moment.'
            : mode === 'register'
              ? 'Impossible de créer le compte pour le moment.'
              : 'E-mail ou mot de passe invalide, ou service indisponible.',
        )
      }

      if (mode === 'login') {
        const payload: unknown = await response.json()
        const responseUser =
          typeof payload === 'object' && payload !== null && 'user' in payload
            ? payload.user
            : payload

        if (
          typeof responseUser !== 'object' ||
          responseUser === null ||
          !('email' in responseUser) ||
          typeof responseUser.email !== 'string' ||
          !('role' in responseUser) ||
          !isValidUserRole(responseUser.role)
        ) {
          throw new Error('La réponse du service doit contenir un utilisateur avec un rôle « user » ou « admin ».')
        }

        const user: AuthUser = {
          email: responseUser.email,
          role: responseUser.role,
          createdAt:
            'createdAt' in responseUser && typeof responseUser.createdAt === 'string'
              ? responseUser.createdAt
              : new Date().toISOString(),
        }
        startUserSession(user)
        navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard', { replace: true })
        return
      }

      setSuccess(true)
      setFeedback(
        mode === 'reset'
          ? 'Si un compte correspond à cette adresse, tu recevras un e-mail avec les instructions.'
          : mode === 'register'
            ? 'Ton compte a bien été créé. Tu peux maintenant te connecter.'
            : 'Connexion réussie !',
      )
      if (mode === 'reset') setEmail('')
      if (mode === 'register') {
        setEmail('')
        setPassword('')
        setConsent(false)
      }
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue. Vérifie ta connexion et réessaie.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page" id="main-content">
      <div className="auth-layout">
        <aside className="auth-story">
          <span className="auth-ornament" aria-hidden="true">✳</span>
          <p className="eyebrow">Novelee, au fil des pages</p>
          <p className="auth-quote">
            « Les livres sont encore meilleurs <em>à plusieurs.</em> »
          </p>
          <p className="auth-story-note">
            Des lecteurs qui te ressemblent, des discussions sans spoilers, et de belles
            découvertes à partager.
          </p>
          <div className="auth-book" aria-hidden="true">
            <span>✧</span>
            <strong>Une histoire<br />à vivre ensemble</strong>
            <small>NOVELEE · DEPUIS LA PREMIÈRE PAGE</small>
          </div>
        </aside>

        <section className="auth-panel" aria-labelledby="auth-title">
          <Link className="auth-back-link" to="/">← Retour à l’accueil</Link>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id="auth-title">{content.title}</h1>
          <p className="auth-description">{content.description}</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="field-label" htmlFor="auth-email">Adresse e-mail</label>
            <input
              className="email-input"
              id="auth-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="toi@exemple.fr"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            {mode !== 'reset' && (
              <>
                <div className="auth-password-label">
                  <label className="field-label" htmlFor="auth-password">Mot de passe</label>
                  {mode === 'login' && (
                    <Link to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
                  )}
                </div>
                <div className="password-field">
                  <input
                    className="email-input password-input"
                    id="auth-password"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                    minLength={8}
                    placeholder="8 caractères minimum"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <button
                    className="password-visibility-toggle"
                    type="button"
                    aria-label={passwordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    aria-pressed={passwordVisible}
                    onClick={() => setPasswordVisible((visible) => !visible)}
                  >
                    {passwordVisible ? (
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5.2 0 8.7 4.5 9.5 6-.3.6-1.1 1.7-2.3 2.8M6.2 6.2C3.9 7.7 2.7 9.6 2.5 11c.8 1.5 4.3 6 9.5 6 1 0 2-.2 2.8-.5" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}

            {mode === 'register' && (
              <label className="consent-check auth-consent" htmlFor="auth-consent">
                <input
                  id="auth-consent"
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  required
                />
                <span>
                  J’accepte les <Link to="/conditions-utilisation">conditions d’utilisation</Link> et
                  la <Link to="/confidentialite">politique de confidentialité</Link>.
                </span>
              </label>
            )}

            <button className="button button-primary auth-submit" type="submit" disabled={submitting}>
              {submitting ? 'Un instant…' : content.submit}
              <span aria-hidden="true">→</span>
            </button>
            <p
              className="form-feedback auth-feedback"
              role={success ? 'status' : 'alert'}
              aria-live="polite"
            >
              {feedback}
            </p>
          </form>

          {mode === 'login' && !siteConfig.authApiUrl && (import.meta.env.DEV || siteConfig.authDemoMode) && (
            <p className="auth-demo-hint">
              <span>Compte membre de démonstration :</span>
              <strong>lecteur@novelee.test</strong>
              <span>Mot de passe :</span>
              <strong>DemoUser!2026</strong>
              <span className="auth-demo-separator" aria-hidden="true" />
              <span>Compte admin de démonstration :</span>
              <strong>admin@novelee.test</strong>
              <span>Mot de passe :</span>
              <strong>DemoAdmin!2026</strong>
            </p>
          )}

          {mode === 'login' && (
            <p className="auth-switch">
              Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
            </p>
          )}
          {mode === 'register' && (
            <p className="auth-switch">
              Tu as déjà un compte ? <Link to="/connexion">Se connecter</Link>
            </p>
          )}
          {mode === 'reset' && (
            <p className="auth-switch">
              Tu as retrouvé ton mot de passe ? <Link to="/connexion">Retour à la connexion</Link>
            </p>
          )}
        </section>
      </div>
    </main>
  )
}

export default AuthenticationPage
