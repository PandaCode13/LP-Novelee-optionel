import { Link } from 'react-router-dom'

type LegalDocument = 'legal' | 'privacy' | 'terms' | 'cookies' | 'accessibility'

const documentInfo: Record<LegalDocument, { title: string; updated: string }> = {
  legal: { title: 'Mentions légales', updated: 'Informations à compléter avant publication' },
  privacy: { title: 'Politique de confidentialité', updated: 'Informations à compléter avant publication' },
  terms: { title: 'Conditions d’utilisation', updated: 'Informations à compléter avant publication' },
  cookies: { title: 'Politique cookies', updated: 'Informations à compléter avant publication' },
  accessibility: { title: 'Déclaration d’accessibilité', updated: 'État de conformité à auditer avant publication' },
}

function LegalPage({ document }: { document: LegalDocument }) {
  const info = documentInfo[document]

  return (
    <main className="legal-page" id="main-content">
      <div className="legal-inner">
        <p className="eyebrow">Novelee · Informations</p>
        <h1>{info.title}</h1>
        <p className="legal-updated">{info.updated}</p>
        <div className="legal-notice" role="note">
          Cette page est une base de travail intégrée au site. Les informations entre
          crochets et les engagements doivent être vérifiés et complétés par l’équipe
          avant toute mise en ligne publique.
        </div>

        {document === 'legal' && <LegalNoticeContent />}
        {document === 'privacy' && <PrivacyContent />}
        {document === 'terms' && <TermsContent />}
        {document === 'cookies' && <CookiesContent />}
        {document === 'accessibility' && <AccessibilityContent />}

        <p className="legal-content">
          <Link to="/">← Retour à l’accueil</Link>
        </p>
      </div>
    </main>
  )
}

function LegalNoticeContent() {
  return (
    <div className="legal-content">
      <h2>Éditeur du site</h2>
      <p>
        Novelee — [dénomination sociale et forme juridique à compléter], [adresse du
        siège à compléter], immatriculée sous le numéro [SIREN à compléter].
      </p>
      <p>Directeur ou directrice de la publication : [nom à compléter].</p>
      <h2>Hébergement</h2>
      <p>[Nom, adresse et coordonnées de l’hébergeur à compléter.]</p>
      <h2>Nous contacter</h2>
      <p>[Adresse de contact officielle à compléter.]</p>
    </div>
  )
}

function PrivacyContent() {
  return (
    <div className="legal-content">
      <h2>Responsable du traitement</h2>
      <p>[Identité et coordonnées du responsable du traitement à compléter.]</p>
      <h2>Inscription à la bêta</h2>
      <p>
        Si tu t’inscris, ton adresse e-mail est utilisée, avec ton consentement, pour
        t’informer de l’ouverture de la bêta. Elle est conservée jusqu’au lancement du
        service ou jusqu’au retrait de ton consentement, puis supprimée ou conservée
        uniquement si une obligation légale l’exige.
      </p>
      <h2>Tes droits</h2>
      <p>
        Tu peux demander l’accès, la rectification, l’effacement, la limitation du
        traitement ou retirer ton consentement en écrivant à [adresse de contact à
        compléter]. Tu peux également adresser une réclamation à la CNIL.
      </p>
      <h2>Sous-traitants et transferts</h2>
      <p>
        [Lister les prestataires d’hébergement, d’e-mailing et d’audience, leur rôle,
        leur localisation et les éventuels transferts hors de l’Union européenne.]
      </p>
    </div>
  )
}

function TermsContent() {
  return (
    <div className="legal-content">
      <h2>Objet du service</h2>
      <p>
        Novelee est un projet de communauté littéraire destiné à faciliter les
        recommandations et les échanges entre lecteurs. Les fonctionnalités décrites
        sur cette page sont susceptibles d’évoluer avant l’ouverture du service.
      </p>
      <h2>Règles de la communauté</h2>
      <p>
        Les échanges doivent rester respectueux. Les membres sont invités à signaler
        les contenus inappropriés et à respecter les avertissements de spoilers.
      </p>
      <h2>Conditions complètes</h2>
      <p>
        [Compléter avec l’identité de l’éditeur, les conditions d’accès, les règles de
        modération, les responsabilités et les modalités de résiliation avant
        l’ouverture du service.]
      </p>
    </div>
  )
}

function CookiesContent() {
  return (
    <div className="legal-content">
      <h2>Notre choix par défaut</h2>
      <p>
        Aucun traceur non essentiel n’est activé par défaut sur cette landing page. Le
        choix « Accepter » ou « Refuser » est conservé dans le stockage local du
        navigateur pour mémoriser ta préférence.
      </p>
      <h2>Mesure d’audience</h2>
      <p>
        [Si un outil de mesure d’audience est ajouté, préciser son nom, les données
        collectées, sa durée de conservation et le mécanisme de consentement avant de
        l’activer.]
      </p>
    </div>
  )
}

function AccessibilityContent() {
  return (
    <div className="legal-content">
      <h2>Notre engagement</h2>
      <p>
        Nous souhaitons rendre Novelee accessible au plus grand nombre et travaillons
        à respecter les critères WCAG 2.2 niveau AA.
      </p>
      <h2>État de conformité</h2>
      <p>
        Cette déclaration est provisoire : aucun audit complet n’a encore été réalisé.
        Le niveau de conformité et les éventuelles dérogations seront publiés après
        évaluation.
      </p>
      <h2>Signaler une difficulté</h2>
      <p>
        Pour nous signaler un problème d’accessibilité, contacte l’équipe à [adresse de
        contact à compléter].
      </p>
    </div>
  )
}

export default LegalPage
