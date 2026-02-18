import { Routes, Route } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import HomePage from './client/Home';
import SettingsPage from './client/SettingsPage';
import MessagesPage from './chat/MessagesPage';
import ConversationPage from './chat/ConversationPage';
import ArtisanPortfolioPage from './artisan/ArtisanPortfolioPage';
import AdminLayout from './components/header/AdminLayout';
import DashboardHome from './admin/DashboardHome';
import ReportsManagement from './admin/ReportsManagement';
import ReviewsManagement from './admin/ReviewsManagement';
import ArtisanRequests from './admin/ArtisanRequests';
import ServicesJobsManagement from './admin/ServicesManagement';
import AccountsManagement from './admin/AccountsManagement';
import ServicesManagement from './admin/ServicesManagement';
import JobsManagement from './admin/JobsManagement';
import ClientAddJob from './client/ClientAddJob';


function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>

       
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ForgotPasswordPage />} />
        
 
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ForgotPasswordPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:conversationId" element={<ConversationPage />} />
          <Route path="/s" element={<ClientAddJob />} />
      

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path='reports' element={<ReportsManagement />} />
          <Route path='reviews' element={<ReviewsManagement />} />
          <Route path='artisan-requests' element={<ArtisanRequests />} />
          <Route path='services' element={<ServicesManagement />} />
          <Route path='accounts' element={<AccountsManagement />} />
          <Route path='jobs' element={<JobsManagement />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;