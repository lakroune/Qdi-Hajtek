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
    public function getServiceDetails(int $serviceId)
    {
        return Service::with(['images', 'artisan.user.client', 'categorie'])->where('is_active', true)->findOrFail($serviceId);
    }
    public  function getServices(array $filters = [])
    {
        $query = Service::query()
            ->where('is_active', true)
            ->with(['artisan.user', 'categorie', 'images']);

        if (!empty($filters['search'])) {
            $query->where('titre', 'like', '%' . $filters['search'] . '%')
                ->orWhere('description', 'like', '%' . $filters['search'] . '%');
        }
        if (!empty($filters['category'])) {
            $query->where('categorie_id', $filters['category']);
        }
        // if (!empty($filters['rating'])) {
        //     $query->whereHas('artisan', function ($q) use ($filters) {
        //         $q->where('note', '>=', $filters['rating']);
        //     });
        // }
        if (!empty($filters['price'])) {
            $query->where('tarif', '<=', $filters['price']);
        }
        return $query->latest()->get();
    }
}
