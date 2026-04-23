<?php

namespace App\Http\Controllers;

use App\DTO\ServiceDTO;
use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Services\ServiceService;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function __construct(private ServiceService $serviceService)
    {
        //
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $services = $this->serviceService->getServices($request->all());
        return  $services
            ->response()
            ->setStatusCode(200);
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
     * toggle   service (activer et desactiver)
     */
    public function toggle(Service $service)
    {
        $service = $this->serviceService->toggleService($service->id);
        return response()->json([
            'message' => 'Service toggled successfully',
            'data' => $service
        ]);
    }
    public function edit(int $id)
    {
        $service = $this->serviceService->getServiceDetails($id);
        return response()->json([
            'message' => 'Service found successfully',
            'data' => $service
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, int $id)
    {
        $dto = ServiceDTO::fromRequest($request);
        $images = $request->file('images') ?? [];
        $service = $this->serviceService->updateService($id, $dto, $images);
        return response()->json([
            'message' => 'Service updated successfully',
            'data' => $service
        ]);
    }

    public function destroy(Service $service)
    {
        $service = $this->serviceService->deleteService($service->id);
        return response()->json([
            'message' => 'Service deleted successfully',
            'data' => $service
        ]);
    }
}
