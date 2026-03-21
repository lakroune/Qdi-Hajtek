<?php

namespace App\Http\Controllers\Api;

use App\DTO\PropositionDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePropositionRequest;
use App\Services\PropositionService;
use Illuminate\Http\Request;

class PropositionController extends Controller
{

    public function __construct(private PropositionService $propositionService)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropositionRequest $request)
    {
        $dto = PropositionDTO::fromRequest($request);

        return $this->propositionService->createProposition($dto);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
