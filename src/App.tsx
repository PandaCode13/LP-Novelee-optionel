import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CookieBanner from './components/layout/CookieBanner'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import AuthenticationPage from './features/auth/AuthenticationPage'
import AdminDashboardPage from './pages/admin/DashboardPage'
import AdminHistoryPage from './pages/admin/HistoryPage'
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage'
import AdminProfilePage from './pages/admin/ProfilePage'
import AdminSettingsPage from './pages/admin/SettingsPage'
import AdminUsersPage from './pages/admin/UsersPage'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import LogoutPage from './pages/LogoutPage'
import NotFoundPage from './pages/NotFoundPage'
import ReportPage from './pages/ReportPage'
import UserArchivesPage from './pages/user/ArchivesPage'
import UserAccueilPage from './pages/user/AccueilPage'
import UserConversationsPage from './pages/user/ConversationsPage'
import UserDashboardPage from './pages/user/DashboardPage'
import UserLibrariesPage from './pages/user/LibrariesPage'
import UserNotificationsPage from './pages/user/NotificationsPage'
import UserProfileHistoryPage from './pages/user/ProfileHistoryPage'
import UserProfilePage from './pages/user/ProfilePage'
import UserProfileSettingsPage from './pages/user/ProfileSettingsPage'
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
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/accueil" element={<UserAccueilPage />} />
        <Route path="/bibliotheques" element={<UserLibrariesPage />} />
        <Route path="/archives" element={<UserArchivesPage />} />
        <Route path="/conversations" element={<UserConversationsPage />} />
        <Route path="/notifications" element={<UserNotificationsPage />} />
        <Route path="/profil" element={<UserProfilePage />} />
        <Route path="/profil/parametres" element={<UserProfileSettingsPage />} />
        <Route path="/profil/historique" element={<UserProfileHistoryPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/utilisateurs" element={<AdminUsersPage />} />
        <Route path="/admin/historique" element={<AdminHistoryPage />} />
        <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
        <Route path="/admin/profil" element={<AdminProfilePage />} />
        <Route path="/admin/parametres" element={<AdminSettingsPage />} />
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
    </BrowserRouter>
  )
}

export default App
