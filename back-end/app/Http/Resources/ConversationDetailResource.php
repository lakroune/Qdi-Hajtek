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
                'id'               => $this->paiement->id,
                'stripe_payment_id' => $this->paiement->stripe_payment_id,
                'montant_total'    => (float) $this->paiement->montant_total,
                'commission_admin' => (float) $this->paiement->commission_admin,
                'montant_artisan'  => (float) $this->paiement->montant_artisan,
                'devise'           => $this->paiement->devise,
                'statut'           => $this->paiement->statut,
                'paid_at'          => $this->paiement->paid_at,
                'released_at'      => $this->paiement->released_at,
            ] : null,

            'evaluation' => $this->evaluation ? [
                'id'         => $this->evaluation->id,
                'rating'     => $this->evaluation->rating,
                'comment'    => $this->evaluation->comment,
                'created_at' => $this->evaluation->created_at,
            ] : null,

            'details' => [
                'title' => $conversable->service?->titre ?? $conversable->offre_travail?->titre ?? $this->subject,
                'description' => $conversable->description_specifique ?? $conversable->message_explicatif ?? null,
            ]
        ];
    }
}
