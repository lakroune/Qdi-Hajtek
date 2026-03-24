<?php

namespace App\Services;

use App\DAO\MessageDAO;
use App\DTO\MessageDTO;
use App\Models\Message;
use Illuminate\Support\Facades\Storage;

class MessageService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private MessageDAO $messageDAO
    ) {
        //
    }

    public function sendMessage(MessageDTO $dto): Message
    {
        //
        //image

        return $this->messageDAO->create($dto->toArray());
    }

    public function getConversationMessages(int $conversationId)
    {
        $this->messageDAO->markAsRead($conversationId);
        return $this->messageDAO->getByConversation($conversationId);
    }

     
}
