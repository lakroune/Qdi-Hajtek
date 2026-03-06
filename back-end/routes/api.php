<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verifierEmail', [AuthController::class, 'verifierEmail']);
Route::post('/gererRenvoi', [AuthController::class, 'gererRenvoi']);
Route::middleware('auth:sanctum')->get('/utilisateur', [AuthController::class, 'donneesUtilisateur']);
Route::post('/utilisateur', [ClientController::class, 'getInfo']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('role:artisan')->group(function () {
        // Route::post('/services', [ServiceController::class, 'store']);
        // Route::post('/portfolio', [PortfolioController::class, 'add']);
    });

    Route::middleware('role:client')->group(function () {
        // Route::post('/offres', [OffreController::class, 'store']);
    });
});
