<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\DemandeDirecteController;
use App\Http\Controllers\Api\OffreTravailController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\PropositionController;
use App\Http\Controllers\ArtisanController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\DisponibiliteController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ServiceController;
use App\Models\Ville;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/generate-code', [AuthController::class, 'generateCode']);
Route::get('/villes', function () {
    return Ville::all();
});


Route::get('/categories', [CategorieController::class, 'index']);
Route::post('/categories', [CategorieController::class, 'store']);
Route::middleware('auth:api')->group(function () {

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
    Route::apiResource('services', ServiceController::class)->only('store', 'index', 'show');

    // mazal  potection artisan envoi lui meme
    Route::post('demandes-directes', [DemandeDirecteController::class, 'store']);

    //mazal  potection artisan envoi lui meme
    Route::get('offres', [OffreTravailController::class, 'index']);


    Route::get('artisans/{artisan}/disponibilites', [DisponibiliteController::class, 'show']);
    Route::post('artisans/{artisan}/disponibilites', [DisponibiliteController::class, 'store']);

    Route::get('conversations', [ConversationController::class, 'index']);



    Route::apiResource('offres-travail', OffreTravailController::class)->only('store');
    Route::post('propositions', [PropositionController::class, 'store']);

    Route::patch('propositions/{id}/accept', [PropositionController::class, 'accept']);

    Route::post('conversations/{id}/messages', [MessageController::class, 'store']);
    Route::get('conversations/{id}/messages', [MessageController::class, 'index']);



    // Route::get('artisans/{artisanId}/services', [ServiceController::class, 'artisanServices']);
    // Route::patch('services/{service}/toggle-status', [ServiceController::class, 'toggleStatus']);
});
