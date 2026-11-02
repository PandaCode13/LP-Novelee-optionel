function AboutSection() {
  return (
    <section className="section section-soft" id="about" aria-labelledby="about-title">
      <div className="section-inner about-layout">
        <div className="about-note" aria-label="Notre conviction">
          <p>Un livre peut être une histoire. À plusieurs, il devient un lien.</p>
        </div>
        <div className="about-copy">
          <p className="eyebrow">À propos de Novelee</p>
          <h2 className="section-heading" id="about-title">
            On croit aux histoires qui <em>nous rapprochent.</em>
          </h2>
          <p>
            Novelee est né d’une idée simple : personne ne devrait garder pour soi
            l’émotion d’une lecture. Nous imaginons un espace chaleureux où chacun·e peut
            rencontrer des lecteurs compatibles, à son rythme et sans jugement.
          </p>
          <div className="about-values" aria-label="Nos valeurs">
            <span>Curiosité</span>
            <span>Bienveillance</span>
            <span>Liberté de lire</span>
            <span>Respect des spoilers</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
