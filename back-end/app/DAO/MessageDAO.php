<?php

namespace App\DAO;

use App\Models\Conversation;
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

    public function create(array $data): Message
    {
        return Message::create($data);
    }

    public function getByConversation(int $conversationId)
    {
        $userId = auth('api')->id();

        $conversation = Conversation::with(['conversable', 'paiement', 'evaluation'])->findOrFail($conversationId);

        $clientId = $conversation->conversable?->client_id ?? $conversation->conversable?->offreTravail?->client_id;
        $artisanId = $conversation->conversable?->artisan_id ?? $conversation->conversable?->service?->artisan_id;

        $isParticipant = ($userId === $clientId || $userId === $artisanId);

        if (!$isParticipant) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $messages = Message::where('conversation_id', $conversationId)
            ->with('sender:id,lastname,firstname')
            ->orderBy('created_at', 'asc')
            ->paginate(20);

        return [
            'messages' => $messages,
            'currentUser' => [
                'id' => $userId,
                'is_client' => ($userId === $clientId),
            ],
            'conversation' => $conversation
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
