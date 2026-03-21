<?php

namespace App\Services;

use App\DAO\PropositionDAO;
use App\DTO\PropositionDTO;
use App\Events\PropositionAccepted;
use App\Events\PropositionCreated;

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
        $proposition = $this->propositionDAO->create($propositionDTO->toArray());

        event(new PropositionCreated($proposition));
        return $proposition;
    }

    public function acceptProposition(int $id)
    {
        $proposition = $this->propositionDAO->acceptProposition($id);
        event(new PropositionAccepted($proposition));
        return $proposition;
    }
}
