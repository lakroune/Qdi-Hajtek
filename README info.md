# Samiha — Plateforme Artisans & Services

Plateforme de mise en relation entre **artisans qualifiés** et **clients** au Maroc.  
Trouvez le meilleur artisan près de chez vous — menuiserie, plomberie, électricité, et bien plus.

---

## Architecture du projet

```
samiha/
├── backend/          # API Laravel 11 — REST + WebSockets + PDF
└── frontend/         # Interface React 18 + Vite
```

---

## Documentation

| Partie | README |
|---|---|
| Backend (Laravel) | [backend/README.md](./backend/README.md) |
| Frontend (React) | [frontend/README.md](./frontend/README.md) |

---

## Stack globale

| Couche | Technologie |
|---|---|
| Backend | Laravel 11, PHP 8.2+ |
| Frontend | React 18, Vite |
| Authentification | JWT (`php-open-source-saver/jwt-auth`) |
| Temps réel | Laravel Reverb + Laravel Echo + Pusher JS |
| Base de données | MySQL |
| PDF | barryvdh/laravel-dompdf |
| Notifications | react-hot-toast |
| Dates | date-fns |

---

## Démarrage rapide

### 1. Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan jwt:secret
```

Lancer les serveurs :

```bash
php artisan serve          # API → http://localhost:8000
php artisan reverb:start   # WebSocket → ws://localhost:8080
php artisan queue:work     # Worker de queue
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev                # App → http://localhost:5173
```

---

## Variables d'environnement clés

### Backend `.env`

```env
APP_URL=http://localhost:8000
DB_DATABASE=samiha_db
JWT_SECRET=                    # php artisan jwt:secret
REVERB_APP_KEY=samiha-key
BROADCAST_CONNECTION=reverb
QUEUE_CONNECTION=database
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:8000/api
VITE_REVERB_APP_KEY=samiha-key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

> La valeur de `VITE_REVERB_APP_KEY` doit être identique à `REVERB_APP_KEY` dans le backend.

---

## Fonctionnalités principales

- Recherche et filtrage de services (catégorie, note, prix, localisation GPS)
- Profils artisans vérifiés avec galerie photos
- Système de réservation avec suivi de statut
- Favoris et historique
- Notifications en temps réel (WebSocket)
- Génération de factures PDF
- Authentification JWT sécurisée

---

<!-- ## Équipe

| Rôle | Nom |
|---|---| -->

<!-- --- -->

## Licence

Usage privé — tous droits réservés © Samiha 2025.