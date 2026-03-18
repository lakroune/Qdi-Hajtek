<?php

namespace App\Services;

use App\DAO\ClientDAO;
use App\DAO\UserDAO;
use App\DTO\Auth\RegisterDTO;
use App\Jobs\SendVerificationEmail;
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
        $this->clientDAO->create($user->id, $registerDTO->city);

        if (! $user->assignRole('client')) {
            return  null;
        }
        $code = random_int(100000, 999999);
        $user->code_verification = $code;
        $user->save();

        $token = JWTAuth::claims([
            'exp' => now()->addHours(50)->timestamp
        ])->fromUser($user);

        SendVerificationEmail::dispatch($user);
        return  [
            'user' => $user,
            'token' => $token
        ];
    }
}
