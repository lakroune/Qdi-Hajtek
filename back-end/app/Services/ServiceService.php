<?php

namespace App\Services;

use App\DAO\ServiceDAO;
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

    public function createService(array $data, array $images = [])
    {
        try {
            $imageUrls = [];

            if (!empty($images)) {
                foreach ($images as $image) {
                    $path = $image->store('services', 'public');
                    $imageUrls[] = $path;
                }
            }

            return $this->serviceDAO->create($data, $imageUrls);
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
}
