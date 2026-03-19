<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BecomeArtisanRequest;
use App\Http\Requests\ProfileRequest;
use App\Models\User;
use App\Services\ProfileService;

class ProfileController extends Controller
{


    /**
     * Display the specified resource.
     */
    public function show(ProfileService $profileService)
    {
        $reslt = $profileService->getProfile();


        return response()->json([
            'success' => $reslt['success'],
            'message' => $reslt['message'],
            'data' => $reslt['profile']
        ]);
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
