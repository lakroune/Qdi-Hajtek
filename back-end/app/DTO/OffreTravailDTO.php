<?php

namespace App\DTO;

use Symfony\Component\HttpFoundation\Request;

class OffreTravailDTO
{
    /**
     * Create a new class instance.
     */

    public function __construct(
        public int $clientId,
        public int $categorieId,
        public string $titre,
        public string $description,
        public float $budgetEstime,
        public ?string $datePreferred,
        public string $niveauUrgence,
        public string $ville,
        public string $address,
        public string $statut = 'en_cours',
        public bool $is_completed = false
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
            datePreferred: $request->validated('preferred_date'),
            ville: $request->validated('ville'),
            address: $request->validated('address'),
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
            'preferred_date' => $this->datePreferred,
            'niveau_urgence' => $this->niveauUrgence,
            'ville' => $this->ville,
            'address' => $this->address
        ];
    }
}
