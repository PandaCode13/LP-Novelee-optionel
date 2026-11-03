import { services } from './landingContent'
import CommunityFeatureCard from './CommunityFeatureCard'
import './ServicesSection.css'

function ServicesSection() {
  return (
    <section className="section community-section" id="services" aria-labelledby="services-title">
      <div className="section-inner">
        <p className="eyebrow community-eyebrow">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 4.5c2.6-.8 4.9-.3 7 1.3v10c-2.1-1.6-4.4-2.1-7-1.3v-10Z" />
            <path d="M17 4.5c-2.6-.8-4.9-.3-7 1.3v10c2.1-1.6 4.4-2.1 7-1.3v-10Z" />
          </svg>
          Une communauté qui lit avec vous
        </p>
        <h2 className="section-heading" id="services-title">
          Les histoires se vivent <em>mieux ensemble.</em>
        </h2>
        <p className="section-intro">
          Rejoignez une communauté passionnée de lecture, partagez vos découvertes et vivez
          votre amour des livres autrement.
        </p>
        <div className="service-grid">
          {services.map((service) => <CommunityFeatureCard key={service.title} service={service} />)}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
