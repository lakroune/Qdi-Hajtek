<?php

namespace App\services;

use App\DAO\AimerDAO;

class AimerService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private AimerDAO $aimerDAO)
    {
        //
    }

    public function aimer( int $serviceId)
    {
        return $this->aimerDAO->aimer( $serviceId);
    }
}
