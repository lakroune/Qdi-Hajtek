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
    public function approve(int $artisanId)
    {
        // 
    }
}
