<?php

namespace App\Services;

use App\DAO\ConversationDAO;
use App\DAO\MessageDAO;
use App\DTO\MessageDTO;
use App\Events\MessageSent;
use App\Events\NewMessageCount;
use App\Jobs\ProcessMessageJob;
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
        $this->messageDAO->markAsRead($message->conversation_id);
        ProcessMessageJob::dispatch($message);
        return   $message;
    }

    public function getConversationMessages(int $conversationId)
    {
        $this->messageDAO->markAsRead($conversationId);
        return $this->messageDAO->getByConversation($conversationId);
    }
}
