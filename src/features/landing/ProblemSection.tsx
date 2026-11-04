import { problems } from './landingContent'

function ProblemSection() {
  return (
    <section className="section problems-section" id="problemes" aria-labelledby="problems-title">
      <div className="section-inner">
        <h2 className="section-heading" id="problems-title">
          « Les problèmes »
        </h2>
        <p className="section-intro">
          Découvrez un nouvel aspect de la lecture et de son univers à travers Novelee
          et ses fonctionnalités pensées pour vous.
        </p>
        <div className="problem-grid">
          {problems.map((problem) => (
            <article className="problem-card" key={problem.title}>
              <h3>{problem.title}</h3>
              {problem.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
