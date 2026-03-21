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
        'delai_execution',
        'message_explicatif',
        'date_disponibilite',
        'conditions_speciales',
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
}
