<?php

namespace App\Http\Controllers;

use App\DTO\ServiceDTO;
use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Services\ServiceService;

class ServiceController extends Controller
{
    public function __construct(private ServiceService $serviceService)
    {
        //
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = $this->serviceService->getServices();
        return response()->json([
            'message' => 'Services found successfully',
            'data' => $services
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceRequest $request)
    {
        $dto = ServiceDTO::fromRequest($request);
        $images = $request->file('images') ?? [];
        $service = $this->serviceService->createService($dto, $images);
        return response()->json([
            'message' => 'Service created successfully',
            'data' => $service
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        $service = $this->serviceService->getServiceDetails($service->id);
        return response()->json([
            'message' => 'Service found successfully',
            'data' => $service
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }
}
