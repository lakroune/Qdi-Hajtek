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

    public function update($id, $data)
    {
        return OffreTravail::where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return OffreTravail::where('id', $id)->delete();
    }

    public function find($id)
    {
        return OffreTravail::with('images', 'categorie', 'client.user', 'propositions.artisan.user.client')->findOrFail($id);
    }

    public function getAll()
    {
        return OffreTravail::with('categorie')->paginate(10);
    }
    public function findByClient($id)
    {
        return OffreTravail::where('client_id', $id)->with('categorie' )->withCount('propositions')->get();
    }
    public function findByCategorie($id)
    {
        return OffreTravail::where('categorie_id', $id)->get();
    }
}
