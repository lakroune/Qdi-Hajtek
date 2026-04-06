<?php

namespace App\Services;

use App\DAO\ClientDAO;
use App\DAO\ConversationDAO;
use App\DAO\UserDAO;
use App\Http\Resources\ArtisanResource;
use App\Http\Resources\ClientResource;
use App\Http\Resources\DocumentResource;
use App\Models\Artisan;
use Dom\Document;

class ProfileService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private UserDAO $userDAO,  private ConversationDAO $conversationDAO)
    {
        //
    }

    public function getProfile()
    {
        $user = auth('api')->user();

        if (!$user) {
            return null;
        }
        $user->load(['client', 'artisan.disponibilites', 'artisan.documents']);


        if ($user->hasOneRole('client')) {
            return new ClientResource($user);
        }
        if ($user->hasRole('artisan')) {
            return (new ArtisanResource($user));
        }
    }


    public function updateProfile(array $data)
    {
        $user = auth('api')->user();

        if (! $user) {
            return [
                'success' => false,
                'message' => 'Unauthorized'
            ];
        }

        $clientData = collect($data)->only([
            'phone',
            'rib',
            'address',
        ])->toArray();

        if (!empty($clientData)) {
            $user->client->update($clientData);
        }
        $user->update(collect($data)->only([
            'city',
        ])->toArray());

        if (isset($data['avatar'])) {
            $path = $data['avatar']->store('avatars', 'public');
            $user->client->update(['avatar' => $path]);
        }

        return [
            'success' => true,
            'message' => 'Profile updated successfully',
            'profile'  => $user->load(['client', 'artisan']),
        ];
    }

    public function updatePassword(array $data)
    {
        $user = auth('api')->user();

        if (! $user) {
            return [
                'success' => false,
                'message' => 'Unauthorized'
            ];
        }

        $reslt = $this->userDAO->updatePassword($user->id, $data);

        return [
            'success' => $reslt,
            'message' => $reslt ? 'Password updated successfully' : 'Invalid password',
        ];
    }

    public function getCounts()
    {
        $user = auth('api')->user();

        if (! $user) {
            return [
                'success' => false,
                'message' => 'Unauthorized'
            ];
        }

        return response()->json([
            'messages' => $this->conversationDAO->countMessagesNotRead($user->id),
            'notifications' => $user->unreadNotifications()->count(),
        ]);
    }
}
