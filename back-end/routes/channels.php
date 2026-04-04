<?php

use App\Models\Conversation;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chat.{conversation_id}', function ($user, $conversation_id) {
    return true;
}, ['guards' => ['api']]);

Broadcast::channel('notice.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
