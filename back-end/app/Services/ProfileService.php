<?php

namespace App\Services;

use App\DAO\ClientDAO;
use App\DAO\UserDAO;

class ProfileService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private UserDAO $userDAO, private ClientDAO $clientDAO)
    {
        //
    }

    public function getProfile()
    {
        $user = auth('api')->user();
        if (!$user) {
            return [
                'success' => false,
                'message' => 'Unauthorized'
            ];
        }

        return [
            'success' => true,
            'message' => 'Profile retrieved successfully',
            'profile'  => $user->load(['client', 'artisan', 'admin']),
        ];
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
}
