<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ReportResource;
class ArtisanReportResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->user->firstname . ' ' . $this->user->lastname, 
            'specialite' => $this->specialite,
            'avatar' => $this->avatar ? asset('storage/' . $this->avatar) : null,
            'is_verified' => $this->is_verified,
            'reports' => ReportResource::collection($this->whenLoaded('reports')),
        ];
    }
}