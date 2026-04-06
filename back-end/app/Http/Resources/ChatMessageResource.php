<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatMessageResource extends JsonResource
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
            'content' => $this->contenu_message,
            'sender_id' => $this->sender_id,
            'is_read' => (bool)$this->is_read,
            'read_at' => $this->read_at,
            'attachment' => $this->attachment_path,
            'created_at' => $this->created_at,
            'sender' => [
                'id' => $this->sender->id,
                'full_name' => $this->sender->firstname . ' ' . $this->sender->lastname,
            ],
        ];
    }
}
