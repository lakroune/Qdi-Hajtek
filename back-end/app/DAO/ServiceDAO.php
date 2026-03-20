<?php

namespace App\DAO;

use App\Models\Service;
use Illuminate\Support\Facades\DB;

class ServiceDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function create(array $data, array $imageUrls)
    {
        return DB::transaction(function () use ($data, $imageUrls) {
            $data['artisan_id'] = auth('api')->user()->id;
            $service = Service::create($data);

            foreach ($imageUrls as $path) {
                $service->images()->create([
                    'url' => $path
                ]);
            }

            return $service->load('images');
        });
    }
}
