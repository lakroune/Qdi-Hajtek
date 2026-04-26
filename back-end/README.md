# Backend — API Laravel

API RESTful pour la plateforme de mise en relation artisans / clients.  
Construite avec **Laravel 11**, authentification **JWT**, temps réel via **Laravel Reverb**, génération de PDF avec **DomPDF**.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Laravel 11 |
| Authentification | JWT (`php-open-source-saver/jwt-auth`) + Sanctum |
| WebSockets | Laravel Reverb + Pusher PHP Server |
| Queue | Laravel Queue (database driver) |
| PDF | barryvdh/laravel-dompdf |
| Base de données | MySQL / PostgreSQL |

---

## Prérequis

- PHP >= 8.2
- Composer
- MySQL ou PostgreSQL
- Node.js (pour les assets)
- Extension PHP : `mbstring`, `openssl`, `pdo`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`

---

## Installation

### 1. Cloner le projet

```bash
git clone <repo-url>
cd <nom-du-projet>
```

### 2. Installer les dépendances PHP

```bash
composer install
```

### 3. Configurer l'environnement

```bash
cp .env.example .env
php artisan key:generate
```

Remplir les variables dans `.env` :

```env
APP_NAME=ArtisanAPI
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=artisan_db
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=          # généré à l'étape 5
JWT_ALGO=HS256

REVERB_APP_ID=artisan-app
REVERB_APP_KEY=artisan-key
REVERB_APP_SECRET=artisan-secret
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http

BROADCAST_CONNECTION=reverb
QUEUE_CONNECTION=database

FRONTEND_URL=http://localhost:3000
```

### 4. Migrer la base de données

```bash
php artisan migrate
php artisan db:seed          # optionnel — données de test
```

### 5. Installer l'API & JWT

```bash
# Sanctum (personal access tokens)
php artisan install:api

# Publier la config JWT et générer la clé secrète
php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
```

### 6. Installer le broadcasting (Reverb)

```bash
php artisan install:broadcasting
php artisan reverb:install
```

---

## Lancement en développement

Ouvrir **4 terminaux** en parallèle :

```bash
# Terminal 1 — Serveur HTTP
php artisan serve

# Terminal 2 — WebSocket Reverb
php artisan reverb:start

# Terminal 3 — Worker de queue
php artisan queue:work

# Terminal 4 — (optionnel) Watcher de logs
php artisan pail
```

L'API sera disponible sur `http://localhost:8000/api`.

---

## Structure des routes principales

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/services
POST   /api/services
GET    /api/services/{id}
PUT    /api/services/{id}
DELETE /api/services/{id}
POST   /api/services/{id}/favorie

GET    /api/categories

GET    /api/artisans/{id}

GET    /api/reservations
POST   /api/reservations
PATCH  /api/reservations/{id}/statut

GET    /api/notifications
```

---

## Packages installés

### `php-open-source-saver/jwt-auth`
Authentification stateless via JSON Web Tokens.

```bash
composer require php-open-source-saver/jwt-auth
php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
```

### `laravel/reverb`
Serveur WebSocket natif Laravel — remplace Pusher/Soketi en local.

```bash
composer require laravel/reverb
php artisan reverb:install
php artisan reverb:start
```

### `pusher/pusher-php-server`
Driver requis par le broadcasting Laravel, même en utilisant Reverb.

```bash
composer require pusher/pusher-php-server
```

### `barryvdh/laravel-dompdf`
Génération de PDF (factures, bons de commande, rapports).

```bash
composer require barryvdh/laravel-dompdf
```

Utilisation dans un contrôleur :

```php
use Barryvdh\DomPDF\Facade\Pdf;

$pdf = Pdf::loadView('pdf.facture', ['data' => $data]);
return $pdf->download('facture.pdf');
```

---

## Queue & Broadcasting

### Lancer le worker de queue

```bash
# Mode standard
php artisan queue:work

# Mode daemon avec supervision (production)
php artisan queue:work --sleep=3 --tries=3 --max-time=3600
```

### Lancer Reverb (WebSockets)

```bash
php artisan reverb:start --host=0.0.0.0 --port=8080
```

Écouter un événement côté frontend (exemple avec Laravel Echo) :

```javascript
Echo.channel('notifications')
    .listen('NouvelleReservation', (e) => {
        console.log(e.reservation);
    });
```

---

## Tests

```bash
# Lancer tous les tests
php artisan test

# Avec couverture
php artisan test --coverage
```

---

## Déploiement (production)

```bash
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
```

Utiliser **Supervisor** pour maintenir les processus actifs :

```ini
[program:laravel-worker]
command=php /var/www/artisan queue:work --sleep=3 --tries=3
autostart=true
autorestart=true

[program:laravel-reverb]
command=php /var/www/artisan reverb:start
autostart=true
autorestart=true
```

---

## Variables d'environnement — référence complète

| Variable | Description | Exemple |
|---|---|---|
| `APP_KEY` | Clé de chiffrement Laravel | généré par `key:generate` |
| `JWT_SECRET` | Clé secrète JWT | généré par `jwt:secret` |
| `DB_*` | Connexion base de données | — |
| `REVERB_APP_*` | Identifiants du serveur WebSocket | — |
| `BROADCAST_CONNECTION` | Driver de broadcast | `reverb` |
| `QUEUE_CONNECTION` | Driver de queue | `database` |
| `FRONTEND_URL` | URL du frontend (CORS) | `http://localhost:3000` |

---

## Licence

Usage privé — tous droits réservés.