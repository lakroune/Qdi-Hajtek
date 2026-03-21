<?php

namespace App\Listeners;

use App\Events\DemandeCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateConversation
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
    public function handle(DemandeCreated $event): void
    {
        $demandeDirecte = $event->demandeDirecte;

        $demandeDirecte->conversation()->create(
            [
                'last_message_at' => now(),
                'subject' => $demandeDirecte->subject//titre dyal nzido 3la demande
            ]
        );
    }
}
