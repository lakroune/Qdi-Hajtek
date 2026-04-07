<?php

namespace App\Http\Controllers\Api;

use App\DTO\OffreTravailDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\StroreOffreTravailRequest;
use App\Http\Resources\OffreTravailResource;
use App\Services\CategorieService;
use App\Services\OffreTravailService;
use Illuminate\Http\Request;

class OffreTravailController extends Controller
{

    public function __construct(
        private OffreTravailService $offreTravailService,
        private CategorieService $categorieService
    ) {
        // 
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offreTravails =   $this->offreTravailService->getAllOffreTravail();
        return OffreTravailResource::collection($offreTravails);
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
            'success' => $offreTravail ? true : false,
            'message' =>  $offreTravail ? 'Offre de travail created successfully' : 'Offre de travail not created',
            'data' => $offreTravail
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $offreTravail = $this->offreTravailService->findOffreTravail($id);
        return response()->json([
            'success' => $offreTravail ? true : false,
            'message' =>  $offreTravail ? 'Offre de travail fetched successfully' : 'Offre de travail not found',
            'data' => $offreTravail
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'status' => 'required|in:complete,annule'
        ]);
        $offreTravail = $this->offreTravailService->updateOffreTravail($id, $data['status']);
        return response()->json([
            'success' => $offreTravail ? true : false,
            'message' =>  $offreTravail ? 'Offre de travail updated successfully' : 'Offre de travail not updated',
            'data' => $offreTravail
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function mesOffres()
    {
        return $this->offreTravailService->findByClient(auth()->user()->id);
    }
}
