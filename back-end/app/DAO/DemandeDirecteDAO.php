<?php

namespace App\DAO;

use App\Models\DemandeDirecte;

class DemandeDirecteDAO
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
        return DemandeDirecte::create($data);
    }

    public function findById(int $id)
    {
        return DemandeDirecte::with(['client.user', 'service'])->findOrFail($id);
    }

    public function updateStatus(int $id, string $status)
    {
        $demande = DemandeDirecte::findOrFail($id);
        $demande->update(['statut' => $status]);
        return $demande;
    }
}
