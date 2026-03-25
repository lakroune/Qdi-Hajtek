<?php

use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chat.{conversation_id}', function ($user, $conversation_id) {
    return [
        'id' => $user->id,
        'name' => $user->name,
    ];
});
