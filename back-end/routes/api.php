<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/generate-code', [AuthController::class, 'generateCode']);


Route::middleware('auth:api')->group(function () {
    Route::post('verifier-email', [AuthController::class, 'verifierEmail']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profile', [ProfileController::class, 'show']);
    Route::patch('profile/{id}', [ProfileController::class, 'update']);
});
