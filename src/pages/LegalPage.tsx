import { Link } from 'react-router-dom'
import { openCookiePreferences } from '../hooks/useCookieConsent'

type LegalDocument =
  | 'legal'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'data-protection'
  | 'accessibility'

const documentInfo: Record<LegalDocument, { title: string; updated: string }> = {
  legal: { title: 'Mentions légales', updated: 'Dernière mise à jour : [date]' },
  privacy: { title: 'Politique de confidentialité', updated: 'Dernière mise à jour : [date]' },
  terms: { title: 'Conditions générales d’utilisation (CGU)', updated: 'Dernière mise à jour : 04/11/2026' },
  cookies: { title: 'Politique relative aux cookies et traceurs', updated: 'Dernière mise à jour : [date]' },
  'data-protection': {
    title: 'Politique de gestion et de protection des données',
    updated: 'Dernière mise à jour : [date]',
  },
  accessibility: { title: 'Accessibilité', updated: 'Dernière mise à jour : [date]' },
}

function LegalPage({ document }: { document: LegalDocument }) {
  const info = documentInfo[document]

  return (
    <main className="legal-page" id="main-content">
      <div className="legal-inner">
        <p className="eyebrow">Novelee · Informations</p>
        <h1>{info.title}</h1>
        <p className="legal-updated">{info.updated}</p>
        {document !== 'terms' && (
          <div className="legal-notice" role="note">
            Cette page est une base de travail intégrée au site. Les informations entre
            crochets et les engagements doivent être vérifiés et complétés par l’équipe
            avant toute mise en ligne publique.
          </div>
        )}

        {document === 'legal' && <LegalNoticeContent />}
        {document === 'privacy' && <PrivacyContent />}
        {document === 'terms' && <TermsContent />}
        {document === 'cookies' && <CookiesContent />}
        {document === 'data-protection' && <DataProtectionContent />}
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
        Le site Novelee est édité par :
      </p>
      <ul>
        <li><strong>Nom de l'équipe: </strong> Novelee</li>
        <li><strong>Membres de l'équipe: </strong>Maryne, Othmane, Said, Esther, Carmen, Adrien, Davina</li>
      </ul>
      <h2>Hébergement</h2>
      <p>Le site est hébergé par :</p>
      <ul>
        <li><strong>Nom de l’hébergeur :</strong>Render & Vercel</li>
        <li><strong>Adresse :</strong>support@novelee.fr</li>
        <li><strong>Téléphone ou contact :</strong>+33 1 23 45 67 89</li>
      </ul>
      <h2>Propriété intellectuelle</h2>
      <p>
        Les éléments originaux de Novelee sont protégés par les droits de propriété
        intellectuelle applicables. Toute reproduction ou réutilisation non autorisée de
        ces éléments peut être interdite.
      </p>
      <p>
        Les marques, œuvres, couvertures et contenus appartenant à des tiers restent la
        propriété de leurs titulaires respectifs.
      </p>
      <h2>Contact</h2>
      <p>
        Pour toute question concernant le site : <strong>support@novelee.fr</strong>.
      </p>
    </div>
  )
}

function PrivacyContent() {
  return (
    <div className="legal-content">
      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données personnelles collectées via Novelee
        est :
      </p>
      <p>
        <strong>Novelee</strong>
        <br />
        Adresse : 40 rue Chemin vert, 75011 Paris, France
        <br />
        Contact : support@novelee.fr
      </p>
      <h2>2. Données personnelles traitées</h2>
      <p>
        Selon les fonctionnalités utilisées, Novelee peut traiter les catégories de
        données suivantes :
      </p>
      <ul>
        <li>
          <strong>Données de compte :</strong> nom ou pseudonyme, adresse e-mail,
          identifiant et données nécessaires à l’authentification.
        </li>
        <li>
          <strong>Données de profil :</strong> photo, biographie, préférences de lecture
          et informations ajoutées volontairement.
        </li>
        <li>
          <strong>Données d’activité :</strong> livres consultés, listes de lecture,
          avis, notes, commentaires et interactions.
        </li>
        <li>
          <strong>Données de communication :</strong> messages et signalements, si ces
          fonctionnalités sont disponibles.
        </li>
        <li>
          <strong>Données techniques :</strong> journaux de connexion, informations
          relatives au navigateur et au fonctionnement du service, dans la mesure
          nécessaire à la sécurité et au diagnostic.
        </li>
      </ul>
      <p>
        Novelee ne doit collecter que les données nécessaires aux finalités annoncées.
      </p>
      <h2>3. Finalités et bases légales</h2>
      <div className="privacy-table-wrap">
        <table className="privacy-table">
          <thead>
            <tr>
              <th scope="col">Finalité</th>
              <th scope="col">Base légale à confirmer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Création et gestion du compte</td>
              <td>Exécution du contrat</td>
            </tr>
            <tr>
              <td>Fonctionnement du profil et des fonctionnalités sociales</td>
              <td>Exécution du contrat</td>
            </tr>
            <tr>
              <td>Gestion des avis, listes et interactions</td>
              <td>Exécution du contrat</td>
            </tr>
            <tr>
              <td>Sécurité, prévention des abus et gestion des incidents</td>
              <td>Intérêt légitime</td>
            </tr>
            <tr>
              <td>Réponse aux demandes des utilisateurs</td>
              <td>Exécution du contrat ou intérêt légitime, selon la demande</td>
            </tr>
            <tr>
              <td>Envoi de communications facultatives</td>
              <td>Consentement, lorsque requis</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>4. Destinataires des données</h2>
      <p>
        Les données peuvent être accessibles aux personnes habilitées chargées de gérer
        et maintenir Novelee, ainsi qu’aux prestataires techniques nécessaires au
        fonctionnement du service, notamment <strong>Render & Vercel</strong>,{' '}
        <strong>PostgreSQL</strong> et{' '}
        <strong>Gmail</strong>, si ces prestataires sont
        utilisés.
      </p>
      <p>
        Ces prestataires ne peuvent traiter les données que conformément aux
        instructions applicables et aux obligations contractuelles.
      </p>
      <h2>5. Durées de conservation</h2>
      <p>
        Les données sont conservées pendant une durée limitée, proportionnée à leur
        finalité :
      </p>
      <ul>
        <li>
          données du compte : pendant la durée d’utilisation du compte, puis suppression
          ou anonymisation selon les obligations applicables ;
        </li>
        <li>
          contenus publiés : jusqu’à leur suppression par l’utilisateur ou à la
          fermeture du compte, sous réserve des nécessités de modération et des
          obligations légales ;
        </li>
        <li>
          journaux techniques et de sécurité : [durée à définir selon les besoins et
          obligations applicables] ;
        </li>
        <li>demandes adressées au support : [durée à définir].</li>
      </ul>
      <p>
        Les durées exactes doivent être fixées et documentées par l’éditeur de Novelee.
      </p>
      <h2>6. Droits des utilisateurs</h2>
      <p>
        Conformément à la réglementation applicable, les utilisateurs peuvent, selon les
        conditions prévues par celle-ci :
      </p>
      <ul>
        <li>demander l’accès à leurs données ;</li>
        <li>demander la rectification de données inexactes ;</li>
        <li>demander l’effacement de leurs données ;</li>
        <li>demander la limitation de certains traitements ;</li>
        <li>s’opposer à certains traitements ;</li>
        <li>demander la portabilité des données concernées ;</li>
        <li>
          retirer leur consentement lorsque le traitement repose sur celui-ci.
        </li>
      </ul>
      <p>
        Pour exercer ces droits : <strong>[adresse e-mail dédiée]</strong>. Une
        vérification raisonnable de l’identité pourra être demandée afin de protéger les
        données.
      </p>
      <p>
        Les utilisateurs peuvent également introduire une réclamation auprès de la
        CNIL :{' '}
        <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noreferrer">
          https://www.cnil.fr/fr/plaintes
        </a>
      </p>
      <h2>7. Sécurité</h2>
      <p>
        Novelee met en œuvre des mesures techniques et organisationnelles adaptées pour
        protéger les données contre l’accès non autorisé, la perte, l’altération ou la
        divulgation.
      </p>
      <p>
        Aucun système ne pouvant garantir une sécurité absolue, les utilisateurs sont
        invités à protéger leurs identifiants et à signaler toute activité suspecte.
      </p>
      <h2>8. Transferts hors de l’Espace économique européen</h2>
      <p>
        Si des prestataires traitent des données en dehors de l’Espace économique
        européen, Novelee devra préciser les pays concernés et les garanties prévues par
        la réglementation, notamment les décisions d’adéquation ou les clauses
        contractuelles types, selon le cas.
      </p>
      <h2>9. Modifications de la politique</h2>
      <p>
        La présente politique peut être mise à jour pour refléter les évolutions du
        service ou de la réglementation. La version en vigueur est publiée sur Novelee.
      </p>
    </div>
  )
}

function TermsContent() {
  return (
    <div className="legal-content">
      <h2>1. Présentation du service</h2>
      <p>
        Novelee est une plateforme numérique dédiée à la lecture et aux échanges autour
        des livres. Elle permet notamment aux utilisateurs de découvrir des ouvrages,
        de partager leurs avis, de gérer leurs listes de lecture et d’échanger avec
        d’autres lecteurs.
      </p>
      <p>
        Le service est édité par Said, dont les
        coordonnées figurent dans les mentions légales.
      </p>
      <h2>2. Objet et acceptation des CGU</h2>
      <p>
        Les présentes conditions générales d’utilisation définissent les règles d’accès
        et d’utilisation de Novelee.
      </p>
      <p>
        En créant un compte ou en utilisant les fonctionnalités de la plateforme,
        l’utilisateur reconnaît avoir lu et accepté les présentes CGU. Si l’utilisateur
        n’accepte pas ces conditions, il doit cesser d’utiliser le service.
      </p>
      <h2>3. Création et gestion du compte</h2>
      <p>
        Certaines fonctionnalités nécessitent la création d’un compte. L’utilisateur
        s’engage à fournir des informations exactes et à les maintenir à jour.
      </p>
      <p>
        L’utilisateur est responsable de la confidentialité de ses identifiants et des
        activités réalisées depuis son compte. En cas d’utilisation non autorisée ou de
        suspicion de compromission, il doit contacter support@team-novelee.fr.
      </p>
      <h2>4. Règles de bonne conduite</h2>
      <p>L’utilisateur s’engage à :</p>
      <ul>
        <li>respecter les autres membres et leurs opinions ;</li>
        <li>publier des contenus licites, pertinents et respectueux ;</li>
        <li>ne pas harceler, menacer, discriminer ou intimider d’autres utilisateurs ;</li>
        <li>ne pas publier de données personnelles concernant des tiers sans autorisation ;</li>
        <li>ne pas diffuser de contenus frauduleux, malveillants ou portant atteinte aux droits d’autrui ;</li>
        <li>ne pas tenter de perturber, contourner ou compromettre la sécurité de la plateforme.</li>
      </ul>
      <h2>5. Contenus publiés par les utilisateurs</h2>
      <p>
        Les utilisateurs peuvent, selon les fonctionnalités disponibles, publier des
        avis, commentaires, évaluations, listes ou messages.
      </p>
      <p>
        L’utilisateur demeure responsable des contenus qu’il publie. Il garantit
        disposer des droits nécessaires sur ces contenus et autoriser Novelee à les
        héberger et à les afficher dans le cadre du fonctionnement du service.
      </p>
      <p>
        Cette autorisation est non exclusive et limitée à la durée nécessaire à la
        fourniture du service, sauf obligation légale ou nécessité de conserver certains
        éléments.
      </p>
      <p>
        Novelee peut retirer un contenu manifestement illicite ou contraire aux
        présentes CGU, après examen et selon les procédures applicables.
      </p>
      <h2>6. Modération et signalement</h2>
      <p>
        Les utilisateurs peuvent signaler un contenu ou un comportement inapproprié au
        mail suivant{' '}
        <a href="mailto:support@team-novelee.fr">support@team-novelee.fr</a> ou compléter
        le <Link to="/signalement">formulaire de signalement</Link>.
      </p>
      <p>
        Novelee peut examiner les signalements, retirer des contenus, limiter certaines
        fonctionnalités ou suspendre un compte en cas de violation des CGU. Lorsque cela
        est approprié, l’utilisateur concerné sera informé de la mesure et de ses motifs.
      </p>
      <h2>7. Disponibilité et sécurité</h2>
      <p>
        Novelee s’efforce de maintenir le service accessible et sécurisé. Toutefois, des
        interruptions peuvent survenir pour des raisons de maintenance, de mise à jour,
        de panne ou d’événement indépendant de sa volonté.
      </p>
      <p>
        L’utilisateur s’engage à ne pas compromettre la sécurité ou le fonctionnement de
        la plateforme.
      </p>
      <h2>8. Propriété intellectuelle</h2>
      <p>
        Les éléments propres à Novelee — notamment son nom, son identité visuelle, son
        interface et ses éléments logiciels — sont protégés par les droits applicables.
      </p>
      <p>
        Les droits sur les livres, couvertures, extraits et autres œuvres mentionnés sur
        la plateforme appartiennent à leurs auteurs ou titulaires respectifs. Leur
        présence sur Novelee ne signifie pas qu’ils sont libres de réutilisation.
      </p>
      <h2>9. Suspension et suppression du compte</h2>
      <p>
        L’utilisateur peut demander la suppression de son compte selon les modalités
        prévues dans la politique de confidentialité.
      </p>
      <p>
        Novelee peut suspendre ou supprimer un compte en cas de violation grave ou
        répétée des CGU, sous réserve des obligations légales applicables.
      </p>
      <h2>10. Modification des CGU</h2>
      <p>
        Novelee peut modifier les présentes CGU pour tenir compte de l’évolution du
        service ou de la réglementation. La version applicable est celle publiée sur la
        plateforme à la date de consultation.
      </p>
      <p>
        En cas de modification importante, les utilisateurs pourront être informés par un
        moyen approprié.
      </p>
      <h2>11. Droit applicable et contact</h2>
      <p>
        Les présentes CGU sont soumises au droit français, sous réserve des dispositions
        impératives applicables aux consommateurs.
      </p>
      <p>Pour toute question concernant les CGU : [adresse de contact].</p>

    </div>
  )
}

function CookiesContent() {
  return (
    <div className="legal-content">
      <h2>1. Qu’est-ce qu’un cookie ?</h2>
      <p>
        Un cookie est un petit fichier ou identifiant enregistré sur votre terminal lors
        de la consultation d’un site. D’autres technologies peuvent également permettre
        de mémoriser des informations ou de suivre la navigation.
      </p>
      <h2>2. Traceurs utilisés par Novelee</h2>
      <p>
        Novelee peut utiliser des traceurs nécessaires au fonctionnement du service,
        par exemple pour maintenir une session sécurisée ou mémoriser un choix de
        confidentialité.
      </p>
      <p>
        Les traceurs non essentiels, tels que ceux destinés à la mesure d’audience ou à
        la publicité, ne doivent être activés qu’après obtention du consentement lorsque
        celui-ci est requis.
      </p>
      <p><strong>Inventaire des traceurs actuellement utilisés :</strong></p>
      <div className="privacy-table-wrap">
        <table className="privacy-table">
          <thead>
            <tr>
              <th scope="col">Nom du traceur</th>
              <th scope="col">Finalité</th>
              <th scope="col">Durée</th>
              <th scope="col">Catégorie</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>novelee-cookie-consent (stockage local du navigateur)</td>
              <td>Mémoriser le choix de consentement de l’utilisateur</td>
              <td>Jusqu’à modification du choix ou effacement du stockage du navigateur</td>
              <td>Nécessaire au respect du choix de confidentialité</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        À la date de cette politique, aucun traceur non essentiel de mesure d’audience
        ou de publicité n’est configuré dans l’application.
      </p>
      <h2>3. Choix de l’utilisateur</h2>
      <p>Lorsque des traceurs soumis au consentement sont utilisés, Novelee permet à l’utilisateur de :</p>
      <ul>
        <li>accepter les traceurs concernés ;</li>
        <li>les refuser aussi facilement que les accepter ;</li>
        <li>personnaliser ses choix par catégorie, si cette option est proposée ;</li>
        <li>modifier ou retirer son consentement ultérieurement.</li>
      </ul>
      <p>Les traceurs non essentiels ne sont pas déposés avant le choix de l’utilisateur.</p>
      <h2>4. Gestion des préférences</h2>
      <p>
        Vous pouvez modifier votre choix à tout moment en utilisant le bouton
        « Gérer mes cookies » ci-dessous.
      </p>
      <button className="button button-secondary" type="button" onClick={openCookiePreferences}>
        Gérer mes cookies
      </button>
      <p>
        Les paramètres du navigateur peuvent également permettre de gérer certains
        cookies, mais leur blocage peut affecter le fonctionnement de certaines
        fonctionnalités.
      </p>
      <h2>5. Contact</h2>
      <p>Pour toute question relative aux cookies : <strong>[adresse de contact]</strong>.</p>
    </div>
  )
}

function DataProtectionContent() {
  return (
    <div className="legal-content">
      <p>
        Cette politique présente les principes appliqués par Novelee pour gérer,
        protéger et sécuriser les données traitées dans le cadre du service. Elle
        complète la politique de confidentialité.
      </p>
      <h2>1. Principes de gestion</h2>
      <p>Novelee s’engage à appliquer les principes suivants :</p>
      <ul>
        <li><strong>Minimisation :</strong> collecter uniquement les données nécessaires.</li>
        <li><strong>Finalité :</strong> utiliser les données pour des objectifs définis et légitimes.</li>
        <li><strong>Exactitude :</strong> permettre la correction des informations inexactes.</li>
        <li><strong>Limitation de conservation :</strong> ne pas conserver les données au-delà de la durée nécessaire.</li>
        <li><strong>Confidentialité et sécurité :</strong> limiter l’accès aux personnes autorisées et protéger les systèmes.</li>
        <li><strong>Transparence :</strong> informer les utilisateurs de manière compréhensible.</li>
      </ul>
      <h2>2. Accès et protection</h2>
      <p>L’accès aux données doit être limité selon les rôles et les besoins. Les mesures de protection peuvent inclure :</p>
      <ul>
        <li>une authentification sécurisée ;</li>
        <li>des contrôles d’autorisation côté serveur ;</li>
        <li>le chiffrement des communications ;</li>
        <li>la protection des mots de passe par une méthode de hachage adaptée ;</li>
        <li>la journalisation des événements de sécurité pertinents ;</li>
        <li>des mises à jour régulières et des sauvegardes sécurisées.</li>
      </ul>
      <p>Les mesures effectivement mises en place doivent être documentées par l’équipe technique.</p>
      <h2>3. Sauvegarde et suppression</h2>
      <p>
        Les sauvegardes sont réalisées selon <strong>[fréquence et méthode à préciser]</strong>{' '}
        et conservées pendant <strong>[durée à préciser]</strong>.
      </p>
      <p>
        Lorsqu’un utilisateur demande la suppression de son compte, les données
        concernées sont supprimées ou anonymisées dans les systèmes actifs selon la
        procédure définie. Les copies présentes dans les sauvegardes sont éliminées
        selon le cycle de rétention applicable, sauf obligation légale de conservation.
      </p>
      <h2>4. Incidents de sécurité</h2>
      <p>
        Tout incident susceptible d’affecter la confidentialité, l’intégrité ou la
        disponibilité des données doit être signalé à l’équipe responsable et traité
        selon une procédure documentée.
      </p>
      <p>
        Lorsqu’une violation de données personnelles présente un risque pour les
        personnes, Novelee applique les obligations de notification à l’autorité de
        contrôle et, lorsque nécessaire, d’information des personnes concernées.
      </p>
      <h2>5. Intelligence artificielle</h2>
      <p>
        Si Novelee utilise des fonctionnalités d’intelligence artificielle, leur
        finalité, leur fournisseur, les données utilisées et les mesures de
        transparence applicables doivent être documentés.
      </p>
      <p>
        Lorsque la réglementation l’exige, l’utilisateur est informé qu’il interagit
        avec un système d’IA. Les données personnelles ne doivent pas être transmises à
        un service d’IA sans base légale, information et garanties appropriées.
      </p>
      <h2>6. Contact</h2>
      <p>Pour toute question relative à la gestion ou à la protection des données : <strong>[adresse de contact]</strong>.</p>
    </div>
  )
}

function AccessibilityContent() {
  return (
    <div className="legal-content">
      <h2>Engagement en faveur de l’accessibilité</h2>
      <p>
        Novelee souhaite permettre à chacun d’accéder à ses contenus et fonctionnalités,
        quels que soient ses besoins ou sa situation. L’équipe s’engage à améliorer
        progressivement l’accessibilité de la plateforme afin de faciliter son
        utilisation par les personnes en situation de handicap.
      </p>
      <h2>État de conformité</h2>
      <p>
        <strong>
          État de conformité : [non évalué / non conforme / partiellement conforme /
          conforme]
        </strong>
      </p>
      <p>
        L’accessibilité de Novelee doit être évaluée au regard du Référentiel général
        d’amélioration de l’accessibilité (RGAA), dans sa version applicable. L’état de
        conformité sera renseigné à l’issue d’une évaluation effective.
      </p>
      <h2>Fonctionnalités et critères vérifiés</h2>
      <p>L’évaluation de l’accessibilité porte notamment sur :</p>
      <ul>
        <li>
          <strong>Navigation au clavier :</strong> accès aux liens, boutons et formulaires
          sans souris, avec un indicateur de focus visible.
        </li>
        <li>
          <strong>Structure des pages :</strong> titres hiérarchisés, zones de navigation
          identifiables et HTML sémantique.
        </li>
        <li>
          <strong>Formulaires :</strong> champs associés à des libellés explicites,
          instructions compréhensibles et messages d’erreur accessibles.
        </li>
        <li>
          <strong>Contrastes et lisibilité :</strong> couleurs suffisamment contrastées,
          textes lisibles et possibilité de zoomer.
        </li>
        <li>
          <strong>Images et médias :</strong> textes alternatifs pertinents pour les
          images informatives et alternatives adaptées aux contenus multimédias.
        </li>
        <li>
          <strong>Adaptation aux écrans :</strong> contenu utilisable sur ordinateur,
          tablette et mobile, sans perte d’information ou de fonctionnalité.
        </li>
      </ul>
      <p>
        Les résultats des tests et les éventuelles non-conformités seront consignés dans
        un plan d’amélioration.
      </p>
      <h2>Contenus ou fonctionnalités non accessibles</h2>
      <p>
        Les difficultés d’accessibilité identifiées à ce jour sont les suivantes :{' '}
        <strong>[à compléter après évaluation]</strong>.
      </p>
      <p>
        Pour chaque difficulté, Novelee précisera, dans la mesure du possible, la
        fonctionnalité concernée et les mesures correctives envisagées.
      </p>
      <h2>Signaler une difficulté d’accessibilité</h2>
      <p>
        Si vous rencontrez un problème pour accéder à un contenu ou utiliser une
        fonctionnalité de Novelee, vous pouvez nous contacter :
      </p>
      <p>
        <strong>E-mail : [adresse de contact]</strong>
      </p>
      <p>
        Merci de préciser la page concernée, la difficulté rencontrée et, si possible,
        la technologie d’assistance utilisée. Nous étudierons votre demande et
        chercherons à vous proposer une réponse ou une alternative adaptée.
      </p>
      <h2>Évaluation et amélioration continue</h2>
      <ul>
        <li>
          <strong>Date de la dernière évaluation :</strong> [date ou « non réalisée »]
        </li>
        <li>
          <strong>Référentiel utilisé :</strong> [RGAA et version]
        </li>
        <li>
          <strong>Pages évaluées :</strong> [liste des pages]
        </li>
        <li>
          <strong>Méthode et outils de test :</strong> [à compléter]
        </li>
        <li>
          <strong>Plan d’amélioration :</strong> [lien, si disponible]
        </li>
      </ul>
      <p>
        Novelee s’engage à réexaminer régulièrement l’accessibilité de la plateforme et
        à prendre en compte les retours des utilisateurs.
      </p>
    </div>
  )
}

export default LegalPage
