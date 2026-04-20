<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Exception;

class UserController extends Controller
{
    /**
     * Liste tous les utilisateurs avec leurs profils associés.
     */
   public function index()
    {
        // نستخدم eager loading لجلب الأدوار (roles) والعلاقات الأخرى
        $users = User::with(['roles', 'artisan', 'client'])->latest()->get();
        return response()->json(['data' => $users]);
    }

    /**
     * Bannir un utilisateur.
     */
    public function ban(User $user)
    {
        try {
            $user->update(['actif' => true]);
            return response()->json(['message' => 'Utilisateur banni avec succès']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erreur lors du bannissement'], 500);
        }
    }

    /**
     * Activer (débannir) un utilisateur.
     */
    public function activate(User $user)
    {
        try {
            $user->update(['is_banned' => false]);
            return response()->json(['message' => 'Utilisateur activé avec succès']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erreur lors de l\'activation'], 500);
        }
    }

    /**
     * Changer le rôle de l'utilisateur.
     */
    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:artisan,client,admin'
        ]);

        try {
            $user->update(['role' => $request->role]);
            return response()->json([
                'message' => "Rôle mis à jour en {$request->role}",
                'user' => $user
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erreur lors du changement de rôle'], 500);
        }
    }
}