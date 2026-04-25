import axios from "axios";
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = Cookies.get('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            Cookies.remove('ACCESS_TOKEN');
            Cookies.remove('USER_DATA');

            window.location.href = '/auth/login';
        }

        if (error.response && error.response.status === 403) {
            console.error("Accès interdit ! Role non autorisé.");
            window.location.href = '/unauthorized';
        }

        if (error.response && error.response.status === 404) {
            console.error("Ressource introuvable.");
            window.location.href = '/not-found';
        }

        return Promise.reject(error);
    }
);

export default axiosClient;