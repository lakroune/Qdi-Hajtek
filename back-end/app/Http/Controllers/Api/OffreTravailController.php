<?php

namespace App\Http\Controllers\Api;

use App\DTO\OffreTravailDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\StroreOffreTravailRequest;
use App\Services\CategorieService;
use App\Services\OffreTravailService;
use Illuminate\Http\Request;

class OffreTravailController extends Controller
{

    public function __construct(
        private OffreTravailService $offreTravailService, private CategorieService $categorieService
    ) {
        // 
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            'success' => true,
            'message' => 'Offre de travail fetched successfully',
            'offres' => $this->offreTravailService->getAllOffreTravail(),
            'categories' => $this->categorieService->listActiveCategories()
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StroreOffreTravailRequest $request)
    {

        $dto = OffreTravailDTO::fromRequest($request);
        $photos = $request->file('photos') ?? [];

        $offreTravail = $this->offreTravailService->createOffreTravail($dto, $photos);
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
