<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ServicesManagementResource extends JsonResource
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
            'title' => $this->titre,
            'description' => $this->description,

            'pricing' => [
                'amount' => (float) $this->tarif,
                'unit' => $this->type_tarif, // e.g., prix_m2
                'currency' => 'MAD',
            ],
            'duration' => [
                'estimated' => $this->estimation_duree . ' jours',
                'material_included' => $this->material ?? 'Non spécifié',
            ],

            'status' => [
                'is_active' => (bool) $this->is_active,
                'statut' => (string) $this->statut,
            ],

            'artisan' => new ArtisanResource($this->artisan->user),

            'category' => [
                'id' => $this->categorie['id'] ?? null,
                'name' => $this->categorie['nom_categorie'] ?? null,
                'icon' => $this->categorie['icon_url'] ?? 'default',
            ],

            'gallery' => collect($this->images ?? [])->map(function ($image) {
                return [
                    'id' => $image['id'],
                    'url' => $image['url'],
                ];
            }),

            'dates' => [
                'created_at' => Carbon::parse($this->created_at)->format('d/m/Y H:i'),
                'human' => Carbon::parse($this->created_at)->diffForHumans(),
            ],
        ];
    }
}
