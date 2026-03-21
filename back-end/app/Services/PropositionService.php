<?php

namespace App\Services;

use App\DAO\PropositionDAO;
use App\DTO\PropositionDTO;

class PropositionService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private PropositionDAO  $propositionDAO)
    {
        //
    }

    public function createProposition(PropositionDTO $propositionDTO)
    {
        return $this->propositionDAO->create($propositionDTO->toArray());
    }
}
