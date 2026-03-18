<?php

namespace App\DAO;

use App\DTO\Auth\RegisterDTO;
use App\Models\Client;

class ClientDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function create(int $userId, string $cin): Client
    {
        return Client::create(
            [
                'id' => $userId,
                'cin' => $cin
            ]
        );
    }
    public function update(int $userId, array $data): Client
    {
        return Client::where('id', $userId)->update($data);
    }
}
