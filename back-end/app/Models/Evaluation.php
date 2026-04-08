<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Evaluation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'conversation_id',
        'rating',
        'comment'
    ];


    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }


    public function getClientAttribute()
    {
        $conversable = $this->conversation->conversable;
        return $conversable->client ?? $conversable->offre_travail?->client;
    }


    public function getArtisanAttribute()
    {
        $conversable = $this->conversation->conversable;
        return $conversable->artisan ?? $conversable->service?->artisan;
    }
}
