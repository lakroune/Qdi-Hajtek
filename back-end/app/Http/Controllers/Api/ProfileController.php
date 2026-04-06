<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordRequest;
use App\Http\Requests\ProfileRequest;
use App\Services\ProfileService;
use Illuminate\Support\Facades\Password;

class ProfileController extends Controller
{

    public function __construct(private ProfileService $profileService) {}

    /**
     * Display the specified resource.
     */
    public function show()
    {

        $profile = $this->profileService->getProfile();

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found or unauthorized'
            ], 404);
        }

        return $profile->additional([
            'success' => true,
            'message' => 'Profile retrieved successfully'
        ])->response()->setStatusCode(200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileRequest $request)
    {
        $result = $this->profileService->updateProfile($request->validated());

        return response()->json([
            'success' => $result['success'],
            'message' => $result['message'],
            'data' => $result['profile']
        ]);
    }

    public function updatePassword(PasswordRequest $request)
    {
        $result = $this->profileService->updatePassword($request->validated());

        return response()->json([
            'success' => $result['success'],
            'message' => $result['message'],
        ]);
    }

    public function counts()
    {
        $counts = $this->profileService->getCounts();
        return  $counts;
    }
}
