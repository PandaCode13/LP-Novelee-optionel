import { ArrowIcon, CheckIcon } from './icons'
import { siteConfig } from '../../lib/siteConfig'

function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Le club de lecture qui te ressemble</p>
          <h1 id="hero-title">
            Les livres sont encore meilleurs <em>à plusieurs.</em>
          </h1>
          <p className="hero-description">
            Trouve les lecteurs qui ont aimé les mêmes histoires que toi. Échange, partage
            tes découvertes et fais de chaque lecture une rencontre.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={siteConfig.mvpUrl}>
              Créer un compte <ArrowIcon />
            </a>
            <a className="button button-secondary" href="#services">
              Découvrir nos services
            </a>
          </div>
          <p className="hero-note">
            <CheckIcon />
            Une communauté bienveillante, sans pression et sans spoilers.
          </p>
        </div>
        <div className="hero-art" role="img" aria-label="Des livres réunissent des lecteurs aux goûts proches">
          <div className="art-orbit" />
          <span className="floating-sparkle sparkle-one" aria-hidden="true">✳</span>
          <span className="floating-sparkle sparkle-two" aria-hidden="true">✦</span>
          <div className="book-stack" aria-hidden="true">
            <div className="book-cover cover-three">
              <span className="cover-stars">✧ ✧</span>
              <span className="cover-title">La forêt des possibles</span>
              <span className="cover-subtitle">Une histoire à partager</span>
            </div>
            <div className="book-cover cover-two">
              <span className="cover-stars">☼</span>
              <span className="cover-title">Nos jours de papier</span>
              <span className="cover-subtitle">Le roman d’une rencontre</span>
            </div>
            <div className="book-cover cover-one">
              <span className="cover-stars">✧ ✧ ✧</span>
              <span className="cover-title">Les heures dorées</span>
              <span className="cover-subtitle">Un voyage au fil des pages</span>
            </div>
          </div>
          <div className="match-card" aria-hidden="true">
            <div className="avatar-stack">
              <span className="avatar">☺</span>
              <span className="avatar">✿</span>
            </div>
            <div className="match-copy">
              <strong>Vous avez les mêmes goûts !</strong>
              <span>3 lectures en commun</span>
            </div>
          </div>
          <div className="quote-card" aria-hidden="true">
            <span>“</span>
            <div>Enfin quelqu’un avec qui parler de cette fin !</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
