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
        public  string $statut = "en_attente",
        public  float $prix_final,
        public  ?string $description_specifique
    ) {
        //
    }

    public static function fromRequest(Request $request): self
    {
        return new self(
            client_id: $request->user()->client->id,
            service_id: $request->service_id,
            date_debut: $request->date_debut,
            statut: "en_attente",
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
            'description_specifique' => $this->description_specifique,
        ];
    }
}
