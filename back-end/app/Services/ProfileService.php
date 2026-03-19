<?php

namespace App\Services;

class ProfileService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
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
            'profile'  => $user->load(['client', 'artisan']),
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
            'rib'
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

  
}
