<?php

use Illuminate\Support\Facades\Broadcast;

// (Notifications)
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
}, ['guards' => ['api']]);

// (Message Count)
Broadcast::channel('countMessage.user.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
}, ['guards' => ['api']]);

// (Chat)
Broadcast::channel('conversation.{conversation_id}', function ($user, $conversation_id) {
    return true;
}, ['guards' => ['api']]);
