<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceFactory> */
    use HasFactory;
    protected $table = 'services';
    protected $fillable = [
        'artisan_id',
        'categorie_id',
        'titre',
        'description',
        'tarif',
        'type_tarif',
        'estimation_duree',
        'material',
        'is_completed',
        'is_active'
    ];

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'favoris', 'service_id', 'client_id');
    }

    public function artisan(){
        return $this->belongsTo(Artisan::class);
    }

    public function demandesDirectes()
    {
        return $this->hasMany(DemandeDirecte::class);
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
