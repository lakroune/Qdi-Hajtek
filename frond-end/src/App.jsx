import { Routes, Route } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import Header from './components/Header/Header';
import RegisterPage from './auth/RegisterPage';
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import HomePage from './client/Home';


function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ForgotPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;