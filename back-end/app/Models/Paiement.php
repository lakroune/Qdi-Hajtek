<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $table = 'paiements';
    protected $fillable = [
        'conversation_id',
        'client_id',
        'stripe_payment_id',
        'montant_total',
        'commission_admin',
        'montant_artisan',
        'devise',
        'statut'
    ];
    protected $casts = [
        'paid_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
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
