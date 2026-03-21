<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategorieController;
use App\Http\Controllers\Api\DemandeDirecteController;
use App\Http\Controllers\Api\OffreTravailController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\ArtisanController;
use App\Http\Controllers\DisponibiliteController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/generate-code', [AuthController::class, 'generateCode']);


Route::middleware('auth:api')->group(function () {
    Route::post('verifier-email', [AuthController::class, 'verifierEmail']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profile', [ProfileController::class, 'show']);
    Route::patch('profile', [ProfileController::class, 'update']);
    Route::apiResource('artisans', ArtisanController::class)->only('store');


    Route::get('artisans/{artisan}/disponibilites', [DisponibiliteController::class, 'show']);
    Route::post('artisans/{artisan}/disponibilites', [DisponibiliteController::class, 'store']);






    Route::post('demandes-directes', [DemandeDirecteController::class, 'store']);


    Route::apiResource('services', ServiceController::class);
    Route::apiResource('categorie', CategorieController::class);
    Route::apiResource('offres-travail', OffreTravailController::class)->only('store');

    // Route::get('artisans/{artisanId}/services', [ServiceController::class, 'artisanServices']);
    // Route::patch('services/{service}/toggle-status', [ServiceController::class, 'toggleStatus']);
});
