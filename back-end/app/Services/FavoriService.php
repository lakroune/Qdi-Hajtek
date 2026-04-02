<?php

namespace App\services;

use App\DAO\FavoriDAO;

class FavoriService
{
    /**
     * Create a new class instance.
     */
    public function __construct( private FavoriDAO $favoriDAO)
    {
        //
    }
    
    public function favorieService(int $serviceId)
    {
        return $this->favoriDAO->favorieService($serviceId);
    }
}
