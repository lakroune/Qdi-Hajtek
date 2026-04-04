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
        private readonly int $conversationId
    ) {
        //
    }

    public static function fromRequest($request): self
    {
        return new self(
            amount: (float) $request->validated('amount'),
            clientId: auth('api')->user()->id,
            conversationId: (int) $request->validated('conversation_id'),
        );
    }

    public function toArray(): array
    {
        return [
            'amount' => $this->amount,
            'client_id' => $this->clientId,
            'conversation_id' => $this->conversationId,
        ];
    }
}
