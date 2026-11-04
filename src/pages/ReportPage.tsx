import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getCurrentUser } from '../features/auth/authService'

const contentTypes = [
  'Avis',
  'Commentaire',
  'Profil',
  'Message',
  'Liste de lecture',
  'Autre',
]

const reportReasons = [
  'Contenu injurieux ou haineux',
  'Harcèlement ou intimidation',
  'Contenu discriminatoire',
  'Spam ou contenu frauduleux',
  'Atteinte à la vie privée',
  'Atteinte aux droits d’autrui',
  'Autre',
]

function ReportPage() {
  const [searchParams] = useSearchParams()
  const currentUser = getCurrentUser()
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const attachment = formData.get('attachment')
    const attachmentName =
      attachment instanceof File && attachment.size > 0
        ? `Capture d’écran sélectionnée : ${attachment.name} (à joindre manuellement).`
        : 'Aucune pièce jointe.'

    const body = [
      `Type de contenu : ${formData.get('contentType')}`,
      `Lien vers le contenu : ${formData.get('contentUrl') || 'Non renseigné'}`,
      `Auteur : ${formData.get('author') || 'Non renseigné'}`,
      `Motif : ${formData.get('reason')}`,
      `Description : ${formData.get('description')}`,
      `Date ou période : ${formData.get('date') || 'Non renseignée'}`,
      `Signalant : ${formData.get('reporterName') || 'Non renseigné'}`,
      `Adresse e-mail : ${formData.get('email') || currentUser?.email || 'Non renseignée'}`,
      attachmentName,
      'Déclaration : les informations fournies sont exactes et le signalement est effectué de bonne foi.',
    ].join('\n')

    window.location.href = `mailto:support@team-novelee.fr?subject=${encodeURIComponent(
      'Signalement de contenu sur Novelee',
    )}&body=${encodeURIComponent(body)}`
    setMessage(
      'Votre application de messagerie s’est ouverte avec le signalement prérempli. Envoyez le message et ajoutez-y la capture d’écran si nécessaire.',
    )
  }

  return (
    <main className="legal-page" id="main-content">
      <div className="legal-inner">
        <p className="eyebrow">Novelee · Communauté</p>
        <h1>Signaler un contenu</h1>
        <p className="report-intro">
          Aidez-nous à maintenir un espace de lecture respectueux et sûr. Décrivez le
          problème rencontré. Votre signalement sera examiné par l’équipe Novelee.
        </p>

        <form className="report-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>1. Contenu concerné</legend>
            <label className="report-field" htmlFor="contentType">
              Type de contenu <span>(obligatoire)</span>
              <select id="contentType" name="contentType" required defaultValue="">
                <option value="" disabled>
                  Sélectionnez un type
                </option>
                {contentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label className="report-field" htmlFor="contentUrl">
              Lien vers le contenu
              <input
                id="contentUrl"
                name="contentUrl"
                type="url"
                defaultValue={searchParams.get('url') ?? ''}
                placeholder="https://"
              />
              <span className="report-hint">
                Obligatoire si le contenu est accessible par URL.
              </span>
            </label>
            <label className="report-field" htmlFor="author">
              Nom ou pseudonyme de l’auteur <span>(facultatif)</span>
              <input id="author" name="author" type="text" />
            </label>
          </fieldset>

          <fieldset>
            <legend>2. Motif du signalement</legend>
            <label className="report-field" htmlFor="reason">
              Pourquoi signalez-vous ce contenu ? <span>(obligatoire)</span>
              <select id="reason" name="reason" required defaultValue="">
                <option value="" disabled>
                  Sélectionnez un motif
                </option>
                {reportReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </label>
            <label className="report-field" htmlFor="description">
              Description du problème <span>(obligatoire)</span>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                placeholder="Expliquez pourquoi ce contenu vous semble problématique."
              />
            </label>
            <label className="report-field" htmlFor="date">
              Date ou période du problème <span>(facultatif)</span>
              <input id="date" name="date" type="date" />
            </label>
            <label className="report-field" htmlFor="attachment">
              Pièce jointe <span>(facultatif)</span>
              <input
                id="attachment"
                name="attachment"
                type="file"
                accept="image/*"
              />
              <span className="report-hint">
                N’ajoutez pas de données personnelles inutiles. Si vous joignez une
                capture d’écran, vous devrez l’ajouter au courriel avant de l’envoyer.
              </span>
            </label>
          </fieldset>

          <fieldset>
            <legend>3. Coordonnées du signalant</legend>
            <label className="report-field" htmlFor="reporterName">
              Nom ou pseudonyme <span>(facultatif)</span>
              <input id="reporterName" name="reporterName" type="text" />
            </label>
            <label className="report-field" htmlFor="email">
              Adresse e-mail {!currentUser && <span>(obligatoire)</span>}
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={currentUser?.email ?? ''}
                required={!currentUser}
              />
            </label>
            <p className="report-hint">
              Ces coordonnées servent uniquement à traiter le signalement et à vous
              contacter si des précisions sont nécessaires.
            </p>
          </fieldset>

          <fieldset>
            <legend>4. Déclaration</legend>
            <label className="report-consent">
              <input type="checkbox" name="goodFaith" required />
              <span>
                Je confirme que les informations fournies sont exactes et que je signale
                ce contenu de bonne foi. (obligatoire)
              </span>
            </label>
          </fieldset>

          <div className="report-submit">
            <h2>5. Envoi</h2>
            <button className="button button-primary" type="submit">
              Envoyer le signalement
            </button>
          </div>
          {message && (
            <p className="report-feedback" role="status">
              {message}
            </p>
          )}
        </form>

        <p className="legal-content">
          <Link to="/conditions-utilisation">Retour aux conditions d’utilisation</Link>
        </p>
      </div>
    </main>
  )
}

export default ReportPage
