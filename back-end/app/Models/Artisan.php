<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artisan extends Model
{
    /** @use HasFactory<\Database\Factories\ArtisanFactory> */
    use HasFactory;

    protected $table = 'artisans';
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function client()
    {
        return $this->belongsToMany(Client::class, 'favoris', 'artisan_id', 'client_id');
    }
}
