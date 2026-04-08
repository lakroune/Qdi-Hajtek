<?php

namespace App\Listeners;

use App\DAO\ConversationDAO;
use App\DAO\MessageDAO;
use App\Events\DemandeCreated;
use App\Models\DemandeDirecte;
use App\Notifications\NewDemandeNotification;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateConversation implements ShouldQueue
{
    use InteractsWithQueue;
    public $tries = 3;
    public $backoff = [30, 60];

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

        try {
            DB::transaction(function () use ($demandeDirecte) {

                $conversation = $this->conversationDAO->create([
                    'last_message_at'    => now(),
                    'subject'            => $demandeDirecte->service->titre,
                    'demande_directe_id' => $demandeDirecte->id,
                    'conversable_id'     => $demandeDirecte->id,
                    'conversable_type'   => DemandeDirecte::class,
                ]);

                $this->messageDAO->create([
                    'conversation_id' => $conversation->id,
                    'contenu_message' => $demandeDirecte->description_specifique,
                    'sender_id'       => $demandeDirecte->client->user->id,
                ]);

                $artisanUser = $demandeDirecte->service->artisan->user;
                $artisanUser->notify(new NewDemandeNotification($demandeDirecte));
                
            });
        } catch (Exception $e) {
            Log::error("Erreur lors de la création de la conversation pour la demande #{$demandeDirecte->id}: " . $e->getMessage());

            throw $e;
        }
    }
}
