<?php

namespace App\Jobs;

use App\DAO\ConversationDAO;
use App\Events\MessageSent;
use App\Events\NewMessageCount;
use App\Models\Message;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessMessageJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(private Message $message)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(ConversationDAO $conversationDAO): void
    {
        $this->message->load(['conversation.conversable', 'sender']);

        $receiver = $conversationDAO->getAutreParticipant(
            $this->message->conversation,
            $this->message->sender_id
        );

        if ($receiver) {
            broadcast(new MessageSent($this->message))->toOthers();

            $unreadCount = $conversationDAO->countMessagesNotRead($receiver->id);
            broadcast(new NewMessageCount($receiver->id, $unreadCount));
        }
    }
}
