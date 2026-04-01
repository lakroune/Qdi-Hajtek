<?php

namespace App\Http\Controllers\Api;

use App\DTO\CategorieDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategorieRequest;
use App\Models\Categorie;
use App\Services\CategorieService;

class CategorieController extends Controller
{

    public function __construct(private CategorieService $categorieService)

    {
        // 
    }

    /**
     * Display a listing of the resource.
     */


    public function index()
    {
        $categories = $this->categorieService->listActiveCategories();
        return response()->json([
            'message' => 'Categories found successfully',
            'data' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategorieRequest $request)
    {
        $tdo = CategorieDTO::fromRequest($request);
        $categorie = $this->categorieService->createCategorie($tdo->toArray());
        return response()->json([
            'message' => 'Categorie created successfully',
            'data' => $categorie
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categorie $categorie)
    {
        $categorie = $this->categorieService->getCategoryDetails($categorie->id);
        return response()->json([
            'message' => 'Categorie found successfully',
            'data' => $categorie
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategorieRequest $request, int $categorieId)
    {
        $categorie = $this->categorieService->updateCategorie($categorieId, $request->all());
        return response()->json([
            'message' => 'Categorie updated successfully',
            'data' => $categorie
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Categorie $categorie)
    {
        //
    }
}
