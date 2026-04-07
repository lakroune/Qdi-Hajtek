<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $messages = $this->messages;

        return [
            'messages' => [
                'data' => ChatMessageResource::collection($messages),
                'pagination' => [
                    'current_page' => $messages->currentPage(),
                    'last_page' => $messages->lastPage(),
                    'per_page' => $messages->perPage(),
                    'total' => $messages->total(),
                    'has_more' => $messages->hasMorePages(),
                ],
            ],

            'conversation' => new ConversationDetailResource($this->conversation),

            'currentUser' => [
                'id' => auth('api')->id(),
            ],
        ];
    }
}
