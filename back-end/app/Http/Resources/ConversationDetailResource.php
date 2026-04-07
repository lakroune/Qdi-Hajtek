<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $conversable = $this->conversable;

        return [
            'id' => $this->id,
            'subject' => $this->subject,
            'type' => str_replace('App\\Models\\', '', $this->conversable_type),
            'status' => $conversable->statut ?? 'unknown',

            'is_completed' => (bool)($conversable->is_completed ?? false),
            'confirmation_code' => $conversable->code_confirmation ?? null,

            'payment' => $this->paiement ? [
                'id' => $this->paiement->id,
                'total_amount' => $this->paiement->montant_total,
                'artisan_amount' => $this->paiement->montant_artisan,
                'currency' => strtoupper($this->paiement->devise),
                'status' => $this->paiement->statut,
                'paid_at' => $this->paiement->paid_at,
            ] : null,

            'service' => $conversable && $conversable->service ? [
                'id' => $conversable->service->id,
                'title' => $conversable->service->titre,
                'price' => $conversable->service->tarif,
            ] : null,
        ];
    }
}
