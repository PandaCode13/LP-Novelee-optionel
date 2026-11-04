export const siteConfig = {
  mvpUrl: import.meta.env.VITE_MVP_URL || '#beta',
  betaApiUrl: import.meta.env.VITE_BETA_API_URL || '',
  authApiUrl: import.meta.env.VITE_AUTH_API_URL || '',
  authDemoMode: import.meta.env.VITE_AUTH_DEMO_MODE === 'true',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || '',
}
