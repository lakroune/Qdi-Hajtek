<?php

namespace App\DAO;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getActiveCategories()
    {
        return Categorie::where('is_active', true)
            // ->withCount('services')
            ->get();
    }
    public function findById(int $id)
    {
        return Categorie::findOrFail($id);
    }
    public function findWithServices(int $id)
    {
        return Categorie::
        // with(['services.images', 'services.artisan.user'])->
        findOrFail($id);
    }
    public function create(array $data)
    {
        return Categorie::create($data);
    }

    public function update(int $id, array $data)
    {
        $categorie = $this->findById($id);
        $categorie->update($data);
        return $categorie;
    }
}
