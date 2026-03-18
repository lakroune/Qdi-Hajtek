<?php

namespace App\DTO\Auth;

class RegisterDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public string $lastname,
        public string $firstname,
        public string $email,
        public string $password,
        public string $cin,
        public string $city
    ) {}
}
