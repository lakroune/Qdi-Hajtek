<?php

namespace App\DAO;

use App\Models\Client;

class FavoriDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function favorieService(int $serviceId)
    {
        $client =Client::find(auth()->user()->id);
        return $client->services()->toggle($serviceId);
    }
}
