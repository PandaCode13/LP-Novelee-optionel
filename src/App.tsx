import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BackToTop from './components/layout/BackToTop'
import CookieBanner from './components/layout/CookieBanner'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import AuthenticationPage from './features/auth/AuthenticationPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import LogoutPage from './pages/LogoutPage'
import NotFoundPage from './pages/NotFoundPage'
import ReportPage from './pages/ReportPage'
import RoleAreaPage from './pages/RoleAreaPage'
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
        <Route path="/dashboard" element={<DashboardPage requiredRole="user" />} />
        <Route path="/accueil" element={<DashboardPage requiredRole="user" />} />
        <Route path="/bibliotheques" element={<RoleAreaPage requiredRole="user" />} />
        <Route path="/archives" element={<RoleAreaPage requiredRole="user" />} />
        <Route path="/profil" element={<RoleAreaPage requiredRole="user" />} />
        <Route path="/profil/parametres" element={<RoleAreaPage requiredRole="user" />} />
        <Route path="/profil/historique" element={<RoleAreaPage requiredRole="user" />} />
        <Route path="/admin/dashboard" element={<DashboardPage requiredRole="admin" />} />
        <Route path="/admin/utilisateurs" element={<RoleAreaPage requiredRole="admin" />} />
        <Route path="/admin/historique" element={<RoleAreaPage requiredRole="admin" />} />
        <Route path="/admin/profil" element={<RoleAreaPage requiredRole="admin" />} />
        <Route path="/admin/parametres" element={<RoleAreaPage requiredRole="admin" />} />
        <Route path="/deconnexion" element={<LogoutPage />} />
        <Route
          path="/mot-de-passe-oublie"
          element={<AuthenticationPage mode="reset" />}
        />
        <Route path="/mentions-legales" element={<LegalPage document="legal" />} />
        <Route path="/confidentialite" element={<LegalPage document="privacy" />} />
        <Route path="/conditions-utilisation" element={<LegalPage document="terms" />} />
        <Route path="/signalement" element={<ReportPage />} />
        <Route path="/cookies" element={<LegalPage document="cookies" />} />
        <Route
          path="/gestion-protection-donnees"
          element={<LegalPage document="data-protection" />}
        />
        <Route path="/accessibilite" element={<LegalPage document="accessibility" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <CookieBanner />
      <BackToTop />
    </BrowserRouter>
  )
}

export default App
