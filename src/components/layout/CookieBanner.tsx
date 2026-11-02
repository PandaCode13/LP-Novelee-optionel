import { Link } from 'react-router-dom'
import { useCookieConsent } from '../../hooks/useCookieConsent'

function CookieBanner() {
  const { consent, chooseConsent } = useCookieConsent()

  if (consent) return null

  return (
    <aside className="cookie-banner" aria-label="Choix des cookies">
      <div className="cookie-copy">
        <strong>Tu gardes le contrôle.</strong>
        <p>
          Nous n’utilisons aucun traceur non essentiel sans ton accord.{' '}
          <Link to="/cookies">En savoir plus</Link>
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => chooseConsent('refused')}>
          Refuser
        </button>
        <button type="button" onClick={() => chooseConsent('accepted')}>
          Accepter
        </button>
      </div>
    </aside>
  )
}

export default CookieBanner
