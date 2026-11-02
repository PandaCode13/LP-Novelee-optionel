import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CookieBanner from './components/layout/CookieBanner'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import AuthenticationPage from './features/auth/AuthenticationPage'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">
        Aller au contenu
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/connexion" element={<AuthenticationPage mode="login" />} />
        <Route path="/inscription" element={<AuthenticationPage mode="register" />} />
        <Route
          path="/mot-de-passe-oublie"
          element={<AuthenticationPage mode="reset" />}
        />
        <Route path="/mentions-legales" element={<LegalPage document="legal" />} />
        <Route path="/confidentialite" element={<LegalPage document="privacy" />} />
        <Route path="/conditions-utilisation" element={<LegalPage document="terms" />} />
        <Route path="/cookies" element={<LegalPage document="cookies" />} />
        <Route path="/accessibilite" element={<LegalPage document="accessibility" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <CookieBanner />
    </BrowserRouter>
  )
}

export default App
