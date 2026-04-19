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
        'latitude',
        'longitude'
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

    public function likes()
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
    public function propositions()
    {
        return $this->hasMany(Proposition::class);
    }
    public function isVerified()
    {
        return $this->is_verified;
    }

    public function reports()
    {
        return $this->belongsToMany(Client::class, 'reports', 'artisan_id', 'client_id')
            ->withPivot('raison', 'subject', 'description', 'type', 'status', 'priority')
            ->withTimestamps();
    }
}
