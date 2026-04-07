<?php

namespace App\Events;

use App\Models\Proposition;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PropositionAccepted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Proposition $proposition)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('notification.' . $this->proposition->artisan->user->id),
        ];
    }
    public function broadcastAs()
    {
        return 'new-notification';
    }
    public function broadcastWith()
    {
        return [
            'message' => "Une nouvelle proposition vient d'être acceptée",
        ];
    }
}
