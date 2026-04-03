<?php

namespace App\Listeners;

use App\DAO\ConversationDAO;
use App\DAO\MessageDAO;
use App\Events\DemandeCreated;
use App\Models\DemandeDirecte;
use App\Models\Message;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateConversation
{
    /**
     * Create the event listener.
     */
    public function __construct(
        private ConversationDAO $conversationDAO,
        private MessageDAO $messageDAO
    ) {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(DemandeCreated $event): void
    {
        $demandeDirecte = $event->demandeDirecte;

        $this->conversationDAO->create(
            [
                'last_message_at' => now(),
                'subject' => $demandeDirecte->service->titre,
                'demande_directe_id' => $demandeDirecte->id,
                'conversable_id'     => $demandeDirecte->id,
                'conversable_type'   => DemandeDirecte::class
            ]
        );

        $this->messageDAO->create(
            [
                'conversation_id' => $demandeDirecte->conversation->id,
                'contenu_message' => $demandeDirecte->description_specifique,
                'sender_id' => $demandeDirecte->client->user->id
            ]
        );
    }
}
