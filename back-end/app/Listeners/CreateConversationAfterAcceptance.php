<?php

namespace App\Listeners;

use App\DAO\ConversationDAO;
use App\DAO\MessageDAO;
use App\Events\PropositionAccepted;
use App\Models\Proposition;
use App\Notifications\PropositionAcceptedNotification;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateConversationAfterAcceptance  implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct(
        private MessageDAO $messageDAO,
        private ConversationDAO $conversationDAO
    ) {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PropositionAccepted $event): void
    {
        $proposition = $event->proposition;

        try {
            DB::transaction(function () use ($proposition) { 
                $conversation = $this->conversationDAO->create([
                    'last_message_at' => now(),
                    'subject' => $proposition->offreTravail->titre,
                    'proposition_id' => $proposition->id,
                    'conversable_id' => $proposition->id,
                    'conversable_type' => Proposition::class,
                ]);

                $this->messageDAO->create([
                    'conversation_id' => $conversation->id,
                    'contenu_message' => $proposition->message_explicatif,
                    'sender_id'       => $proposition->artisan->user->id,
                ]);

                // $artisanUser = $proposition->artisan->user;
                // $artisanUser->notify(new PropositionAcceptedNotification($proposition));
            });
        } catch (Exception $e) {
            Log::error("Erreur lors de la création de la conversation pour la demande #{$proposition->id}: " . $e->getMessage());

            throw $e;
        }
    }
}
