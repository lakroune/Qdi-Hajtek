<?php

namespace App\DTO;

class PropositionDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public int $artisan_id,
        public int $offre_id,
        public float $prix_propose,
        public string $delai_execution,
        public ?string $date_disponibilite,
        public string $message_explicatif,
        public ?string $conditions_speciales,
        public string $statut_proposition = 'en_attente'
    ) {
        //
    }

    public static function fromRequest($request)
    {
        return new self(
            artisan_id: auth('api')->user()->id,
            offre_id: $request->validated('offre_id'),
            prix_propose: $request->validated('prix_propose'),
            delai_execution: $request->validated('delai_execution'),
            message_explicatif: $request->validated('message_explicatif'),
            conditions_speciales: $request->validated('conditions_speciales'),
            date_disponibilite: $request->validated('date_disponibilite'),
        );
    }

    public function toArray()
    {
        return [
            'artisan_id' => $this->artisan_id,
            'offre_id' => $this->offre_id,
            'prix_propose' => $this->prix_propose,
            'delai_execution' => $this->delai_execution,
            'message_explicatif' => $this->message_explicatif,
            'conditions_speciales' => $this->conditions_speciales,
            'statut_proposition' => $this->statut_proposition,
            'date_disponibilite' => $this->date_disponibilite
        ];
    }
}
