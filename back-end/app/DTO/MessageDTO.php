<?php

namespace App\DTO;

class MessageDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public int $conversation_id,
        public int $sender_id,
        public string $contenu_message,
        public ?string $attachment_path = null
    ) {
        //
    }


    public static function fromRequest($request)
    {
        return new self(
            conversation_id: (int) $request->validated('conversation_id'),
            sender_id: (int) $request->user()->id,
            contenu_message: $request->validated('contenu_message'),
        );
    }

    public function toArray()
    {
        return [
            'conversation_id' => $this->conversation_id,
            'sender_id' => $this->sender_id,
            'contenu_message' => $this->contenu_message,
            'attachment_path' => $this->attachment_path,
        ];
    }
}
