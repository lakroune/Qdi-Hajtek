<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffreTravail extends Model
{
    /** @use HasFactory<\Database\Factories\OffreTravailFactory> */
    use HasFactory;

    protected $table = 'offre_travails';


    protected $fillable = [
        'client_id',
        'categorie_id',
        'titre',
        'description',
        'budget_estime',
        'date_limite',
        'type_remuneration',
        'niveau_urgence',
        'statut',
        'is_completed'
    ];
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function propositions()
    {
        return $this->hasMany(Proposition::class);
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
