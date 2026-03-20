<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artisan extends Model
{
    /** @use HasFactory<\Database\Factories\ArtisanFactory> */
    use HasFactory;

    protected $table = 'artisans';
    public $incrementing = false;
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'specialite',
        'bio',
        'is_verified',
        'experience',
        'note',
        'rayon_action',
    ];

    protected $casts = [];

    // protected $hidden = [];
    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'id');
    }
    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'aimers', 'artisan_id', 'client_id');
    }

    public function  documents()
    {
        return $this->hasMany(Document::class);
    }
    public function disponibilites()
    {
        return $this->hasMany(Disponibilite::class);
    }
}
