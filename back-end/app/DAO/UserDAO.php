<?php

namespace App\DAO;

use App\DTO\Auth\LoginDTO;
use App\DTO\Auth\RegisterDTO;
use App\DTO\Auth\VerifierEmailDTO;
use App\Models\User;

use function Illuminate\Support\now;

class UserDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct() {}

    public function createFromRegisterDTO(RegisterDTO $registerDTO)
    {

        return User::create(
            $registerDTO->data
        );
    }

    public function login(LoginDTO $loginDTO)
    {
        return User::where('email', $loginDTO->data['email'])->first();
    }

    public function verifierEmail(VerifierEmailDTO $verifierEmailDTO)
    {
        $user = User::where('email', auth('api')->user()->email)->first();

        if ($user->code_verification == $verifierEmailDTO->data['code_verification']) {
            $user->email_verified_at = now();
            $user->save();
            return $user;
        }
        return null;
    }
}
