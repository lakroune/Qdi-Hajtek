<?php

namespace App\Listeners;

use App\Events\PaiementCreated;
use App\Models\Notification;
use App\Notifications\PaymentSuccessNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class HandleSuccessfulPayment implements ShouldQueue
{
    /**
     * 
     */
    public function handle(PaiementCreated $event): void
    {
        $paiement = $event->paiement;
        $conversation = $paiement->conversation;
        $user = $conversation->conversable->artisan->user ?? $conversation->conversable->service->artisan->user;
        $user->notify(new PaymentSuccessNotification($conversation));
    }
}
