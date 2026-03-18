<?php

namespace App\DTO\Auth;

class LoginDTO
{

    public $data;
    /**
     * Create a new class instance.
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }
}
