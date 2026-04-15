<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DemandeDirecteController;
use App\Http\Controllers\Api\EvaluationController;
use App\Http\Controllers\Api\OffreTravailController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\PropositionController;
use App\Http\Controllers\Api\ServiceManagerController;
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





Route::get('/villes', function () {
    return Ville::all();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/generate-code', [AuthController::class, 'generateCode']);



Route::get('/categories', [CategorieController::class, 'index']);

Route::get('artisans/{artisan}', [ArtisanController::class, 'show']);
Route::get('artisans', [ArtisanController::class, 'index']);
Route::patch('/artisans/{userId}/approve', [ArtisanController::class, 'approve']);
Route::post('/artisans/{user}/reject', [ArtisanController::class, 'reject']);



//ok for test
Route::apiResource('services', ServiceController::class)->only('index', 'show');

Route::middleware('auth:api')->group(function () {

    //ok for production
    Route::get('conversations/{id}/messages', [MessageController::class, 'index']);
    Route::post('conversations/{id}/messages', [MessageController::class, 'store']);
    Route::post('conversations/{id}/accept-offer', [ConversationController::class, 'acceptOffer']);
    Route::post('/payments/initiate', [PaiementController::class, 'initiate']);
    Route::post('/payments/confirm', [PaiementController::class, 'confirm']);
    Route::get('conversations', [ConversationController::class, 'index']);


    Route::post('/conversations/{conversation_id}/complete-mission', [ConversationController::class, 'completeMission']);

    // testing 


    Route::post('/conversations/{conversation_id}/reviews', [EvaluationController::class, 'store']);

    Route::post('/conversations/{conversation_id}/confirm-code', [ConversationController::class, 'confirmCode']);


    // portfolio
    Route::get('/portfolio', [ArtisanController::class, 'getPortfolio']);


    // /services/${service.id}/toggle

    Route::patch('/services/{service}/toggle', [ServiceController::class, 'toggle']);














    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/artisan-stats', [DashboardController::class, 'artisanStats']);




    Route::put('/categories/{id}', [CategorieController::class, 'update']);
    Route::post('/categories', [CategorieController::class, 'store']);








    Route::post('verifier-email', [AuthController::class, 'verifierEmail']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profile/me', [ProfileController::class, 'show']);
    Route::put('profile/update-password', [ProfileController::class, 'updatePassword']);
    Route::patch('profile', [ProfileController::class, 'update']);

    //nady artisan store
    Route::post('artisans', [ArtisanController::class, 'store']);

    //23mazal  hasso gates
    // Route::apiResource('categorie', CategorieController::class)->only('store');


    //service nadi (sauf toggel save)
    Route::apiResource('services', ServiceController::class)->only('store');
    Route::get('manager-services',  [ServiceManagerController::class, 'index']);

    Route::patch('/manager-services/{service}/approve', [ServiceManagerController::class, 'approve']);
    Route::patch('/manager-services/{service}/reject', [ServiceManagerController::class, 'reject']);



    // mazal  potection artisan envoi lui meme
    Route::post('demandes-directes', [DemandeDirecteController::class, 'store']);

    //   mazall  hta hadi potection ,
    Route::get('offres/me', [OffreTravailController::class, 'mesOffres']);

    //mazal  potection artisan envoi lui meme 
    Route::apiResource('offres', OffreTravailController::class)->only('store', 'show', 'index', 'update');
    // /pour client 
    Route::get('mes-offres/{id}', [OffreTravailController::class, 'getOffreTravailWithPropositions']);
    //mazal hta hada 
    Route::post('offres/{offre}/propositions', [PropositionController::class, 'store']);

    //mazal  potection 
    // /services/${id}/favorie
    Route::post('services/{id}/favorie', [FavoriController::class, 'favorieService']);

    // mazal  potection 
    Route::patch('propositions/{id}/accept', [PropositionController::class, 'accept']);

    Route::get('artisans/{artisan}/disponibilites', [DisponibiliteController::class, 'show']);
    Route::post('artisans/{artisan}/disponibilites', [DisponibiliteController::class, 'store']);


    // ('profile/me/counts');
    Route::get('profile/me/counts', [ProfileController::class, 'counts']);


    //    Route::get('/notifications');
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);



    Route::get('/paiements', [PaiementController::class, 'getPaiements']);



    // Route::get('artisans/{artisanId}/services', [ServiceController::class, 'artisanServices']);
    // Route::patch('services/{service}/toggle-status', [ServiceController::class, 'toggleStatus']);
});
