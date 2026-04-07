<?php

namespace App\Services;

use App\DAO\ConversationDAO;
use App\DAO\MessageDAO;
use App\DTO\MessageDTO;
use App\Events\MessageSent;
use App\Events\NewMessageCount;
use App\Models\Message;
use Illuminate\Support\Facades\Storage;

class MessageService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private MessageDAO $messageDAO,
        private ConversationDAO $conversationDAO
    ) {
        //
    }

    public function sendMessage(MessageDTO $dto): Message
    {

        $message = $this->messageDAO->create($dto->toArray());
        $receiver = $this->conversationDAO->getAutreParticipant($message->conversation, $message->sender_id);
        broadcast(new MessageSent($message))->toOthers();
        broadcast(new NewMessageCount($receiver->id, $this->conversationDAO->countMessagesNotRead($receiver->id)))->toOthers();
        return $message;
    }

    public function getConversationMessages(int $conversationId)
    {
        $this->messageDAO->markAsRead($conversationId);
        return $this->messageDAO->getByConversation($conversationId);
    }
}
