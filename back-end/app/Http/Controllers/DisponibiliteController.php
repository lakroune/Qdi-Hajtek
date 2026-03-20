<?php

namespace App\Http\Controllers;

use App\Models\Disponibilite;
use App\Http\Requests\StoreDisponibiliteRequest;
use App\Http\Requests\UpdateDisponibiliteRequest;
use App\Services\DisponibiliteService;

class DisponibiliteController extends Controller
{

    private $dispoService;

    public function __construct(DisponibiliteService $dispoService)
    {
        $this->dispoService = $dispoService;
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
    public function store(StoreDisponibiliteRequest $request)
    {

        $result = $this->dispoService->saveHoraire(
            auth()->user()->id,
            $request->validated()['horaires']
        );

        return response()->json([
            'message' => 'Disponibilitees saved successfully',
            'data' => $result
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
    $horiraires = $this->dispoService->getFormattedDisponibilites(auth()->user()->id);

        return response()->json([
            'message' => 'Disponibilitees saved successfully',
            'data' => $horiraires
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDisponibiliteRequest $request, Disponibilite $disponibilite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Disponibilite $disponibilite)
    {
        //
    }
}
