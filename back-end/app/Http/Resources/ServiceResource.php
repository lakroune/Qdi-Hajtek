<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
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
            'tarif' => $this->tarif,
            'type_tarif' => $this->type_tarif,
            'statut' =>  $this->statut,
            'is_active' => (bool) $this->is_active,
            'estimation_duree' => $this->estimation_duree,
            'material' => $this->material,
            'created_at' => $this->created_at,
            'is_favori' => (bool) $this->is_favorited,
            'artisan' => new ArtisanResource($this->artisan->user),
            'categorie' =>   new CategorieResource($this->whenLoaded('categorie')),
            'images' =>  ImageResource::collection($this->whenLoaded('images')),
        ];
    }
}
