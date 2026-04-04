<?php

namespace App\Http\Controllers;

use App\DTO\PaiementDTO;
use App\Http\Requests\PaiementRequest;
use App\Services\PaiementService;

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
}
