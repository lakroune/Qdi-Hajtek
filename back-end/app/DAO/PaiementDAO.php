<?php

namespace App\DAO;

use App\Models\Conversation;
use App\Models\DemandeDirecte;
use App\Models\Paiement;
use App\Models\Proposition;

class PaiementDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function createPendingPayment(array $data, string $paymentIntentId)
    {
        $conversation = Conversation::findOrFail($data['conversation_id']);
        return $conversation->paiement()->updateOrCreate([
            'conversation_id' => $data['conversation_id'],
        ], [
            'montant' => $data['amount'],
            'client_id' => $data['client_id'],
            'stripe_payment_id' => $paymentIntentId,
        ]);
    }

    public function getPaiements()
    {
        return $paiements = Paiement::with([
            'conversation.conversable' => function ($query) {
                $query->morphWith([
                    Proposition::class => ['artisan.user'],
                    DemandeDirecte::class => ['service.artisan.user']
                ]);
            }
        ],'client.user')
            ->where('statut', 'paid')
            ->get();
    }
}
