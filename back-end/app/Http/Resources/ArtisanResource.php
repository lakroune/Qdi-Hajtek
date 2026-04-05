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
            'specialite' => $this->specialite,
            'bio' => $this->bio,
            'experience' => $this->experience,
            'is_verified' => (bool) $this->is_verified,
            'note' => $this->note,
            'rayon_action' => $this->rayon_action,
            
            // Détails de l'utilisateur
            'user' => [
                'id' => $this->user->id,
                'firstname' => $this->user->firstname,
                'lastname' => $this->user->lastname,
                'email' => $this->user->email,
                'city' => $this->user->city,
            ],
        ];
    }
}
