import { siteConfig } from '../../lib/siteConfig'

function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-inner">
        <p className="eyebrow">On se parle ?</p>
        <h2 id="contact-title">Une question, une idée, une histoire à partager ?</h2>
        <p>
          {siteConfig.contactEmail
            ? 'Écris-nous, on sera ravi·es de te lire.'
            : 'Rejoins la liste bêta et sois parmi les premiers à découvrir Novelee.'}
        </p>
        {siteConfig.contactEmail ? (
          <a className="button" href={`mailto:${siteConfig.contactEmail}`}>
            Écrire à l’équipe
          </a>
        ) : (
          <a className="button" href="#beta">Rejoindre la bêta</a>
        )}
      </div>
    </section>
  )
}

export default ContactSection
