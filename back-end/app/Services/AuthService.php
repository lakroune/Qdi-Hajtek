<?php

namespace App\Services;

use App\DAO\ClientDAO;
use App\DAO\UserDAO;
use App\DTO\Auth\LoginDTO;
use App\DTO\Auth\RegisterDTO;
use App\DTO\Auth\VerifierEmailDTO;
use App\Http\Resources\AdminResource;
use App\Http\Resources\ArtisanResource;
use App\Http\Resources\ClientResource;
use App\Jobs\SendRestPasswordEmail;
use App\Jobs\SendVerificationEmail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private UserDAO $userDAO,
        private ClientDAO $clientDAO
    ) {
        //
    }


    public function register(RegisterDTO $registerDTO)
    {
        $user = $this->userDAO->createFromRegisterDTO($registerDTO);
        $this->clientDAO->create($user->id, $registerDTO->data['cin']);

        if (! $user->assignRole('client')) {
            return  [
                'success' => false,
            ];
        }
        $code = random_int(100000, 999999);
        $user->code_verification = $code;
        $user->save();

        $token = JWTAuth::claims([
            'exp' => now()->addHours(50)->timestamp
        ])->fromUser($user);

        SendVerificationEmail::dispatch($user);
        return  [
            'success' => true,
            'user' => $user,
            'token' => $token
        ];
    }

    public function login(LoginDTO $loginDTO)
    {
        $user = $this->userDAO->login($loginDTO);

        if (!$user || !password_verify($loginDTO->data['password'], $user->password)) {
            return ['success' => false, 'message' => 'Invalid informations'];
        }

        if (!$user->email_verified_at) {
            return ['success' => false, 'message' => 'Email not verified'];
        }

        $token = JWTAuth::fromUser($user);
        $user->load(['client', 'admin', 'artisan']);
        if ($user->hasOneRole('client')) {
            $profile = new ClientResource($user);
        }
        if ($user->hasRole('artisan')) {
            $profile = (new ArtisanResource($user));
        }
        if ($user->hasRole('admin')) {
            $profile = new AdminResource($user);
        }
        return [
            'success' => true,
            'user' => $profile,
            'token' => $token
        ];
    }

    public function verifierEmail(VerifierEmailDTO $verifierEmailDTO)
    {
        $user = $this->userDAO->verifierEmail($verifierEmailDTO);

        if ($user) {
            return [
                'success' => true,
                'user' => $user
            ];
        }
        return [
            'success' => false,
            'message' => 'Invalid verification code'
        ];
    }


    public function generateCode()
    {


        if (auth('api')->user()->email_verified_at) {
            return false;
        }

        $new_code = random_int(100000, 999999);
        auth('api')->user()->code_verification = $new_code;
        auth('api')->user()->save();
        SendVerificationEmail::dispatch(auth('api')->user());
        return true;
    }

    // forgetPassword
    public function forgetPassword($email)
    {
        $token = Str::random(64);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            [
                'token' => $token,
                'created_at' => now()
            ]
        );

        $resetLink = "http://localhost:5173/auth/reset-password/" . $token . "?email=" . urlencode($email);
        SendRestPasswordEmail::dispatch($email, $resetLink);

        return true;
    }
}
