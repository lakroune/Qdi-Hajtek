<?php

namespace App\Http\Controllers;

use App\DTO\PaiementDTO;
use App\Http\Requests\PaiementRequest;
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
        $data = [
            'num_facture' => 'FAC-' . date('Y') . '-001',
            'date' => date('d/m/Y'),
            'artisan_name' => 'Ismail Lakroune', 
            'artisan_email' => 'ismail@example.com',
            'client_name' => 'Ahmed Amine',
            'client_email' => 'ahmed@email.com',
            'items' => [
                ['description' => 'Réparation Plomberie', 'price' => 200],
                ['description' => 'Installation Robinet', 'price' => 150],
            ],
            'total' => 350
        ];

        $pdf = Pdf::loadView('pdf.facture', $data);

        return $pdf->download('facture_qdi_hajtek.pdf');
    }
}
