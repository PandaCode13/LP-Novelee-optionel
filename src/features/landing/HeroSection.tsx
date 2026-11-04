import { Link } from 'react-router-dom'

const bookshelfHeights = [
  27, 21, 33, 24, 31, 26, 34, 20, 30, 25, 36, 22, 32, 27, 35, 23, 29, 21, 34, 26,
  31, 22, 35, 25, 30, 20, 34, 27, 32, 23, 36, 25, 30, 21, 33, 27, 35, 22, 31, 24,
  34, 20, 29, 26, 35, 23, 32, 27, 36, 21, 30, 25, 34, 22, 31, 26, 35, 20, 29, 24,
]

function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 id="hero-title">Le contact au cœur des mots.</h1>
          <p className="hero-description">
            Découvrez un nouvel aspect de la lecture et de son univers à travers Novelee
            et ses fonctionnalités pensées pour <a href="#about">vous</a>.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#problemes">
              Je découvre
            </a>
            <Link className="button button-secondary" to="/inscription">
              Je m’inscris
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-bookshelf" aria-hidden="true">
        {bookshelfHeights.map((height, index) => (
          <span
            key={`${height}-${index}`}
            style={{ height: `${height}px` }}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
