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

    public function getArtisans()
    {
        return $this->artisanDAO->getArtisans();
    }

    public function approveArtisan(int $artisanId)
    {
        return $this->artisanDAO->approveArtisan($artisanId);
    }

    public function rejectArtisan(int $artisanId)
    {
        return $this->artisanDAO->rejectArtisan($artisanId);
    }
}
