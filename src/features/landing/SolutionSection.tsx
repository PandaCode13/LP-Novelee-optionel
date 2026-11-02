import { solutions } from './landingContent'

function SolutionSection() {
  return (
    <section className="section section-soft" id="solutions" aria-labelledby="solutions-title">
      <div className="section-inner solution-layout">
        <div className="solution-copy">
          <p className="eyebrow">La lecture en mieux</p>
          <h2 className="section-heading" id="solutions-title">
            Moins de scroll. <em>Plus de déclics.</em>
          </h2>
          <p>
            Novelee crée des liens à partir de ce que tu lis vraiment. Pas besoin d’être
            expert·e, ni de savoir quoi dire : commence par un livre que tu as aimé.
          </p>
        </div>
        <div className="solution-list">
          {solutions.map((solution) => (
            <article className="solution-card" key={solution.title}>
              <span className="problem-icon" aria-hidden="true">{solution.icon}</span>
              <div>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
