<?php

namespace App\Services;

use App\DAO\PaiementDAO;
use Exception;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class  PaiementService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private  PaiementDAO $paiementDAO)
    {
        //
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function initiatePayment(array $data)
    {


        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $data['amount'] * 100,
                'currency' => 'mad',
                'metadata' => [
                    'conversation_id' => $data['conversation_id'],
                    'user_id' => $data['client_id'],
                ],
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);
            $this->paiementDAO->createPendingPayment($data, $paymentIntent->id);
            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
