<?php

namespace App\Http\Controllers;

use App\DAOs\ArtisanDAO;
use App\DTOs\ArtisanRegistrationDTO;
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
    public function store(StoreArtisanRequest $request, ArtisanDAO $artisanDAO)
    {
        $artisanDAO = ArtisanRegistrationDTO::fromRequest((object) $request->validated());
        $filePaths = [
            'cin_rec' => $request->file('cin_rec')->store('artisans/cin', 'public'),
            'cin_ver' => $request->file('cin_ver')->store('artisans/cin', 'public'),
            'rib_doc' => $request->file('rib_doc')->store('artisans/bank', 'public'),
            'diplomes' => [],
            'certificats' => [],
        ];
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
