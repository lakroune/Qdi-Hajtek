<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceFactory> */
    use HasFactory;
    protected $table = 'services';

    public function client()
    {
        return $this->belongsToMany(Client::class, 'favoris', 'service_id', 'client_id');
    }

    public function dommandeDerictes()
    {
        return $this->hasMany(DommandeDericte::class);
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }
    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
