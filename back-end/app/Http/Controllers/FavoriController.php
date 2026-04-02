<?php

namespace App\Http\Controllers;

use App\Http\Requests\FavoriRequest;
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function favorieService(FavoriRequest $request)
    {
        return $this->favoriService->favorieService($request->validated('service_id'));
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
