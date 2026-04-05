<?php

namespace App\Http\Controllers;

use App\DTO\PaiementDTO;
use App\Http\Requests\PaiementRequest;
use App\Services\PaiementService;
use Illuminate\Http\Request;

class PaiementController extends Controller
{

    public function __construct(private PaiementService $paiementService)
    {
        //
    }
    /**
     * Display a listing of the resource.
     */
    public function initiate(PaiementRequest $request)
    {
        $dto = PaiementDTO::fromRequest($request);
        return $this->paiementService->initiatePayment($dto->toArray());
    }

    public function confirm(Request $request)
    {
        $data = $request->validate([
            'stripe_payment_id' => 'required|string',
        ]);
        return $this->paiementService->confirmPayment($data['stripe_payment_id']);
    }

    public function getPaiementByConversationId(int $id)
    {
        // return Paiement::where('conversation_id', $id)->first();
    }

    public function getPaiements()
    {
        return $this->paiementService->getPaiements();
    }
}
