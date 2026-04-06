<?php

namespace App\Http\Controllers\Api;

use App\DTO\DemandeDirecteDTO;
use App\Http\Controllers\Controller;
use App\Models\DemandeDirecte;
use App\Http\Requests\StoreDemandeDirecteRequest;
use App\Http\Requests\UpdateDemandeDirecteRequest;
use App\Services\DemandeDirecteService;

class DemandeDirecteController extends Controller
{
    public function __construct(private DemandeDirecteService $demandeDirecteService)
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
    public function store(StoreDemandeDirecteRequest $request)
    {
        $dto = DemandeDirecteDTO::fromRequest($request);
        $demandeDirecte = $this->demandeDirecteService->createDemandeDirecte($dto);
        if ($demandeDirecte) {
            return response()->json([
                'status' => 'success',
                'message' => 'Demande directe created successfully',
            ], 201);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Demande directe not created'
        ], 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(DemandeDirecte $demandeDirecte)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDemandeDirecteRequest $request, DemandeDirecte $demandeDirecte)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DemandeDirecte $demandeDirecte)
    {
        //
    }
}
