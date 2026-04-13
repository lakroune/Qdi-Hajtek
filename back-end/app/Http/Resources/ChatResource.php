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
        $conversation = $this->conversation;
        $userId = auth('api')->user()->id;

        $clientId = $conversation->conversable?->client_id ?? $conversation->conversable?->offreTravail?->client_id;

        return [
            'messages' => [
                'data' => ChatMessageResource::collection($messages->items()),
                'pagination' => [
                    'current_page' => $messages->currentPage(),
                    'last_page'    => $messages->lastPage(),
                    'per_page'     => $messages->perPage(),
                    'total'        => $messages->total(),
                    'next_page_url' => $messages->nextPageUrl(),
                    'prev_page_url' => $messages->previousPageUrl(),
                ],
            ],
            'conversation' => new ConversationDetailResource($conversation),
            'currentUser' => [
                'id' => $userId,
                'is_client' => ($userId === $clientId),
            ],
        ];
    }
}
