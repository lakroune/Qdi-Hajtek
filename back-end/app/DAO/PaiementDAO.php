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
            'montant' => $data['amount'],
            'client_id' => $data['client_id'],
            'conversation_id' => $data['conversation_id'],
            'stripe_payment_id' => $paymentIntentId,
        ]);
    }
}
