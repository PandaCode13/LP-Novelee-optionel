import { useState } from 'react'

const CONSENT_STORAGE_KEY = 'novelee-cookie-consent'

export type CookieConsent = 'accepted' | 'refused'

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(() => {
    const storedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return storedConsent === 'accepted' || storedConsent === 'refused'
      ? storedConsent
      : null
  })

  function chooseConsent(choice: CookieConsent) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
    setConsent(choice)
  }

  return { consent, chooseConsent }
}
