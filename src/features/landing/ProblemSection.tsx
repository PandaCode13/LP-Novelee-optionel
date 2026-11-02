import { problems } from './landingContent'

function ProblemSection() {
  return (
    <section className="section" id="problemes" aria-labelledby="problems-title">
      <div className="section-inner">
        <p className="eyebrow">On connaît ça</p>
        <h2 className="section-heading" id="problems-title">
          Tu termines un livre. <em>Et après ?</em>
        </h2>
        <p className="section-intro">
          Quand on aime lire, on a souvent envie d’en parler. Mais trouver les bonnes
          personnes et le bon endroit, c’est une autre histoire.
        </p>
        <div className="problem-grid">
          {problems.map((problem) => (
            <article className="problem-card" key={problem.title}>
              <span className="problem-icon" aria-hidden="true">{problem.icon}</span>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
