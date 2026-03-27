<?php

namespace App\Http\Controllers;

use App\DAO\ArtisanDAO;
use App\DTO\ArtisanRegistrationDTO;
use App\Models\Artisan;
use App\Http\Requests\StoreArtisanRequest;
use App\Http\Requests\UpdateArtisanRequest;
use App\Services\ArtisanService;

class ArtisanController extends Controller
{

    public function __construct(private ArtisanService $artisanService)
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
    public function store(StoreArtisanRequest $request, ArtisanDAO $artisanDAO)
    {
        $dto = ArtisanRegistrationDTO::fromRequest((object) $request->validated());
        $filePaths = [
            'cin_rec' => $request->file('cin_rec')->store('artisans/cin', 'public'),
            'cin_ver' => $request->file('cin_ver')->store('artisans/cin', 'public'),
            'rib_doc' => $request->file('rib_doc')->store('artisans/bank', 'public'),
            'diplomes' => [],
            'certificats' => [],
        ];
        if ($request->hasFile('diplome_doc')) {
            foreach ($request->file('diplome_doc') as $file) {
                $filePaths['diplomes'][] = $file->store('artisans/diplomes', 'public');
            }
        }
        if ($request->hasFile('certificat_doc')) {
            foreach ($request->file('certificat_doc') as $file) {
                $filePaths['certificats'][] = $file->store('artisans/certificats', 'public');
            }
        }

        $artisan = $artisanDAO->createDommnde($dto, $filePaths);

        return response()->json([
            'success' => true,
            'message' => 'Artisan created successfully',
            'data' => $artisan
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Artisan $artisan)
    {
        $artisan = $this->artisanService->getArtisan($artisan->id);
        return response()->json([
            'success' =>  $artisan ? true : false,
            'message' => $artisan ? 'Artisan found successfully' : 'Artisan not found',
            'data' => $artisan
        ]);
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
