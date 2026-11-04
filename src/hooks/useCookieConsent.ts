import { useState } from 'react'
import { useEffect } from 'react'

const CONSENT_STORAGE_KEY = 'novelee-cookie-consent'
const OPEN_COOKIE_PREFERENCES_EVENT = 'novelee:open-cookie-preferences'

export type CookieConsent = 'accepted' | 'refused'

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT))
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(() => {
    const storedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return storedConsent === 'accepted' || storedConsent === 'refused'
      ? storedConsent
      : null
  })

  useEffect(() => {
    function reopenPreferences() {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY)
      setConsent(null)
    }

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, reopenPreferences)
    return () =>
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, reopenPreferences)
  }, [])

  function chooseConsent(choice: CookieConsent) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
    setConsent(choice)
  }

  return { consent, chooseConsent }
}
