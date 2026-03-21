<?php

namespace App\Listeners;

use App\Events\PropositionAccepted;
use App\Notifications\NewPropositionNotification;
use App\Notifications\PropositionAcceptedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
class NotifyArtisanOfAcceptance
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

        $proposition->artisan->user->notify(new PropositionAcceptedNotification($proposition));
    }
}
