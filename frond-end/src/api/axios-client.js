import axios from "axios";
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
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
            // window.location.href = '/unauthorized';
        }

        return Promise.reject(error);
    }
);

export default axiosClient;