<?php

namespace App\DTO;

class MessageDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public ?int $id = null,
        public int $conversation_id,
        public int $sender_id,
        public string $contenu_message,
        public bool $is_read = false,
        public ?string $read_at = null,
        public ?string $attachment_path = null,
        public ?string $created_at = null,
        public ?string $updated_at = null
    ) {
        //
    }


    public static function fromRequest($request): self
    {
        return new self(
            id: null,
            conversation_id: $request->validated('conversation_id'),
            sender_id: auth('api')->user()->id,
            contenu_message: $request->validated('contenu_message'),
            attachment_path: $request->validated('attachment_path') ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'conversation_id' => $this->conversation_id,
            'sender_id'       => $this->sender_id,
            'contenu_message' => $this->contenu_message,
            'attachment_path' => $this->attachment_path,
            'is_read'         => $this->is_read,
            'read_at'         => $this->read_at,
        ];
    }
}
