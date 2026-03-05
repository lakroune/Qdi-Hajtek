<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;

    protected $table = 'clients';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function artisans()
    {
        return $this->belongsToMany(Artisan::class, 'aimers', 'client_id', 'artisan_id');
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'favoris', 'client_id', 'service_id');
    }
    public function dommandeDerictes()
    {
        return $this->hasMany(DommandeDericte::class);
    }

    public function offreTravails()
    {
        return $this->hasMany(OffreTravail::class);
    }

}
