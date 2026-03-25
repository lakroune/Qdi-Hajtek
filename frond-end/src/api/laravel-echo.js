import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie'; // استيراد مكتبة الكوكيز

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: 'ojk7sigmnfldscxsplhw', 
    wsHost: '127.0.0.1',
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint:  'http://localhost:8000/api/broadcasting/auth', 
    auth: {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`, 
            Accept: 'application/json',
        },
    },
});