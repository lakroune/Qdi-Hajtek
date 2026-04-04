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
        $userId = auth('api')->id();

        $conversation = Conversation::with(['conversable','paiement'])->findOrFail($conversationId);

        $isParticipant = (
            $conversation->conversable->client_id == $userId ||
            $conversation->conversable->artisan_id == $userId
        );

        if (!$isParticipant) {
            return response()->json([
                'message' => 'Action non autorisée. Vous n\'êtes pas membre de cette conversation.'
            ], 403);
        }

        $messages = Message::where('conversation_id', $conversationId)
            ->with('sender:id,lastname,firstname')
            ->orderBy('created_at', 'asc')
            ->paginate($perPage);

        return [
            'messages' => $messages,
            'conversation' => $conversation,
            'currentUser' => [
                'id' => $userId,]
        ];
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
