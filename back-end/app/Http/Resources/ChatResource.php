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
        return [
            'messages' => [
                'data' => ChatMessageResource::collection($this->messages),
                'pagination' => [
                    'current_page' => $this->messages->currentPage(),
                    'last_page' => $this->messages->lastPage(),
                    'per_page' => $this->messages->perPage(),
                    'total' => $this->messages->total(),
                    'next_page_url' => $this->messages->nextPageUrl(),
                    'prev_page_url' => $this->messages->previousPageUrl(),
                ],
            ],

            'conversation' => new ConversationDetailResource($this->conversation),

            'currentUser' => [
                'id' => auth('api')->user()->id,
            ],
        ];
    }
}
