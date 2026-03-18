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

    protected $ffillable = [
        'specialite',
        'bio',
        'is_verified',
        'note',
        'rayon_action',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function portofolio()
    {
        return $this->hasOne(Portofolio::class);
    }

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'aimers', 'artisan_id', 'client_id');
    }
}
