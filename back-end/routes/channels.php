<?php

use App\Models\Message;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('messages.{senderId}', function ($user, $id) {
    return Message::where('sender_id', $id)->where('receiver_id', $user->id)->exists();
});
