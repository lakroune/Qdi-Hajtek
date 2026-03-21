<?php

namespace App\DAO;

use App\Models\OffreTravail;

class OffreTravailDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create($data)
    {
        return OffreTravail::create($data);
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
        return OffreTravail::where('id', $id)->first();
    }

    public function findAll()
    {
        return OffreTravail::all();
    }
    public function findByClient($id)
    {
        return OffreTravail::where('client_id', $id)->get();
    }
    public function findByCategorie($id)
    {
        return OffreTravail::where('categorie_id', $id)->get();
    }
}
