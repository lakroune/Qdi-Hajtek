<?php

namespace App\DAO;

use App\Models\OffreTravail;
use Illuminate\Support\Facades\DB;

class OffreTravailDAO
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
            $offre = OffreTravail::create($data);
            foreach ($imageUrls as $path) {
                $offre->images()->create([
                    'url' =>    $path
                ]);
            }
            return $offre->load('images');
        });
    }

    public function update($id, $status)
    {
        return OffreTravail::where('id', $id)->update([
            'statut' => $status,
        ]);
    }

    public function delete($id)
    {
        return OffreTravail::where('id', $id)->delete();
    }

    public function find($id)
    {
        return OffreTravail::with([
            'images',
            'categorie',
            'client.user',
            'propositions' => function ($prop) {
                $prop->where('statut', 'ouvert')->with('artisan.user.client');
            }
        ])->where('statut', 'ouvert')
            ->findOrFail($id);
    }

    public function getAll($request)
    {
        $query = OffreTravail::query()
            ->with(['categorie', 'client.user', 'categorie'])
            ->where('statut', 'ouvert');
        if ($request->filled('categorie')) {
            $query->where('categorie_id', $request->categorie);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('titre', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }
        $offres = $query->latest()
            ->paginate(12);

        return $offres;
    }


    public function findByClient($id)
    {
        return OffreTravail::where('client_id', $id)
            ->with('categorie')
            ->withCount('propositions')
            ->paginate(8);
    }
    public function findByCategorie($id)
    {
        return OffreTravail::where('categorie_id', $id)->get();
    }
}
