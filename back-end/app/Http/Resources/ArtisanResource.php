<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArtisanResource extends JsonResource
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
            'lastname' => $this->lastname,
            'firstname' => $this->firstname,
            'email' => $this->email,
            'city' => $this->city,
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at,
            'statut' => $this->client->statut ?? null,
            'phone' => $this->client->phone ?? null,
            'cin' => $this->client->cin ?? null,
            'avatar' => $this->client->avatar ?? null,
            'address' => $this->client->address ?? null,
            'rib' => $this->client->rib ?? null,
            'specialite' => $this->artisan->specialite ?? null,
            'bio' => $this->artisan->bio ?? null,
            'experience' => $this->artisan->experience ?? null,
            'is_verified' => $this->artisan ? (bool)$this->artisan->is_verified : false,
            'note' => $this->artisan->note ?? "0.0",
            'rayon_action' => $this->artisan->rayon_action ?? 0,
            // 'disponibilites' => DisponibiliteResource::collection($this->disponibilites),
            // 'services' => ServiceResource::collection($this->services)
        ];
    }
}
