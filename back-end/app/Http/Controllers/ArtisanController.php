<?php

namespace App\Http\Controllers;

use App\Models\Artisan;
use App\Http\Requests\StoreArtisanRequest;
use App\Http\Requests\UpdateArtisanRequest;

class ArtisanController extends Controller
{
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
    public function store(StoreArtisanRequest $request)
    {
        $data = $request->validated();
    }

    /**
     * Display the specified resource.
     */
    public function show(Artisan $artisan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArtisanRequest $request, Artisan $artisan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Artisan $artisan)
    {
        //
    }
}
