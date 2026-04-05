<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ImageResource extends JsonResource
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
            'url' => $this->getUrlAttribute($this->url),
            'titre' => $this->titre,
            'imageable_type' => $this->imageable_type,
            'imageable_id' => $this->imageable_id,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }

    private function  getUrlAttribute($value)
    {
        return "http://127.0.0.1:8000". Storage::url($value);
    }
}
