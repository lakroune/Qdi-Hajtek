<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $table = 'paiements';
    protected $fillable = [
        'client_id',
        'conversation_id',
        'description',
        'stripe_payment_id',
        'montant',
        'statut'
    ];
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
}
