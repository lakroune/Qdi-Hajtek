<?php

namespace App\DAO;

use App\Models\Conversation;
use App\Models\Paiement;

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
}
