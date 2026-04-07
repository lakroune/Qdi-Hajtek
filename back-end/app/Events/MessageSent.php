<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $message;

    public function __construct(Message $message)
    {
        $this->message = $message->load('sender');
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('conversation.' . $this->message->conversation_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'new-message';
    }
    public function broadcastWith(): array
    {
        return [
            'message' => [
                'id' => $this->message->id,
                'content' => $this->message->contenu_message,
                'sender_id' => $this->message->sender_id,
                'created_at' => $this->message->created_at->toIso8601String(),
                'is_read' => $this->message->is_read,
                'sender' => [
                    'id' => $this->message->sender->id,
                    'first_name' => $this->message->sender->firstname,
                    'last_name' => $this->message->sender->lastname,
                    'full_name' => $this->message->sender->firstname . ' ' . $this->message->sender->lastname
                ]
            ]
        ];
    }
}
