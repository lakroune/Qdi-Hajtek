import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import './api/laravel-echo';
import Cookies from 'js-cookie'; 
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
console.log("Token from Cookies:", Cookies.get('ACCESS_TOKEN'));
console.log("My Key is:", import.meta.env.VITE_REVERB_APP_KEY);
