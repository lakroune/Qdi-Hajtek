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


function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/s" element={<AdminLayout />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ForgotPasswordPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/:conversationId" element={<ConversationPage />} />
      </Routes>
    </>
  );
}

export default App;