<?php

namespace App\DAO;

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
        return Paiement::create([
            'amount' => $data['amount'],
            'client_id' => $data['client_id'],
            'conversation_id' => $data['conversation_id'],
            'payment_intent_id' => $paymentIntentId,
        ]);
    }
}
