<?php

namespace App\DTO;

class PaiementDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private readonly float $amount,
        private readonly int $clientId,
        private readonly int $conversationId,
        private readonly float $commission_admin,
        private readonly float $montant_artisan,

        private readonly string $statut,
        
    ) {
        //
    }

    public static function fromRequest($request): self
    {
        return new self(
            amount: (float) $request->validated('amount'),
            clientId: auth('api')->user()->id,
            conversationId: (int) $request->validated('conversation_id'),
            commission_admin: 0,
            montant_artisan: 0,
            statut: 'pending'
        );
    }

    public function toArray(): array
    {
        return [
            'montant_total' => $this->amount,
            'client_id' => $this->clientId,
            'conversation_id' => $this->conversationId,
            'commission_admin' => $this->commission_admin,
            'montant_artisan' => $this->montant_artisan,
            'statut' => $this->statut
        ];
    }
}
