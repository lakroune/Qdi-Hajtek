<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DommandeDericte extends Model
{
    /** @use HasFactory<\Database\Factories\DommandeDericteFactory> */
    use HasFactory;

    protected $table = 'dommande_derictes';
    protected $fillable = [
        'client_id',
        'service_id',
        'date_debut',
        'date_fin_estimee',
        'statut',
        'description_specifique',
        'prix_final',
        'code_confirmation',
        'mode_paiement',
        'a_ete_signale',
        'date_cloture',
        'is_completed'
    ];



    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function notification()
    {
        return $this->morphOne(Notification::class, 'notifiable');
    }
}
