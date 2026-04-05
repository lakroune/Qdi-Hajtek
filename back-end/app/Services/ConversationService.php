<?php

namespace App\services;

use App\DAO\ConversationDAO;

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
        return $this->conversationDAO->acceptOffer($id, $prix_final);
    }

    public function completeMission(int $id)
    {
        return $this->conversationDAO->completeMission($id);
    }
}
