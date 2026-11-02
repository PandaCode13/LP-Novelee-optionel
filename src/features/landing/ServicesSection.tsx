import { services } from './landingContent'

function ServicesSection() {
  return (
    <section className="section services-section" id="services" aria-labelledby="services-title">
      <div className="section-inner">
        <p className="eyebrow">Tout part d’une lecture</p>
        <h2 className="section-heading" id="services-title">
          Une place pour chaque <em>envie de lire.</em>
        </h2>
        <p className="section-intro">
          De la prochaine recommandation à la discussion qui dure, tout ton univers de
          lecteur se retrouve au même endroit.
        </p>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span className="service-icon" aria-hidden="true">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {service.ai && <span className="ai-label">Assistant IA, toujours à ton service</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
