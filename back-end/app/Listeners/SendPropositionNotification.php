<?php

namespace App\Listeners;

use App\Events\PropositionCreated;
use App\Notifications\NewPropositionNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendPropositionNotification implements ShouldQueue
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
    public function handle(PropositionCreated $event): void
    {
        $proposition = $event->proposition;

        $proposition->offreTravail->client->user->notify(new NewPropositionNotification($proposition));
    }
}
