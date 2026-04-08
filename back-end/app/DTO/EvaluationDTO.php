<?php

namespace App\DTOs;

use Illuminate\Http\Request;

class EvaluationDTO
{
    public function __construct(
        public readonly int $rating,
        public readonly ?string $comment,
        public readonly int $conversation_id
    ) {
        //
    }


    public static function fromRequest(Request $request, int $conversationId): self
    {
        return new self(
            rating: (int) $request->validated('rating'),
            comment: $request->validated('comment'),
            conversation_id: $conversationId
        );
    }


    public function toArray(): array
    {
        return [
            'rating' => $this->rating,
            'comment' => $this->comment,
            'conversation_id' => $this->conversation_id,
        ];
    }
}
