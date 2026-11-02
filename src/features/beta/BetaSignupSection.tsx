import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CheckIcon } from '../landing/icons'
import { siteConfig } from '../../lib/siteConfig'

function BetaSignupSection() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback('')

    if (!siteConfig.betaApiUrl) {
      setFeedback('Les inscriptions en ligne ne sont pas encore activées. Réessaie bientôt !')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(siteConfig.betaApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent }),
      })

      if (!response.ok) {
        throw new Error(`L’inscription a échoué (HTTP ${response.status}).`)
      }

      setSubmitted(true)
      setFeedback('Merci ! Ton adresse e-mail a bien été enregistrée pour la bêta.')
      setEmail('')
      setConsent(false)
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? `${error.message} Vérifie ta connexion et réessaie.`
          : 'Une erreur est survenue. Vérifie ta connexion et réessaie.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section beta-section" id="beta" aria-labelledby="beta-title">
      <div className="section-inner beta-layout">
        <div className="beta-copy">
          <p className="eyebrow">La bêta ouvre bientôt</p>
          <h2 className="section-heading" id="beta-title">
            Ta prochaine belle rencontre commence <em>ici.</em>
          </h2>
          <p>
            Laisse-nous ton e-mail pour recevoir des nouvelles de Novelee et être
            prévenu·e de l’ouverture de la bêta.
          </p>
          <ul className="beta-points">
            <li><CheckIcon /> Une inscription en quelques secondes</li>
            <li><CheckIcon /> Pas de spam, tu peux te désinscrire à tout moment</li>
            <li><CheckIcon /> Tes données ne sont pas revendues</li>
          </ul>
        </div>
        <form className="beta-form" onSubmit={handleSubmit}>
          <h3>Rejoins la liste d’attente</h3>
          <p className="beta-form-intro">On te prévient dès que tu peux nous rejoindre.</p>
          <label className="field-label" htmlFor="beta-email">Ton adresse e-mail</label>
          <input
            className="email-input"
            id="beta-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="toi@exemple.fr"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setSubmitted(false)
            }}
            required
            aria-describedby="beta-privacy beta-feedback"
          />
          <label className="consent-check" htmlFor="beta-consent">
            <input
              id="beta-consent"
              name="consent"
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
            />
            <span>
              J’accepte que Novelee utilise mon e-mail pour m’informer du lancement de
              la bêta. Je pourrai retirer mon consentement à tout moment.{' '}
              <Link to="/confidentialite">Politique de confidentialité</Link>
            </span>
          </label>
          <button className="button button-primary beta-submit" type="submit" disabled={submitting}>
            {submitting ? 'Inscription en cours…' : 'Me tenir au courant'}
          </button>
          <p className="form-privacy" id="beta-privacy">
            Ton adresse est conservée jusqu’au lancement ou jusqu’au retrait de ton
            consentement. Envoie-nous un message pour exercer tes droits.
          </p>
          <p
            className="form-feedback"
            id="beta-feedback"
            role={submitted ? 'status' : 'alert'}
            aria-live="polite"
          >
            {feedback}
          </p>
        </form>
      </div>
    </section>
  )
}

export default BetaSignupSection
