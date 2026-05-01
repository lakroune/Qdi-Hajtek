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
| API Routes
|--------------------------------------------------------------------------
|
*/

// ── Public routes ──────────────────────────────
Route::get('/villes', fn() => Ville::all());
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/generate-code', [AuthController::class, 'generateCode']);
Route::post('/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/categories', [CategorieController::class, 'index']);
Route::get('auth/{provider}', [SocialAuthController::class, 'redirectToProvider']);
Route::get('auth/{provider}/callback', [SocialAuthController::class, 'handleProviderCallback']);
Route::get('artisans/{artisan}', [ArtisanController::class, 'show']);
Route::get('artisans', [ArtisanController::class, 'index']);
Route::apiResource('services', ServiceController::class)->only('index', 'show');


Route::middleware('auth:api')->group(function () {

    // ── Tous les users connectés ────────────────
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('verifier-email', [AuthController::class, 'verifierEmail']);
    Route::get('profile/me', [ProfileController::class, 'show']);
    Route::put('profile/update-password', [ProfileController::class, 'updatePassword']);
    Route::patch('profile', [ProfileController::class, 'update']);
    Route::get('profile/me/counts', [ProfileController::class, 'counts']);
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::get('conversations', [ConversationController::class, 'index']);
    Route::get('conversations/{id}/messages', [MessageController::class, 'index']);
    Route::post('conversations/{id}/messages', [MessageController::class, 'store']);


    // ── Client uniquement ───────────────────────
    Route::middleware('role:client')->group(function () {
        Route::post('services/{id}/favorie', [FavoriController::class, 'favorieService']);
        Route::get('/favorites', [FavoriController::class, 'index']);
        Route::post('artisans/{artisan}/like', [ArtisanController::class, 'likeToggle']);
        Route::post('demandes-directes', [DemandeDirecteController::class, 'store']);
        Route::apiResource('offres', OffreTravailController::class)->only('store', 'show', 'index', 'update');
        Route::get('offres/me', [OffreTravailController::class, 'mesOffres']);
        Route::get('mes-offres/{id}', [OffreTravailController::class, 'getOffreTravailWithPropositions']);
        Route::patch('propositions/{id}/accept', [PropositionController::class, 'accept']);
        Route::post('/payments/initiate', [PaiementController::class, 'initiate']);
        Route::post('/payments/confirm', [PaiementController::class, 'confirm']);
        Route::get('/factures/download/{id}', [PaiementController::class, 'downloadFacture']);
        Route::post('/conversations/{conversation_id}/reviews', [EvaluationController::class, 'store']);
        Route::post('/conversations/{conversation_id}/confirm-code', [ConversationController::class, 'confirmCode']);
        Route::post('/artisans/{artisanId}/report', [ReportController::class, 'report']);
    });


    // ── Artisan uniquement ──────────────────────
    Route::middleware('role:artisan')->group(function () {
        Route::post('artisans', [ArtisanController::class, 'store']);
        Route::get('/portfolio', [ArtisanController::class, 'getPortfolio']);
        Route::apiResource('services', ServiceController::class)->only('store');
        Route::patch('/services/{service}/toggle', [ServiceController::class, 'toggle']);
        Route::get('/services/{id}/edit', [ServiceController::class, 'edit']);
        Route::put('/services/{id}', [ServiceController::class, 'update']);
        Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
        Route::get('manager-services', [ServiceManagerController::class, 'index']);
        Route::post('offres/{offre}/propositions', [PropositionController::class, 'store']);
        Route::get('artisans/{artisan}/disponibilites', [DisponibiliteController::class, 'show']);
        Route::post('artisans/{artisan}/disponibilites', [DisponibiliteController::class, 'store']);
        Route::get('/dashboard/artisan-stats', [DashboardController::class, 'artisanStats']);
        Route::post('/conversations/{conversation_id}/complete-mission', [ConversationController::class, 'completeMission']);
        Route::post('/conversations/{conversation_id}/accept-offer', [ConversationController::class, 'acceptOffer']);
        Route::get('/paiements', [PaiementController::class, 'getPaiements']);
    });


    // ── Admin uniquement ────────────────────────
    Route::middleware('role:admin')->group(function () {
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
        Route::get('/users', [UserController::class, 'index']);
        Route::patch('/users/{user}/ban', [UserController::class, 'ban']);
        Route::patch('/users/{user}/activate', [UserController::class, 'activate']);
        Route::patch('/users/{user}/role', [UserController::class, 'updateRole']);
        Route::patch('/artisans/{userId}/approve', [ArtisanController::class, 'approve']);
        Route::post('/artisans/{user}/reject', [ArtisanController::class, 'reject']);
        Route::put('/categories/{id}', [CategorieController::class, 'update']);
        Route::post('/categories', [CategorieController::class, 'store']);
        Route::delete('/categories/{id}', [CategorieController::class, 'destroy']);
        Route::patch('/manager-services/{service}/approve', [ServiceManagerController::class, 'approve']);
        Route::patch('/manager-services/{service}/reject', [ServiceManagerController::class, 'reject']);
        Route::get('reports', [ReportController::class, 'index']);
        Route::put('/reports/{artisan}/resolve/{client}', [ReportController::class, 'resolve']);
        Route::put('/reports/{artisan}/dismiss/{client}', [ReportController::class, 'dismiss']);
    });
});
