<?php

namespace App\Listeners;

use App\Events\DemandeCreated;
use App\Jobs\SendNewDemandeEmail;
use App\Notifications\NewDemandeNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendDemandeNotification
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
        SendNewDemandeEmail::dispatch($demandeDirecte);
    }
}
