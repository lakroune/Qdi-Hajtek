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
        $reslt = $this->profileService->getProfile();


        return response()->json([
            'success' => $reslt['success'],
            'message' => $reslt['message'],
            'data' => $reslt['profile']
        ]);
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
