<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\URL;

class SocialAuthController extends Controller
{
    public function redirectToProvider($provider)
    {
        return response()->json([
            'url' => Socialite::driver($provider)->stateless()->redirect()->getTargetUrl()
        ]);
    }

    public function handleProviderCallback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();

            $fullName = $socialUser->getName();
            $nameParts = explode(' ', $fullName, 2);
            $firstName = $nameParts[0];
            $lastName = $nameParts[1] ?? '';

            $user = User::updateOrCreate([
                'email' => $socialUser->getEmail(),
            ], [
                'firstname' => $firstName,
                'lastname' => $lastName,
                'password' => bcrypt(Str::random(16)),
                'email_verified_at' => now()
            ]);

            $token = auth('api')->login($user);

            return redirect(env('FRONTEND_URL') . '/auth/callback?token=' . $token);
        } catch (\Exception $e) {
            return redirect(env('FRONTEND_URL') . '/auth/login?error=auth_failed');
        }
    }
}
