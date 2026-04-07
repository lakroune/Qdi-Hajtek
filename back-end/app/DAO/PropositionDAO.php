<?php

namespace App\DAO;

use App\Models\Proposition;

class PropositionDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create(array $data)
    {
        return Proposition::create($data);
    }

    public function update(int $id, array $data)
    {
        $proposition = $this->findById($id);
        $proposition->update($data);
        return $proposition;
    }

    public function findById(int $id)
    {
        return Proposition::findOrFail($id);
    }

    public function delete(int $id)
    {
        $proposition = $this->findById($id);
        $proposition->delete();
        return $proposition;
    }

    public function findAll()
    {
        return Proposition::all();
    }
    public function findByArtisan(int $artisanId)
    {
        return Proposition::where('artisan_id', $artisanId)->get();
    }

    public function findByOffre(int $offreId)
    {
        return Proposition::where('offre_id', $offreId)->get();
    }
    public function acceptProposition(int $id)
    {
        $proposition = $this->findById($id);
        $proposition->statut = 'accepte';
        $proposition->save();
        return $proposition;
    }
}
