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
import Footer from './components/footer/Footer';
import Header from './components/Header/Header';
import ConfirmEmailPage from './auth/ConfirmEmailPage';
import ResetPasswordPage from './auth/ResetPasswordPage';


function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>





        <Route path="/" element={<HomePage />} />

        <Route path="/auth" element={<div className="auth-layout"><Outlet /></div>}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="confirme-email" element={<ConfirmEmailPage />} />
        </Route>

        <Route path="/client" element={<div className="auth-layout"><Header /><Outlet /> <Footer /></div>}>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="messages/:conversationId" element={<ConversationPage />} />
          <Route path="s" element={<ClientAddJob />} />
        </Route>


        <Route path="artisan" element={<div className="auth-layout"><Outlet /></div>}>
          <Route path="a" element={<ArtisanAddService />} />
          <Route path="z" element={<ClientAddJob />} />
          <Route path="e" element={<ClientAddJob />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path='reports' element={<ReportsManagement />} />
          <Route path='reviews' element={<ReviewsManagement />} />
          <Route path='artisan-requests' element={<ArtisanRequests />} />
          <Route path='services' element={<ServicesManagement />} />
          <Route path='accounts' element={<AccountsManagement />} />
          <Route path='jobs' element={<JobsManagement />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />


      </Routes>

    </>
  );
}

export default App;