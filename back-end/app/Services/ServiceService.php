<?php

namespace App\Services;

use App\DAO\ServiceDAO;

class ServiceService
{
    /**
     * Create a new class instance.
     */
    protected $serviceDAO;

    public function __construct(ServiceDAO $serviceDAO)
    {
        $this->serviceDAO = $serviceDAO;
    }
}
