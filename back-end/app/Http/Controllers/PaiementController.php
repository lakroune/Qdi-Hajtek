<?php

namespace App\Http\Controllers;

use App\DTO\PaiementDTO;
use App\Http\Requests\PaiementRequest;
use App\Http\Resources\DataFactureResource;
use App\Models\Conversation;
use App\Services\PaiementService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

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
        $conversation = Conversation::find($request->conversation_id);
        Gate::authorize('pay-conversation', $conversation);
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


    public function downloadFacture($id)
    {
        $data = $this->paiementService->getPaiementByConversationId($id);

        $pdf = Pdf::loadView('pdf.facture', ['data' =>( new DataFactureResource($data))->resolve()]);

        return $pdf->download('facture_qdi_hajtek.pdf');
    }
}
