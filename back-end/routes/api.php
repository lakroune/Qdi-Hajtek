<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verifier-email', [AuthController::class, 'verifierEmail']);
Route::post('/gerer-renvoi', [AuthController::class, 'gererRenvoi']);
Route::post('/logout', [AuthController::class, 'logout']);
 