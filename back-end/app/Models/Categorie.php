<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    /** @use HasFactory<\Database\Factories\CategorieFactory> */
    use HasFactory;
    protected $table = 'categories';


    public function offreTravails()
    {
        return $this->hasMany(OffreTravail::class);
    }
    public function services()
    {
        return $this->hasMany(Service::class);
    }
}
