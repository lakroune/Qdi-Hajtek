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
        return [
            'id' => $this->id,
            'subject' => $this->subject,
            'conversable_type' => str_replace('App\\Models\\', '', $this->conversable_type),
            'status' => $this->conversable->statut ?? 'unknown',

            'payment' => $this->paiement ? [
                'id' => $this->paiement->id,
                'amount' => $this->paiement->montant,
                'currency' => strtoupper($this->paiement->devise),
                'status' => $this->paiement->statut,
                'stripe_id' => $this->paiement->stripe_payment_id,
            ] : null,

            'service' => $this->conversable && $this->conversable->service ? [
                'id' => $this->conversable->service->id,
                'title' => $this->conversable->service->titre,
                'base_price' => $this->conversable->service->tarif,
            ] : null,
        ];
    }
}
