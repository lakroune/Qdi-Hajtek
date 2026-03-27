<?php

namespace App\Services;

use App\DAO\ArtisanDAO;

class ArtisanService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private ArtisanDAO $artisanDAO)
    {
        //
    }


    public function getArtisan(int $artisanId)
    {
        return $this->artisanDAO->getArtisan($artisanId);
    }
}
