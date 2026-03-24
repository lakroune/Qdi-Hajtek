<?php

namespace App\DAO;

use App\DTO\MessageDTO;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Support\Facades\DB;

class MessageDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create(array $data): Message
    {
        return Message::create($data);
    }

    public function getByConversation(int $conversationId, int $perPage = 20)
    {
        return Message::where('conversation_id', $conversationId)
            ->with('sender:id,lastname,firstname')
            ->orderBy('created_at', 'asc')
            ->paginate($perPage);
    }
    public function markAsRead(int $conversationId): void
    {
        Message::where('conversation_id', $conversationId)
            ->where('sender_id', '!=', auth('api')->user()->id)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now()
            ]);
    }
}
