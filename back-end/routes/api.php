<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DemandeDirecteController;
use App\Http\Controllers\Api\EvaluationController;
use App\Http\Controllers\Api\OffreTravailController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\PropositionController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\ServiceManagerController;
use App\Http\Controllers\Api\SocialAuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ArtisanController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\DisponibiliteController;
use App\Http\Controllers\FavoriController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\ServiceController;
use App\Models\Ville;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Routes publiques 
|--------------------------------------------------------------------------
*/

Route::get('/villes', fn() => Ville::all());

// Authentification
Route::post('/register',        [AuthController::class, 'register']);
Route::post('/login',           [AuthController::class, 'login']);
Route::post('/generate-code',   [AuthController::class, 'generateCode']);
Route::post('/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/reset-password',  [AuthController::class, 'resetPassword']);

// OAuth social
// Route::get('auth/{provider}',          [SocialAuthController::class, 'redirectToProvider']);
// Route::get('auth/{provider}/callback', [SocialAuthController::class, 'handleProviderCallback']);

// Ressources consultables publiquement
Route::get('/categories',     [CategorieController::class, 'index']);
Route::get('artisans',        [ArtisanController::class, 'index']);
Route::get('artisans/{artisan}', [ArtisanController::class, 'show']);
Route::apiResource('services', ServiceController::class)->only('index', 'show');

/*
|--------------------------------------------------------------------------
| Routes protégées (authentification requise)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:api')->group(function () {

    /*
    |----------------------------------------------------------------------
    | Client uniquement
    |----------------------------------------------------------------------
    */
    Route::middleware('role:client')->group(function () {
        // Paiements & factures
        Route::post('/payments/initiate',      [PaiementController::class, 'initiate']);
        Route::post('/payments/confirm',       [PaiementController::class, 'confirm']);
        Route::get('/factures/download/{id}',  [PaiementController::class, 'downloadFacture']);

        // Conversations (actions client)
        Route::post('/conversations/{conversation_id}/reviews',      [EvaluationController::class, 'store']);
        Route::post('/conversations/{conversation_id}/confirm-code', [ConversationController::class, 'confirmCode']);

        // Artisans (actions client)
        Route::post('artisans/{artisan}/like',      [ArtisanController::class, 'likeToggle']);
        Route::post('/artisans/{artisanId}/report', [ReportController::class, 'report']);

        // Devenir artisan
        Route::post('artisans', [ArtisanController::class, 'store']);

        // Offres de travail
        Route::get('offres/me', [OffreTravailController::class, 'mesOffres']);
        Route::get('mes-offres/{id}', [OffreTravailController::class, 'getOffreTravailWithPropositions']);
        Route::post('offres', [OffreTravailController::class, 'store']);
        Route::patch('offres/{id}', [OffreTravailController::class, 'update']);
        // Demandes directes
        Route::post('demandes-directes', [DemandeDirecteController::class, 'store']);

        // Propositions
        Route::patch('propositions/{id}/accept',      [PropositionController::class, 'accept']);
    });

    /*
    |----------------------------------------------------------------------
    | Artisan uniquement
    |----------------------------------------------------------------------
    */
    Route::middleware('role:artisan')->group(function () {
        // Conversations (actions artisan)
        Route::post('conversations/{id}/accept-offer',               [ConversationController::class, 'acceptOffer']);
        Route::post('/conversations/{conversation_id}/complete-mission', [ConversationController::class, 'completeMission']);

        // Services (gestion)
        Route::post('services',            [ServiceController::class, 'store']);
        Route::get('/services/{id}/edit',  [ServiceController::class, 'edit']);
        Route::put('/services/{id}',       [ServiceController::class, 'update']);
        Route::delete('/services/{id}',    [ServiceController::class, 'destroy']);
        Route::patch('/services/{service}/toggle', [ServiceController::class, 'toggle']);

        // Disponibilités
        // Route::get('artisans/{artisan}/disponibilites',  [DisponibiliteController::class, 'show']);
        // Route::post('artisans/{artisan}/disponibilites', [DisponibiliteController::class, 'store']);

        // Portfolio
        Route::get('/portfolio', [ArtisanController::class, 'getPortfolio']);

        // Offres de travail
        Route::get('offres', [OffreTravailController::class, 'index']);
        Route::get('offres/{id}', [OffreTravailController::class, 'show']);
        // Propositions
        Route::post('offres/{offre}/propositions',    [PropositionController::class, 'store']);

        // Dashboard artisan (stats propres)
        Route::get('/dashboard/artisan-stats', [DashboardController::class, 'artisanStats']);
    });

    /*
    |----------------------------------------------------------------------
    | Client & Artisan
    |----------------------------------------------------------------------
    */
    Route::middleware('role:client,artisan')->group(function () {
        //  profil
        Route::get('profile/me',             [ProfileController::class, 'show']);
        Route::get('profile/me/counts',      [ProfileController::class, 'counts']);
        Route::patch('profile',              [ProfileController::class, 'update']);
        Route::put('profile/update-password', [ProfileController::class, 'updatePassword']);

        // Conversations & messages
        Route::get('conversations',                       [ConversationController::class, 'index']);
        Route::get('conversations/{id}/messages',         [MessageController::class, 'index']);
        Route::post('conversations/{id}/messages',        [MessageController::class, 'store']);

        // Favoris
        Route::get('/favorites',              [FavoriController::class, 'index']);
        Route::post('services/{id}/favorie',  [FavoriController::class, 'favorieService']);

        // Notifications
        Route::get('/notifications',              [NotificationController::class, 'index']);
        Route::post('/notifications/{id}/read',   [NotificationController::class, 'markAsRead']);
    });

    /*
    |----------------------------------------------------------------------
    |  utilisateur connecté (tous rôles confondus)
    |----------------------------------------------------------------------
    */

    // Auth 
    Route::post('logout',                [AuthController::class, 'logout']);
    Route::post('verifier-email',        [AuthController::class, 'verifierEmail']);
    // Utilisateur courant
    Route::get('/users/me', [UserController::class, 'me']);

    /*
    |----------------------------------------------------------------------
    | Admin uniquement
    |---------------------------------------------------------------------- 
     */

    Route::middleware('role:admin')->group(function () {
        // Dashboard
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

        // Gestion des utilisateurs
        Route::get('/users',                    [UserController::class, 'index']);
        Route::patch('/users/{user}/ban',       [UserController::class, 'ban']);
        Route::patch('/users/{user}/activate',  [UserController::class, 'activate']);
        Route::patch('/users/{user}/role',      [UserController::class, 'updateRole']);

        // Gestion des artisans
        Route::patch('/artisans/{userId}/approve', [ArtisanController::class, 'approve']);
        Route::post('/artisans/{user}/reject',     [ArtisanController::class, 'reject']);

        // Catégories
        Route::post('/categories',        [CategorieController::class, 'store']);
        Route::put('/categories/{id}',    [CategorieController::class, 'update']);
        Route::delete('/categories/{id}', [CategorieController::class, 'destroy']);

        // Services (modération)
        Route::patch('/manager-services/{service}/approve', [ServiceManagerController::class, 'approve']);
        Route::patch('/manager-services/{service}/reject',  [ServiceManagerController::class, 'reject']);
        Route::get('manager-services', [ServiceManagerController::class, 'index']);

        // Paiements (historique)
        Route::get('/paiements', [PaiementController::class, 'getPaiements']);

        // Signalements
        Route::get('/reports',                               [ReportController::class, 'index']);
        Route::put('/reports/{artisan}/resolve/{client}',    [ReportController::class, 'resolve']);
        Route::put('/reports/{artisan}/dismiss/{client}',    [ReportController::class, 'dismiss']);
    });
});
