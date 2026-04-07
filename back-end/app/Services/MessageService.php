<?php

namespace App\Services;

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
        private MessageDAO $messageDAO
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
        broadcast(new NewMessageCount(3, 2));//->toOthers();
        return $message;
    }

    public function getConversationMessages(int $conversationId)
    {
        $this->messageDAO->markAsRead($conversationId);
        return $this->messageDAO->getByConversation($conversationId);
    }
}
