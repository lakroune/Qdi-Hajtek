import { Routes, Route } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import Header from './components/Header/Header';


function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;