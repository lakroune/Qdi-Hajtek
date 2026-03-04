<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffreTravail extends Model
{
    /** @use HasFactory<\Database\Factories\OffreTravailFactory> */
    use HasFactory;

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function propositions()
    {
        return $this->hasMany(Proposition::class);
    }

    public function categorie   ()
    {
        return $this->belongsTo(Categorie::class);
    }
}
