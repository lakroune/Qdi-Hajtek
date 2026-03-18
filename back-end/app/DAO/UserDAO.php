<?php

namespace App\DAO;

use App\DTO\Auth\LoginDTO;
use App\DTO\Auth\RegisterDTO;
use App\Models\User;

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
}
