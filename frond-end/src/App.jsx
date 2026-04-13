import { Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import HomePage from './client/Home';
import SettingsPage from './client/SettingsPage';
import MessagesPage from './chat/MessagesPage';
import ConversationPage from './chat/ConversationPage';
import AdminLayout from './components/header/AdminLayout';
import DashboardHome from './admin/DashboardHome';
import ReportsManagement from './admin/ReportsManagement';
import ReviewsManagement from './admin/ReviewsManagement';
import ArtisanRequests from './admin/ArtisanRequests';
import AccountsManagement from './admin/AccountsManagement';
import ServicesManagement from './admin/ServicesManagement';
import JobsManagement from './admin/JobsManagement';
import ClientAddJob from './client/ClientAddJob';
import ArtisanAddService from './artisan/ArtisanAddService';
import NotFoundPage from './errors/NotFoundPage';
import Header from './components/Header/Header';
import ConfirmEmailPage from './auth/ConfirmEmailPage';
import ResetPasswordPage from './auth/ResetPasswordPage';

import ArtisanPortfolioPage from './artisan/ArtisanPortfolioPage';
import ClientListOffres from './client/ClientListOffres';
import ArtisanOffreDetail from './artisan/ArtisanOffreDetail';
import ArtisanOffres from './artisan/ArtisanOffres';
import ClientOffreDetail from './client/ClientOffreDetail';
import ClientFavoris from './client/ClientFavoris';
import ManageCategories from './admin/ManageCategories ';
import Notifications from './chat/Notifications';
import Services from './client/Services';
import ServiceDetail from './client/ServiceDetail';
import ProtectedRoute from './errors/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import DashboardArtisanPage from './artisan/DashboardArtisanPage';

function App() {



  return (
    <>
      {/* <Header /> */}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: '11px',
            borderRadius: '0px',
          },
          duration: 5000,
          success: {
            style: {
              background: '#D35400',
              color: 'white',
              fontWeight: 'bold',
            },
          },
          info: {
            style: {
              background: '#1B4F72',
              color: 'white',
              fontWeight: 'bold',
            },
          },

          error: {
            style: {
              background: '#FEF2F2',
              color: '#DC2626',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<div><Header /><Outlet /></div>}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="artisans/:id" element={<ArtisanPortfolioPage />} />

          <Route element={<ProtectedRoute roles={['client', 'artisan']} />}>
            <Route path="parametres" element={<SettingsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="messages/:conversation_id" element={<ConversationPage />} />
            <Route path="notifications" element={<Notifications />} />

            <Route element={<ProtectedRoute roles={['client']} />}>
              <Route path="nouvelle-offre" element={<ClientAddJob />} />
              <Route path="mes-offres" element={<ClientListOffres />} />
              <Route path="mes-offres/:id" element={<ClientOffreDetail />} />
              <Route path="favorites" element={<ClientFavoris />} />
              
            </Route>

            <Route element={<ProtectedRoute roles={['artisan']} />}>
              <Route path="nouvelle-service" element={<ArtisanAddService />} />
              <Route path="offres" element={<ArtisanOffres />} />
              <Route path="offres/:id" element={<ArtisanOffreDetail />} />
              {/* dashboard */}
              <Route path="dashboard" element={<DashboardArtisanPage />} />
            </Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute roles={['guest']} />}>
          <Route path="/auth" element={<div className="auth-layout"><Outlet /></div>}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="confirme-email" element={<ConfirmEmailPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path='reports' element={<ReportsManagement />} />
            <Route path='reviews' element={<ReviewsManagement />} />
            <Route path='artisan-requests' element={<ArtisanRequests />} />
            <Route path='services' element={<ServicesManagement />} />
            <Route path='accounts' element={<AccountsManagement />} />
            <Route path='jobs' element={<JobsManagement />} />
            <Route path='categories' element={<ManageCategories />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </>
  );
}

export default App;