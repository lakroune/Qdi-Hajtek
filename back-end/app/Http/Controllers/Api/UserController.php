<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminResource;
use App\Http\Resources\ArtisanResource;
use App\Http\Resources\ClientResource;
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
        $users = User::with(['roles', 'artisan', 'client'])->latest()->get();
        return response()->json(['data' => $users]);
    }

    /**
     * Bannir un utilisateur.
     */
    public function ban(User $user)
    {
        try {
            $user->client->statut = 'inactif';
            $user->client->save();
            //$user->client()->update(['statut' => 'inactif']);
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
            $user->client->statut = 'actif';
            $user->client->save();
            // $user->client->update(['statut' => 'actif']);
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
            'role' => 'required|string'
        ]);

        try {
            if ($request->role === 'both') {
                $user->roles()->sync([2, 3]);
            } else {
                $roleId = ($request->role === 'client') ? 2 : 3;
                $user->roles()->sync([$roleId]);
            }
            return response()->json(['message' => 'Rôle mis à jour']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erreur lors du changement'], 500);
        }
    }

    public function me()
    {
        $user = auth('api')->user();
        $user->load(['client', 'admin', 'artisan']);
        if ($user->hasOneRole('client')) {
            $profile = new ClientResource($user);
        }
        if ($user->hasRole('artisan')) {
            $profile = (new ArtisanResource($user));
        }

        return response()->json([
            'success' =>  $profile ? true : false,
            'message' => $profile ? 'Profile retrieved successfully' : 'Profile not found or unauthorized',
            'user' => $profile
        ], 200);
    }
}
