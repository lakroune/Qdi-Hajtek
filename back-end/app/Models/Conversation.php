<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    /** @use HasFactory<\Database\Factories\ConversationFactory> */
    use HasFactory;
    protected $table = 'conversations';
    protected $fillable = [
        'subject',
        'last_message_at',  
    ];
    public function conversable()
    {
        return $this->morphTo();
    }
}
