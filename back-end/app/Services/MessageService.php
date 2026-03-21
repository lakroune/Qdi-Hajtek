<?php

namespace App\Services;

use App\DAO\MessageDAO;
use App\DTO\MessageDTO;
use App\Models\Message;

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

    public function getConversationMessages(int $conversationId)
    {
        return $this->messageDAO->getConversationMessages($conversationId);
    }

    public function createMessage(MessageDTO $messageDAO)
    {
        return $this->messageDAO->create($messageDAO->toArray());
    }
}
