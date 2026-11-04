import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { clearCurrentUser, getCurrentUser } from '../../features/auth/authService'
import { navByRole, type NavItem } from '../../lib/navigation'

const navigation = [
  { label: 'Les problèmes', href: '/#problemes' },
  { label: 'Nos solutions', href: '/#solutions' },
  { label: 'À propos de nous', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

function readHeaderUser() {
  try {
    return getCurrentUser()
  } catch {
    return null
  }
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const user = readHeaderUser()

  function signOut() {
    clearCurrentUser()
    setMenuOpen(false)
    navigate('/connexion')
  }

  function renderItem(item: NavItem, key: string) {
    if (item.action === 'logout') {
      return (
        <button className="nav-action" key={key} type="button" onClick={signOut}>
          {item.label}
        </button>
      )
    }

    if (item.children?.length) {
      return (
        <div className="nav-profile" key={key}>
          <Link
            to={item.to}
            aria-current={location.pathname === item.to ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
          <details className="nav-dropdown">
            <summary aria-label={`Ouvrir le menu ${item.label}`}>⌄</summary>
            <div className="nav-dropdown-panel">
              {item.children.map((child) => renderItem(child, `${key}-${child.to}`))}
            </div>
          </details>
        </div>
      )
    }

    return (
      <Link
        key={key}
        to={item.to}
        aria-current={location.pathname === item.to ? 'page' : undefined}
        onClick={() => setMenuOpen(false)}
      >
        {item.label}
      </Link>
    )
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Novelee, accueil">
          <img className="brand-logo" src="/novelee-logo.png" alt="" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
        <div className={`header-menu${menuOpen ? ' is-open' : ''}`}>
          <nav className="main-nav" id="main-navigation" aria-label="Navigation principale">
            {user ? (
              navByRole[user.role].map((item) => renderItem(item, item.to))
            ) : (
              navigation.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))
            )}
          </nav>
          {!user && (
            <Link
              className="nav-join"
              to="/inscription"
              onClick={() => setMenuOpen(false)}
            >
              Je m’inscris
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
