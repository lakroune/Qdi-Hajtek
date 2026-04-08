<?php

namespace App\services;

use App\DAO\ConversationDAO;
use App\Events\PrixFixed;

class ConversationService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private ConversationDAO $conversationDAO
    ) {
        // 
    }

    public function getConversations()
    {
        return $this->conversationDAO->getConversations(auth('api')->user()->id);
    }

    public function acceptOffer(int $id, float $prix_final)
    {
        $conversation = $this->conversationDAO->acceptOffer($id, $prix_final);
        event(new PrixFixed($conversation));

        return $conversation;
    }

    public function completeMission(int $id)
    {
        return $this->conversationDAO->completeMission($id);
    }

    public function confirmCode(int $id, string $code)
    {
        return $this->conversationDAO->confirmCode($id, $code);
    }
}
