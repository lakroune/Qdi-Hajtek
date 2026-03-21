<?php

namespace App\Listeners;

use App\Events\PropositionAccepted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateConversationAfterAcceptance
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PropositionAccepted $event): void
    {
        $proposition = $event->proposition;

        $proposition->conversation()->create(
            [
                'last_message_at' => now(),
                'subject' => $proposition->offreTravail->titre 
            ]
        );
    }
}
