<?php

namespace App\DTO;

use Symfony\Component\HttpFoundation\Request;

class OffreTravailDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly int $clientId,
        public readonly int $categorieId,
        public readonly string $titre,
        public readonly string $description,
        public readonly float $budgetEstime,
        public readonly string $dateLimite,
        public readonly string $typeRemuneration,
        public readonly string $niveauUrgence,
        public readonly string $statut = 'ouvert'

    ) {
        //
    }

    public static function  fromRequest(Request $request)
    {
        // 
    }

    public function toArray()
    {
        // 
    }
}
