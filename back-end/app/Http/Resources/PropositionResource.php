<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropositionResource extends JsonResource
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
            'artisan_id' => $this->artisan_id,
            'prix_propose' => $this->prix_propose,
            'delai_execution' => $this->delai_execution,
            'message_explicatif' => $this->message_explicatif,
            'date_debut' => $this->date_debut,
            'statut' => $this->statut,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'artisan' => [
                'name' => $this->whenLoaded('artisan', function () {
                    return $this->artisan->user->firstname . ' ' . $this->artisan->user->lastname;
                }),
                'avatar' => $this->whenLoaded('artisan', function () {
                    return url($this->artisan->user->client->avatar);
                }),
                'note' => 0,
                'specialite' => $this->artisan->specialite
            ],
        ];
    }
}
