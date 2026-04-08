<?php

namespace App\Listeners;

use App\Events\PrixFixed;
use App\Notifications\PriceFixedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendPrixFixedNotification implements ShouldQueue
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
    public function handle(PrixFixed $event): void
    {
        $conversation = $event->conversation;
        $user = $conversation->conversable->client->user ?? $conversation->conversable->offreTravail->client->user;
        $user->notify(new PriceFixedNotification($conversation));
    }
}
