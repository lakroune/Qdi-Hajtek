<?php

namespace App\Events;

use App\Models\Paiement;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PaiementCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @param Paiement $paiement
     */
    public function __construct(public Paiement $paiement)
    {
        //
    }
}
