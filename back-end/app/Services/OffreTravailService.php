<?php

namespace App\Services;

use App\DAO\OffreTravailDAO;
use App\DTO\OffreTravailDTO;

class OffreTravailService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private OffreTravailDAO $offreTravailDAO)
    {
        //
    }

    public function  createOffreTravail(OffreTravailDTO $offreTravailDTO)
    {
        return $this->offreTravailDAO->create($offreTravailDTO->toArray());
    }

    public function updateOffreTravail($id, OffreTravailDTO $offreTravailDTO)
    {
        return $this->offreTravailDAO->update($id, $offreTravailDTO->toArray());
    }
    public function deleteOffreTravail($id)
    {
        return $this->offreTravailDAO->delete($id);
    }

    public function findOffreTravail($id)
    {
        return $this->offreTravailDAO->find($id);
    }

    public function findAllOffreTravail()
    {
        return $this->offreTravailDAO->findAll();
    }

    public function findByClient($id)
    {
        return $this->offreTravailDAO->findByClient($id);
    }
}
