import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie';

window.Pusher = Pusher;


window.Echo = new Echo({
    broadcaster: 'reverb',
    key: 'ojk7sigmnfldscxsplhw',
    wsHost: '127.0.0.1',
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: false, // 
    enabledTransports: ['ws', 'wss'],
    authEndpoint: import.meta.env.VITE_API_BASE_URL + '/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${Cookies.get('ACCESS_TOKEN')}`,
            Accept: 'application/json',
        },
    },
});