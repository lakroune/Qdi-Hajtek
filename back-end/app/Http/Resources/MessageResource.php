<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sender_id' => $this->sender_id,
            'content' => $this->contenu_message, 
            'is_read' => (bool) $this->is_read,
            'read_at' => $this->read_at,
            'attachment' => $this->attachment_path,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
