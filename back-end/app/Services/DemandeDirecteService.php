<?php

namespace App\Services;

use App\DAO\DemandeDirecteDAO;
use App\DTO\DemandeDirecteDTO;
use App\Events\DemandeCreated;
use Illuminate\Support\Str;

class DemandeDirecteService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private DemandeDirecteDAO $demandeDirecteDAO)
    {
        //
    }
    public function createDemandeDirecte(DemandeDirecteDTO $dto)
    {
        $data = $dto->toArray();
        $data['code_confirmation'] = strtoupper(Str::random(6));
        $demande =  $this->demandeDirecteDAO->create($data);
        event(new DemandeCreated($demande));
        return $demande;
    }
}
