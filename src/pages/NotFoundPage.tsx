import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="not-found" id="main-content">
      <h1>Page introuvable</h1>
      <p>Cette page n’existe pas (ou plus). Les bonnes histoires, elles, sont par ici.</p>
      <Link className="button button-primary" to="/">Retour à l’accueil</Link>
    </main>
  )
}

export default NotFoundPage
