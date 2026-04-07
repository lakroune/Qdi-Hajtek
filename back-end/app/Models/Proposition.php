<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proposition extends Model
{
    /** @use HasFactory<\Database\Factories\PropositionFactory> */
    use HasFactory;

    protected $table = 'propositions';

    protected $fillable = [
        'artisan_id',
        'offre_travail_id',
        'prix_propose',
        'prix_final',
        'delai_execution',
        'message_explicatif',
        'conditions_speciales',
        'statut',
        'date_debut'
    ];

    public function offreTravail()
    {
        return $this->belongsTo(OffreTravail::class);
    }

    public function artisan()
    {
        return $this->belongsTo(Artisan::class);
    }
    public function  notfication()
    {
        return $this->morphOne(Notification::class, 'notifiable');
    }

    public function conversation()
    {
        return $this->morphOne(Conversation::class, 'conversable');
    }
}
