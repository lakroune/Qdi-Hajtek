<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disponibilite extends Model
{
    /** @use HasFactory<\Database\Factories\DisponibiliteFactory> */
    use HasFactory;

    protected $table = 'disponibilites';

    protected $fillable = [
        'artisan_id',
        'jour_semaine',
        'heure_debut',
        'heure_fin'
    ];

    public function artisan()
    {
        return $this->belongsTo(Artisan::class);
    }
}
