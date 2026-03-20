<?php

namespace App\DTO;

use Illuminate\Http\Request;

class DemandeDirecteDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public  int $client_id,
        public  int $service_id,
        public  string $date_debut,
        public  string $statut,
        public  float $prix_final,
        public  string $description_specifique = ""
    ) {
        //
    }

    public static function fromRequest(Request $request): self
    {
        return new self(
            client_id: $request->user()->id,
            service_id: $request->service_id,
            date_debut: $request->date_debut,
            statut: $request->statut,
            prix_final: $request->prix_final,
            description_specifique: $request->description_specifique,
        );
    }

    public function toArray(): array
    {
        return [
            'client_id' => $this->client_id,
            'service_id' => $this->service_id,
            'date_debut' => $this->date_debut,
            'statut' => $this->statut,
            'prix_final' => $this->prix_final,
            'code_confirmation' => $this->code_confirmation,
            'description_specifique' => $this->description_specifique,
        ];
    }
}
