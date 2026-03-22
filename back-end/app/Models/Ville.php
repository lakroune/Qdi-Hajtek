<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    protected $table = 'villes';
    protected $fillable = ['ville'];
    protected $hidden = ['created_at', 'updated_at'];
}
