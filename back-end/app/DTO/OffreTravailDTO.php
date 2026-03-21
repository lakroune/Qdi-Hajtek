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
        public readonly string $statut = 'en_cours',
        public readonly bool $is_completed = false

    ) {
        //
    }

    public static function  fromRequest($request)
    {
        return new self(
            clientId: $request->user()->client->id,
            categorieId: $request->validated('categorie_id'),
            titre: $request->validated('titre'),
            description: $request->validated('description'),
            budgetEstime: $request->validated('budget_estime'),
            dateLimite: $request->validated('date_limite'),
            typeRemuneration: $request->validated('type_remuneration'),
            niveauUrgence: $request->validated('niveau_urgence'),
        );
    }

    public function toArray()
    {
        return [
            'client_id' => $this->clientId,
            'categorie_id' => $this->categorieId,
            'titre' => $this->titre,
            'description' => $this->description,
            'budget_estime' => $this->budgetEstime,
            'date_limite' => $this->dateLimite,
            'type_remuneration' => $this->typeRemuneration,
            'niveau_urgence' => $this->niveauUrgence,
            'statut' => $this->statut,
            'is_completed' => $this->is_completed
        ];
    }
}
