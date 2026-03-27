<?php

namespace App\Events;

use App\Models\DemandeDirecte;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DemandeCreated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
        
    /**
     * Create a new event instance.
     */
    public function __construct(public DemandeDirecte $demandeDirecte)
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
            new PrivateChannel('notice.' . $this->demandeDirecte->service->artisan->user->id),
        ];
    }
    public function broadcastAs()
    {
        return 'notice-created';
    }
    public function broadcastWith()
    {
        return [
            'id' => $this->demandeDirecte->id,
            'contenu' => "Une nouvelle demande vient d'être créée",
            'type_data' => 'notification',
            'user_id' => $this->demandeDirecte->client->user->id
        ];
    }
}
