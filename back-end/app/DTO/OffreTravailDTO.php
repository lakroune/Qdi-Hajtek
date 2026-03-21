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
            categorieId: $request->valivalidated('categorie_id'),
            titre: $request->valivalidated('titre'),
            description: $request->valivalidated('description'),
            budgetEstime: $request->valivalidated('budget_estime'),
            dateLimite: $request->valivalidated('date_limite'),
            typeRemuneration: $request->valivalidated('type_remuneration'),
            niveauUrgence: $request->valivalidated('niveau_urgence'),
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
