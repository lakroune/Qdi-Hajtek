<?php

namespace App\Http\Controllers;

use App\Http\Requests\FavoriRequest;
use App\Models\Service;
use App\services\FavoriService;
use Illuminate\Http\Request;

class FavoriController extends Controller
{

    public function __construct(private FavoriService $favoriService)
    {
        //
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = $this->favoriService->getFavoris();
        return response()->json([
            'status' => true,
            'message' => 'Services found successfully',
            'data' => $services
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function favorieService($id)
    {
        $service = $this->favoriService->favorieService($id);
        return response()->json([
            'status' => true,
            'message' => 'Service found successfully',
            'data' => $service
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
