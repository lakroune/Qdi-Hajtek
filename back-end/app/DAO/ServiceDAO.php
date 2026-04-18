<?php

namespace App\DAO;

use App\Models\Client;
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
        return Service::with(['images', 'artisan.user.client', 'categorie'])
            ->where('is_active', true)
            ->where('statut', 'approuve')->findOrFail($serviceId);
    }
    public function getServices(array $filters = [])
    {
        $query = Service::query()
            ->select('services.*')
            ->where('services.is_active', true)
            ->where('services.statut', 'approuve')
            ->with(['artisan.user', 'categorie', 'images']);

        if (auth('api')->check()) {
            $userId = auth('api')->id();

            $query->withExists(['clients as is_favorited' => function ($q) use ($userId) {
                $q->where('favoris.client_id', $userId);
            }]);
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('services.titre', 'ilike', '%' . $search . '%') // استخدم ilike لـ Postgres
                    ->orWhere('services.description', 'ilike', '%' . $search . '%')
                    ->orWhereHas('artisan.user', function ($q2) use ($search) {
                        $q2->where('firstname', 'ilike', '%' . $search . '%')
                            ->orWhere('lastname', 'ilike', '%' . $search . '%')
                            ->orWhere('city', 'ilike', '%' . $search . '%');
                    });
            });
        }

        if (!empty($filters['category'])) {
            $query->where('services.categorie_id', $filters['category']);
        }

        if (!empty($filters['price'])) {
            $query->where('services.tarif', '<=', $filters['price']);
        }

        $query->join('artisans', 'services.artisan_id', '=', 'artisans.id');

        if (!empty($filters['rating'])) {
            $query->where('artisans.note', '>=', $filters['rating'])
                ->orderByDesc('artisans.nb_offres');
        } else {
            $query->orderByRaw('(artisans.note * artisans.nb_offres) DESC');
        }

        return $query->paginate(8);
    }
    public function favorieService(int $serviceId)
    {
        $client = Client::find(auth()->user()->id);
        return $client->services()->toggle($serviceId);
    }

    public function getServicesByManager(array $filters = [])
    {
        $query = Service::query()
            ->with(['artisan.user', 'categorie', 'images']);

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('titre', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
                $q->orWhereHas('artisan', function ($q2) use ($search) {
                    $q2->whereHas('user', function ($q3) use ($search) {
                        $q3->where('firstname', 'like', '%' . $search . '%')
                            ->orWhere('lastname', 'like', '%' . $search . '%')
                            ->orWhere('city', 'like', '%' . $search . '%');
                    });
                });
            });
        }

        if (!empty($filters['statut'])) {
            $query->where('statut', $filters['statut']);
        }

        return $query->latest()->paginate(10);
    }


    public function approveService(int $serviceId)
    {
        return Service::where('id', $serviceId)->update(['statut' => 'approuve']);
    }

    public function rejectService(int $serviceId)
    {
        return Service::where('id', $serviceId)->update(['statut' => 'refuse']);
    }

    public function toggleService(int $serviceId)
    {
        return Service::where('id', $serviceId)->update(['is_active' => !Service::find($serviceId)->is_active]);
    }

    // getFavoris
    public function getFavoris()
    {
        $client = Client::find(auth('api')->user()->id);
        return $client->services()->with([  'categorie', 'images'])->get();
    }
}
