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
    
}
