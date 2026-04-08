<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $conversable = $this->conversable;

        $prixFinal = $conversable->prix_final ?? $conversable->prix_propose ?? 0;

        $adresse = $conversable->adresse ?? $conversable->offre_travail?->address ?? null;

        return [
            'id' => $this->id,
            'subject' => $this->subject,
            'type' => str_replace('App\\Models\\', '', $this->conversable_type),
            'status' => $conversable->statut ?? 'unknown',
            'is_completed' => (bool)($conversable->is_completed ?? false),
            'confirmation_code' => $conversable->code_confirmation ?? null,
            'prix_final' => (float)$prixFinal,
            'adresse' => $adresse,

            'payment' => $this->paiement ? [
                'id' => $this->paiement->id,
                'total_amount' => $this->paiement->montant_total,
                'status' => $this->paiement->statut,
                'paid_at' => $this->paiement->paid_at,
            ] : null,

            'details' => [
                'title' => $conversable->service?->titre ?? $conversable->offre_travail?->titre ?? $this->subject,
                'description' => $conversable->description_specifique ?? $conversable->message_explicatif ?? null,
            ]
        ];
    }
}
