<?php

namespace App\Listeners;

use App\Notifications\MissionCompletedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyClientMissionCompleted
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
    public function handle(object $event): void
    {
        $conversation = $event->conversation;
        $user = $conversation->conversable->client->user ?? $conversation->conversable->offreTravail->client->user;
        $user->notify(new MissionCompletedNotification($conversation));
    }
}
