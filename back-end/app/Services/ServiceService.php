<?php

namespace App\Services;

use App\DAO\ServiceDAO;
use App\Http\Resources\ServiceResource;
use App\Http\Resources\ServicesManagementResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ServiceService
{
    /**
     * Create a new class instance.
     */
    protected $serviceDAO;

    public function __construct(ServiceDAO $serviceDAO)
    {
        $this->serviceDAO = $serviceDAO;
    }

    /**
     * Undocumented function
     *
     * @param array $data
     * @param array $images
     * @return void
     */

    public function createService($tdo, array $images = [])
    {
        try {
            $imageUrls = [];

            if (!empty($images)) {
                foreach ($images as $image) {
                    $path = $image->store('services', 'public');
                    $imageUrls[] = $path;
                }
            }

            return $this->serviceDAO->create($tdo->toArray(), $imageUrls);
        } catch (\Exception $e) {
            Log::error("Error creating service: " . $e->getMessage());

            if (!empty($imageUrls)) {
                foreach ($imageUrls as $url) {
                    Storage::disk('public')->delete($url);
                }
            }
            throw $e;
        }
    }

    public function getServiceDetails(int $serviceId)
    {
        return $this->serviceDAO->getServiceDetails($serviceId);
    }

    public function getServices(array $data)
    {
        $services = $this->serviceDAO->getServices($data);
        return ServiceResource::collection($services);
    }

    public function getServicesByManager(array $data)
    {
        $services = $this->serviceDAO->getServicesByManager($data);
        return ServicesManagementResource::collection($services);
    }


    public function approveService($serviceId)
    {
        return $this->serviceDAO->approveService($serviceId);
    }
    // rejectService
    public function rejectService($serviceId)
    {
        return $this->serviceDAO->rejectService($serviceId);
    }

    public function toggleService($serviceId)
    {
        return $this->serviceDAO->toggleService($serviceId);
    }
}
