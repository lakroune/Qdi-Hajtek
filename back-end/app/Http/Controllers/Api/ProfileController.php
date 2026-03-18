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


        return response()->json([
            'success' => true,
            'message' => 'Profile retrieved successfully',
            'profile'  => $user->load(['client', 'artisan']),
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
        $user->client->update($data);
        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'user' => $user
        ], 200);
    }
}
