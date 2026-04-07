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
        //
        //image

        $message = $this->messageDAO->create($dto->toArray());
        $message->load('sender:id,lastname,firstname');
        broadcast(new MessageSent($message))->toOthers();
        //test
        broadcast(new NewMessageCount($this->conversationDAO->getAutreParticipant($message->conversation, $message->sender_id)->id, $this->conversationDAO->countMessagesNotRead($message->sender_id)));//->toOthers();
        return $message;
    }

    public function getConversationMessages(int $conversationId)
    {
        $this->messageDAO->markAsRead($conversationId);
        return $this->messageDAO->getByConversation($conversationId);
    }
}
