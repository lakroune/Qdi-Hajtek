<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OffreTravailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titre' => $this->titre,
            'description' => $this->description,
            'budget' => $this->budget_estime,
            'ville' => $this->ville,
            'adresse' => $this->address,
            'statut' => $this->statut,
            'urgence' => $this->niveau_urgence,
            'date_preferee' => $this->preferred_date,
            'est_complete' => (bool) $this->is_completed,
            'nombre_propositions' => $this->propositions_count ?? 0,

            'categorie' => [
                'id' => $this->categorie?->id,
                'nom' => $this->categorie?->nom_categorie,
                'icon' => $this->categorie?->icon_url,
            ],

            'cree_le' => $this->created_at?->format('Y-m-d H:i'),
        ];
    }
}
