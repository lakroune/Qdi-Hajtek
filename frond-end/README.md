# Frontend — React

Interface utilisateur de la plateforme de mise en relation artisans / clients.  
Construite avec **React 18**, communication temps réel via **Laravel Echo + Reverb**, notifications **react-hot-toast**, et gestion des dates avec **date-fns**.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router DOM |
| HTTP Client | Axios |
| WebSockets | Laravel Echo + Pusher JS |
| Notifications | react-hot-toast |
| Dates | date-fns |
| Styles | Tailwind CSS |

---

## Prérequis

- Node.js >= 18
- npm >= 9
- Backend Laravel en cours d'exécution (`php artisan serve`)

---

## Installation

### 1. Cloner le projet

```bash
git clone <repo-url>
cd <nom-du-projet-frontend>
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Installer les packages spécifiques au projet

```bash
# WebSockets (temps réel avec Laravel Reverb)
npm install laravel-echo pusher-js

# Notifications toast
npm install react-hot-toast

# Gestion et formatage des dates
npm install date-fns
```

### 4. Configurer l'environnement

```bash
cp .env.example .env
```

Remplir les variables dans `.env` :

```env
VITE_API_URL=http://localhost:8000/api

VITE_REVERB_APP_KEY=artisan-key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

---

## Lancement en développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`.

> Assurez-vous que le backend tourne en parallèle sur `http://localhost:8000`.

---

## Structure du projet

```
src/
├── api/
│   └── axios-client.js        # Instance Axios configurée (baseURL + JWT)
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ...
├── pages/
│   ├── HomePage.jsx
│   ├── ServiceDetailPage.jsx
│   ├── ArtisanProfilePage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── ...
├── context/
│   └── AuthContext.jsx        # Contexte global authentification
├── hooks/
│   └── useEcho.js             # Hook Laravel Echo / WebSockets
├── router/
│   └── index.jsx              # React Router — routes protégées
└── main.jsx
```

---

## Packages installés

### `laravel-echo` + `pusher-js`
Écoute des événements WebSocket diffusés par Laravel Reverb.

```bash
npm install laravel-echo pusher-js
```

Configuration dans `src/echo.js` :

```javascript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: import.meta.env.VITE_REVERB_SCHEME === 'https',
    enabledTransports: ['ws', 'wss'],
});

export default echo;
```

Écouter un événement dans un composant :

```javascript
import echo from '../echo';
import { useEffect } from 'react';

useEffect(() => {
    echo.channel('notifications')
        .listen('NouvelleReservation', (e) => {
            console.log('Nouvelle réservation :', e.reservation);
        });

    return () => echo.leaveChannel('notifications');
}, []);
```

---

### `react-hot-toast`
Notifications toast légères et personnalisables.

```bash
npm install react-hot-toast
```

Ajouter le `<Toaster>` une seule fois dans `main.jsx` ou `App.jsx` :

```jsx
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <Toaster position="top-right" />
            {/* reste de l'app */}
        </>
    );
}
```

Utilisation dans n'importe quel composant :

```javascript
import toast from 'react-hot-toast';

toast.success('Réservation confirmée !');
toast.error('Une erreur est survenue.');
toast.loading('Chargement...');
```

---

### `date-fns`
Formatage et manipulation des dates sans alourdir le bundle.

```bash
npm install date-fns
```

Exemples d'utilisation :

```javascript
import { format, formatDistanceToNow, isAfter } from 'date-fns';
import { fr } from 'date-fns/locale';

// Afficher une date formatée
format(new Date(reservation.date), 'dd MMMM yyyy', { locale: fr });
// → "12 juin 2025"

// Temps relatif
formatDistanceToNow(new Date(message.created_at), { addSuffix: true, locale: fr });
// → "il y a 5 minutes"

// Comparer deux dates
isAfter(new Date(dateA), new Date(dateB));
```

---

## Configuration Axios

Fichier `src/api/axios-client.js` :

```javascript
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Injecter le token JWT automatiquement
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Gérer les erreurs d'authentification globalement
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
```

---

## Variables d'environnement — référence complète

| Variable | Description | Exemple |
|---|---|---|
| `VITE_API_URL` | URL de base de l'API backend | `http://localhost:8000/api` |
| `VITE_REVERB_APP_KEY` | Clé de l'app Reverb (= `REVERB_APP_KEY` du backend) | `artisan-key` |
| `VITE_REVERB_HOST` | Hôte du serveur WebSocket | `localhost` |
| `VITE_REVERB_PORT` | Port du serveur WebSocket | `8080` |
| `VITE_REVERB_SCHEME` | Schéma (`http` ou `https`) | `http` |

> Les variables Reverb doivent correspondre exactement à celles du `.env` backend.

---

## Build de production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`. À déployer sur un serveur statique (Nginx, Vercel, Netlify, etc.).

Configuration Nginx pour le routing côté client :

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## Checklist avant mise en production

- [ ] Passer `VITE_REVERB_SCHEME` à `https`
- [ ] Mettre à jour `VITE_API_URL` vers l'URL de production
- [ ] Activer le CORS côté backend pour le domaine de production
- [ ] Vérifier que le backend tourne avec Supervisor (queue + reverb)
- [ ] Tester les notifications en temps réel

---

## Licence

Usage privé — tous droits réservés.