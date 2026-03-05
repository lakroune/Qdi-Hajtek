<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proposition extends Model
{
    /** @use HasFactory<\Database\Factories\PropositionFactory> */
    use HasFactory;

    protected $table = 'propositions';


    public function offreTravail()
    {
        return $this->belongsTo(OffreTravail::class);
    }

    public function  notfication()
    {
        return $this->morphOne(Notification::class, 'notifiable');
    }
    
}
