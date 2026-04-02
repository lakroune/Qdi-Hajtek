<?php

namespace App\services;

use App\DAO\FavoriDAO;
use App\DAO\ServiceDAO;

class FavoriService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private ServiceDAO $serviceDAO)
    {
        //
    }

    public function favorieService(int $serviceId)
    {
        return $this->serviceDAO->favorieService($serviceId);
    }
}
