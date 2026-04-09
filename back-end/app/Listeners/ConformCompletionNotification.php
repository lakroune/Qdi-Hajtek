<?php

namespace App\Listeners;

use App\Events\ConfirmCodeEvent;
use App\Notifications\MissionCompletedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ConformCompletionNotification
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
    public function handle(ConfirmCodeEvent $event)
    {
        $conversation = $event->conversation;
        $item = $conversation->conversable;

        $artisan = $item->artisan ?? $item->service->artisan;

        if ($artisan) {
            $artisan-> user->notify(new MissionCompletedNotification($conversation));
        }
    }
}
