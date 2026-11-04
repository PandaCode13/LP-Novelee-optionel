import { Link } from 'react-router-dom'
import { siteConfig } from '../../lib/siteConfig'

const legalLinks = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Confidentialité', to: '/confidentialite' },
  { label: 'Conditions d’utilisation', to: '/conditions-utilisation' },
  { label: 'Cookies', to: '/cookies' },
  { label: 'Gestion des données', to: '/gestion-protection-donnees' },
  { label: 'Accessibilité', to: '/accessibilite' },
]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="brand" to="/" aria-label="Novelee, accueil">
              <span aria-hidden="true">✳</span>
              <span>Novelee</span>
            </Link>
            <p>Les belles histoires se vivent aussi à plusieurs.</p>
          </div>
          <nav className="footer-links" aria-label="Informations et pages légales">
            {legalLinks.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Novelee. Fait pour les amoureux des livres.</span>
          {siteConfig.contactEmail ? (
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          ) : (
            <a href="/#contact">Nous contacter</a>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
