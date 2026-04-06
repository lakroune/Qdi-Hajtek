<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ServiceService;
use Illuminate\Http\Request;

class ServiceManagerController extends Controller
{
    private $serviceService;
    public function __construct(ServiceService $serviceService)
    {
        $this->serviceService = $serviceService;
    }


    public function index(Request $request)
    {
        $services = $this->serviceService->getServicesByManager($request->all());
        return  $services
            ->response()
            ->setStatusCode(200);
    }
    public function approve(int $servicesId)
    {
        $service = $this->serviceService->approveService($servicesId);
        return response()->json([
            'success' =>  $service ? true : false,
            'message' => $service ? 'Service approved successfully' : 'Service not found',
            'data' => $service
        ], $service ? 200 : 404);
    }

    // reject
    public function reject(int $servicesId)
    {
        $service = $this->serviceService->rejectService($servicesId);
        return response()->json([
            'success' =>  $service ? true : false,
            'message' => $service ? 'Service rejected successfully' : 'Service not found',
            'data' => $service
        ], $service ? 200 : 404);
    }
}
