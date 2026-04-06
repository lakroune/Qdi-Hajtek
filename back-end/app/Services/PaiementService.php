<?php

namespace App\Services;

use App\DAO\PaiementDAO;
use App\Http\Resources\PaiementResource;
use App\Models\Paiement;
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
                'amount' => $data['montant_total'] * 100,
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

    public function confirmPayment(string $stripe_payment_id)
    {
        $paiement = Paiement::where('stripe_payment_id', $stripe_payment_id)->firstOrFail();
        $paiement->statut = 'escrow';
        $paiement->paid_at = now();
        $paiement->save();
        return $paiement;
    }
    public  function getPaiements()
    {
        $paiements = $this->paiementDAO->getPaiements();
        return PaiementResource::collection($paiements);
    }
}
