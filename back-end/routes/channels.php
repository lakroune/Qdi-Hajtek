<?php

use App\Models\Conversation;
use App\Models\DemandeDirecte;
use App\Models\Proposition;
use Illuminate\Support\Facades\Broadcast;

// (Notifications)
Broadcast::channel('notification.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
}, ['guards' => ['api']]);

// (Message Count)
Broadcast::channel('countMessage.user.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
}, ['guards' => ['api']]);

// (chat )
Broadcast::channel('conversation.{conversation_id}', function ($user, $conversation_id) {
    return Conversation::where('id', $conversation_id)
        ->where(function ($query) use ($user) {
            $query->whereHasMorph('conversable', [DemandeDirecte::class], function ($q) use ($user) {
                $q->where('client_id', $user->id)
                    ->orWhereHas('service', fn($inner) => $inner->where('artisan_id', $user->id));
            })
                ->orWhereHasMorph('conversable', [Proposition::class], function ($q) use ($user) {
                    $q->where('artisan_id', $user->id)
                        ->orWhereHas('offreTravail', fn($inner) => $inner->where('client_id', $user->id));
                });
        })
        ->exists();
}, ['guards' => ['api']]);
