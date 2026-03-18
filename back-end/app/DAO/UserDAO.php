<?php

namespace App\DAO;

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
            [
                'lastname' => $registerDTO->lastname,
                'firstname' => $registerDTO->firstname,
                'email' => $registerDTO->email,
                'password' => bcrypt($registerDTO->password),
                'city' => $registerDTO->city
            ]
        );
    }
}
