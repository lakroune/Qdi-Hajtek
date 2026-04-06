<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
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
            'subject' => $this->subject,
            'type' => str_replace('App\\Models\\', '', $this->conversable_type),
            'conversable_id' => $this->conversable_id,
            'last_message_at' => $this->last_message_at,
            'unread_count' => $this->unread_count ?? 0,

            'messages' => MessageResource::collection($this->whenLoaded('messages')),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
