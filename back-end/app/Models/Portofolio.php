<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Portofolio extends Model
{
    /** @use HasFactory<\Database\Factories\PortofolioFactory> */
    use HasFactory;


    public function artisan()
    {
        return $this->belongsTo(Artisan::class);
    }
      public function services()
    {
        return $this->hasMany(Service::class);
    }
}
