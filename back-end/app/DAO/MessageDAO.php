<?php

namespace App\DAO;

use App\Models\Message;

class MessageDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create(array $data): ?Message

    {
        return Message::create($data);
    }

    public function getConversationMessages(int $conversationId)
    {
        return Message::where('conversation_id', $conversationId)
            ->orderBy('created_at', 'asc')
            ->get();
    }
}
