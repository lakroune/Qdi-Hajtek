<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Models\User;

class ProfileController extends Controller
{


    /**
     * Display the specified resource.
     */
    public function show()
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }
        $profile = [];

        if ($user->hasRole('client')) {
            $profile = [
                'user' => $user->load('client'),
            ];
        }

        if ($user->hasRole('artisan')) {
            $profile = [
                'user' => $user->load(['client', 'artisan'])
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'Profile retrieved successfully',
            'profile' => $profile
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileRequest $request, string $id)
    {

        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $data = $request->validated();

        $user->update($data);
        $user->save();
        $user->client->update($data);
        $user->save();
        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'user' => $user
        ], 200);
    }
}
