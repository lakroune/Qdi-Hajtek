<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OffreTravailDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titre' => $this->titre,
            'description' => $this->description,
            'budget_estime' => $this->budget_estime,
            'preferred_date' => $this->preferred_date,
            'statut' => $this->statut,
            'niveau_urgence' => $this->niveau_urgence,
            'ville' => $this->ville,
            'address' => $this->address,
            'is_completed' => (bool) $this->is_completed,
            'created_at' => $this->created_at->diffForHumans(),

            'categorie' => [
                'id' => $this->categorie->id,
                'nom' => $this->categorie->nom_categorie,
            ],

            'client' => [
                'id' => $this->client->id,
                'nom_complet' => $this->client->user->firstname . ' ' . $this->client->user->lastname,
                'ville' => $this->client->user->city,
                'avatar' => $this->client->avatar, // 
            ],

            'images' => ImageResource::collection($this->images),
            'has_propositions' => $this->whenNotNull($this->propositions_count),
            'propositions' => PropositionResource::collection($this->whenLoaded('propositions')),

        ];
    }
}
