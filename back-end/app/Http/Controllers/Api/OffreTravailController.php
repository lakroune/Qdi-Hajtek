<?php

namespace App\Http\Controllers\Api;

use App\DTO\OffreTravailDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\StroreOffreTravailRequest;
use App\Services\OffreTravailService;
use Illuminate\Http\Request;

class OffreTravailController extends Controller
{

    public function __construct(
        private OffreTravailService $offreTravailService
    ) {
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
    public function store(StroreOffreTravailRequest $request)
    {

        $dto = OffreTravailDTO::fromRequest($request);
        $offreTravail = $this->offreTravailService->createOffreTravail($dto);
        return response()->json([
            'success' => true,
            'message' => 'Offre de travail created successfully',
            'data' => $offreTravail
        ]);
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
