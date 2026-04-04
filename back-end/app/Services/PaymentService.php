<?php

namespace App\Services;

use App\DAO\PaymentDAO;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class PaymentService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private  PaymentDAO $paymentDAO)
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
                    'user_id' => auth()->user()->id,
                ],
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
