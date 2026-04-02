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
        return $this->conversationDAO->getConversations();
    }

    public function acceptOffer($id)
    {
        return $this->conversationDAO->acceptOffer($id);
    }
}
